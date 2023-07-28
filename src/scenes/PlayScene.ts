import { CST } from "../CST";
import { createHodedAnims, createBatAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createSpells } from "../anims/SpellsAnims";

import { sceneEvents } from "../events/EventCenter";

import "../characters/Character";
import Character from "../characters/Character";

import Bat from "../enemies/Bat";

import Hoded from "../enemies/Hoded";
import Item from "../items/Item";
import HealthBar from "./HealthBar";
export default class PlayScene extends Phaser.Scene {
    private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
    private character!: Character;
    
    private atackes!: Phaser.Physics.Arcade.Group

    private items!: Phaser.Physics.Arcade.Group

    private enemies!: Phaser.Physics.Arcade.Group

    private healthBars!: Phaser.GameObjects.Group

    private playerCollider?: Phaser.Physics.Arcade.Collider

    constructor() {
        super({key: CST.SCENES.PLAY})
    }

    preload() {
        //console.log(this.textures.list)     x

        this.cursor = this.input.keyboard?.addKeys(CST.KEYBOARD.KEYS) as Phaser.Types.Input.Keyboard.CursorKeys

        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }

    create() {
        this.scene.run(CST.SCENES.GAME_UI)

        createSpells(this.anims)
        createCharacterAnims(this.anims)
        createHodedAnims(this.anims)
        createBatAnims(this.anims)

        this.atackes = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            maxSize: 6,
            createCallback: (go) => {
                this.anims.play('star', go)
            }
        });

        this.items = this.physics.add.group({
            classType: Item
        })

        this.character = this.add.character(700, 100, 'characters')
        this.character.setAtackes(this.atackes)
        
        window.char = this.character
        
        const hodeds = this.physics.add.group({
            classType: Hoded,
            createCallback: (go) => {
                const hodedgo = go as Hoded
                hodedgo.setSize(30,50).setOffset(10, 20)
                go.body.onCollide = true
            }
        })

        this.enemies = this.physics.add.group({
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
            this.enemies.get(Phaser.Math.Between(400, 800), Phaser.Math.Between(500, 1200), 'enemies', 'bat-front1')
        }
        
        const map = this.add.tilemap("map")
        const tileset: Phaser.Tilemaps.Tileset  = map.addTilesetImage("textures", "tiles") as Phaser.Tilemaps.Tileset

        const ground = map.createLayer("floor", tileset, 0, 0)?.setDepth(-2)
        const groundAbove = map.createLayer('floor_above', tileset, 0, 0)?.setDepth(-1)
        const shadow = map.createLayer("shadow", tileset, 0, 0)
        const objcollider = map.createLayer("collider", tileset, 0, 0)  
        const objabove = map.createLayer("above", tileset, 0, 0)?.setDepth(3)
  

        const tileColliderGroup = map.getObjectLayer('tiles_collider')
        const staticTileGroup = this.physics.add.staticGroup()

        tileColliderGroup?.objects.forEach((tile) => {
            const objectX = tile.x as number + (tile.width as number) / 2; // Adiciona a metade da largura para centralizar o objeto
            const objectY = tile.y as number + (tile.height as number)  / 2; // Adiciona a metade da altura para centralizar o objeto
        
            const tileCollider = staticTileGroup.create(objectX, objectY, undefined) as Phaser.Physics.Arcade.Image

            tileCollider.setSize(tile.width as number, tile.height as number)
            tileCollider.setVisible(false)

            tileCollider.setImmovable(true);
        })

        this.physics.add.collider(this.character, staticTileGroup)
        this.physics.add.collider(this.enemies, staticTileGroup)

        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        // this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)
        this.cameras.main.setZoom(1.2)

        window.can = this.cameras

        objcollider?.setCollisionByProperty({collider: true})
        
        
        
        this.physics.add.collider(this.character, objcollider as Phaser.Tilemaps.TilemapLayer)
        
        this.physics.add.collider(this.atackes, objcollider as Phaser.Tilemaps.TilemapLayer, this.handleAtackWallCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
        
        this.physics.add.collider(this.atackes, this.enemies, this.handleAtackeCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)

        this.physics.add.collider(this.enemies, objcollider as Phaser.Tilemaps.TilemapLayer);
        this.playerCollider = this.physics.add.collider(this.enemies, this.character, this.handlePlayerEnemyCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)

        this.physics.add.collider(this.items, objcollider as Phaser.Tilemaps.TilemapLayer)
        this.physics.add.collider(this.items, this.character, this.handleItemCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
        
    }  

    private handleAtackWallCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        this.atackes.killAndHide(obj1)
        obj1.destroy()
    }
    
    private handleAtackeCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.Physics.Arcade.Sprite) {
        console.dir({obj1, obj2})

        const random = Phaser.Math.Between(0, 10)
        console.log(random)

        if(random <=4) {
            this.items.get(obj2.x, obj2.y, CST.IMAGE.HEART_FULL)
        }

        this.enemies.get(Phaser.Math.Between(100, 1500), Phaser.Math.Between(100, 1500), 'enemies', 'bat-front1')

        obj2.destroy()
        obj1.destroy()
    }

    private handlePlayerEnemyCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.Sprite) {
        const bat = obj2 

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

    handleItemCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
        
        // Pega
        if(this.character.health < this.character.maxHealth) {
            this.character.recoverHealth();
            obj2.destroy();
        }

        
        sceneEvents.emit('update-max-health-changed', this.character.health, this.character.maxHealth)
        obj2.destroy();
    }

    
    update(time: any, delta: any) { //delta 16.666 @ 60fps

        if(this.character) {
            this.character.update(this.cursor, this)
        }
    }
}