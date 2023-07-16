import { CST } from "../CST";
import { createHodedAnims, createBatAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import "../characters/Samira";
import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
import { createSpellBubleAnims } from "../anims/SpellsAnims";
import Samira from "../characters/Samira";
export default class PlayScene extends Phaser.Scene {
    private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
    private character!: Samira;

    private bats!: Phaser.Physics.Arcade.Group;

    atackes!: Phaser.Physics.Arcade.Group;
    constructor() {
        super({key: CST.SCENES.PLAY})
    }

    preload() {
        //console.log(this.textures.list)     

        this.cursor = this.input.keyboard?.addKeys(CST.KEYBOARD.KEYS) as Phaser.Types.Input.Keyboard.CursorKeys

        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.image("itens", "./assets/maps/itens.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy1.json");
    }

    create() {
        this.scene.run(CST.SCENES.GAME_UI)

        createSpellBubleAnims(this.anims)
        createCharacterAnims(this.anims)
        createHodedAnims(this.anims)
        createBatAnims(this.anims)

        this.character = this.add.samira(500, 500, 'characters').setSize(30,50).setOffset(10, 20)

        this.atackes = this.physics.add.group();

        const hodeds = this.physics.add.group({
            classType: Hoded,
            createCallback: (go) => {
                const hodedgo = go as Hoded
                hodedgo.setSize(30,50).setOffset(10, 20);
            }
        })

        const bats = this.physics.add.group({
            classType: Bat,
            createCallback: (go) => {
                const batgo = go as Bat
                batgo.setSize(47,40).setOffset(0, 10).setScale(.9),               
                (batgo.body as Phaser.Physics.Arcade.Body).onCollide = true
            }
        })

        hodeds.get(400, 400, 'enemies', 'ghost-front1')
        bats.get(500, 500, 'enemies', 'bat-front1')
        bats.get(500, 600, 'enemies', 'bat-front1')
        bats.get(500, 700, 'enemies', 'bat-front1')
              
        //@ts-ignore
        window.character = this.character
      
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {        
            if(pointer.isDown) { //is clicking
                let magic = this.physics.add.sprite(pointer.worldX, pointer.worldY, "magicEffect", "magic1").play("spellBuble").setSize(50,50).setOffset(20, 35)
                this.atackes.add(magic);
                magic.on('animationcomplete', () => {
                    magic.destroy();
                })
            }
        })

        const map = this.add.tilemap("map")
        const tileset: Phaser.Tilemaps.Tileset  = map.addTilesetImage("textures", "tiles") as Phaser.Tilemaps.Tileset

        const ground = map.createLayer("floor", tileset, 0, 0)?.setDepth(-2)
        const groundAbove = map.createLayer('floor_above', tileset, 0, 0)?.setDepth(-1)
        const shadow = map.createLayer("shadow", tileset, 0, 0)
        const objcollider = map.createLayer("collider", tileset, 0, 0)
        const objabove = map.createLayer("above", tileset, 0, 0)

        this.input.on("gameobjectdown", (pointer: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
            obj.destroy()
        })

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            //@ts-ignore
            let tile = map.getTileAt(map.worldToTileX(pointer.x), map.worldToTileY(pointer.y));

            if(tile) console.log(tile)
        })
        
        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)

        objcollider?.setCollisionByProperty({collider: true})
        
        //this.physics.world.addCollider(this.character, bats)
        this.physics.add.collider(this.character, objcollider as Phaser.Tilemaps.TilemapLayer)
        this.physics.add.collider(bats, objcollider as Phaser.Tilemaps.TilemapLayer);

        this.physics.add.collider(bats, this.character, this.handlePlayerBatCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
    }  

    private handlePlayerBatCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        const bat = obj2 as Bat

        const dx = this.character.x - bat.x
        const dy = this.character.y - bat.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

        this.character.handleDamege(dir)

    }

    
    update(time: any, delta: any) { //delta 16.666 @ 60fps

        if(this.character) {
            this.character.update(this.cursor)
        }
    }
}