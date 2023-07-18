import { CST } from "../CST";
import { createHodedAnims, createBatAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createSpells } from "../anims/SpellsAnims";

import { sceneEvents } from "../events/EventCenter";

import "../characters/Character";
import Character from "../characters/Character";

import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
export default class PlayScene extends Phaser.Scene {
    private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
    private character!: Character;
    
    private atackes!: Phaser.Physics.Arcade.Group

    private bats!: Phaser.Physics.Arcade.Group

    private playerCollider?: Phaser.Physics.Arcade.Collider

    constructor() {
        super({key: CST.SCENES.PLAY})
    }

    preload() {
        //console.log(this.textures.list)     

        this.cursor = this.input.keyboard?.addKeys(CST.KEYBOARD.KEYS) as Phaser.Types.Input.Keyboard.CursorKeys

        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.image("itens", "./assets/maps/itens.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }

    create() {
        this.scene.run(CST.SCENES.GAME_UI)

        createSpells(this.anims)
        createCharacterAnims(this.anims)
        createHodedAnims(this.anims)
        createBatAnims(this.anims)

        this.atackes = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
        });

        this.character = this.add.character(700, 100, 'characters')
        this.character.setScale(0.9)
        this.character.setAtackes(this.atackes)
        

        const hodeds = this.physics.add.group({
            classType: Hoded,
            createCallback: (go) => {
                const hodedgo = go as Hoded
                hodedgo.setSize(30,50).setOffset(10, 20);
            }
        })

        this.bats = this.physics.add.group({
            classType: Bat,
            createCallback: (go) => {
                const batgo = go as Bat
                batgo.setSize(47,40).setOffset(0, 10).setScale(.9),               
                (batgo.body as Phaser.Physics.Arcade.Body).onCollide = true
            }
        })

        hodeds.get(400, 400, 'enemies', 'demon-gargoyle-front1')
        

        for(let x = 0; x < 5; x++)
        {
            this.bats.get(Phaser.Math.Between(400, 800), Phaser.Math.Between(400, 900), 'enemies', 'bat-front1')
        }

        const map = this.add.tilemap("map")
        const tileset: Phaser.Tilemaps.Tileset  = map.addTilesetImage("textures", "tiles") as Phaser.Tilemaps.Tileset

        const ground = map.createLayer("floor", tileset, 0, 0)?.setDepth(-2)
        const groundAbove = map.createLayer('floor_above', tileset, 0, 0)?.setDepth(-1)
        const shadow = map.createLayer("shadow", tileset, 0, 0)
        const objcollider = map.createLayer("collider", tileset, 0, 0)
        const objabove = map.createLayer("above", tileset, 0, 0)?.setDepth(1)

        this.input.on("gameobjectdown", (pointer: Phaser.Input.Pointer, obj: Phaser.GameObjects.GameObject) => {
            obj.destroy()
        })

        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)

        objcollider?.setCollisionByProperty({collider: true})
        
        this.physics.add.collider(this.character, objcollider as Phaser.Tilemaps.TilemapLayer)
        
        this.physics.add.collider(this.atackes, objcollider as Phaser.Tilemaps.TilemapLayer, this.handleAtackWallCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
        
        this.physics.add.collider(this.atackes, this.bats, this.handleAtackeCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)

        this.physics.add.collider(this.bats, objcollider as Phaser.Tilemaps.TilemapLayer);
        this.playerCollider = this.physics.add.collider(this.bats, this.character, this.handlePlayerBatCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
    }  

    private handleAtackWallCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        this.atackes.killAndHide(obj1)
        obj1.destroy()
    }
    
    private handleAtackeCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        console.dir(obj1)
        console.dir(obj2)
        this.bats.killAndHide(obj1)
        this.bats.killAndHide(obj2)
        obj2.destroy()
        obj1.destroy()
    }

    private handlePlayerBatCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        const bat = obj2 as Bat

        const dx = this.character.x - bat.x
        const dy = this.character.y - bat.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

        this.character.handleDamege(dir)

        sceneEvents.emit('player-health-changed', this.character.health)

        if(this.character.health <= 0)
        {
            this.playerCollider?.destroy();
        }
    }

    
    update(time: any, delta: any) { //delta 16.666 @ 60fps

        if(this.character) {
            this.character.update(this.cursor)
        }
    }
}