import { CST } from "../CST";
import { createEnemiesAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createSpells } from "../anims/SpellsAnims";

import { sceneEvents } from "../events/EventCenter";

import "../characters/Character";
import Character from "../characters/Character";

import Bat from "../enemies/Bat";

import Hoded from "../enemies/Hoded";
import Item from "../items/Item";
import Gargule from "../enemies/Gargule";
import Projectile from "../enemies/projectile";

import ConfingScene from "./ConfingScene";
export default class PlayScene extends Phaser.Scene {
    private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
    private character!: Character;
    
    private atackes!: Phaser.Physics.Arcade.Group

    private items!: Phaser.Physics.Arcade.Group

    private enemies!: Phaser.Physics.Arcade.Group

    private hodeds!: Phaser.Physics.Arcade.Group
    private bats!: Phaser.Physics.Arcade.Group

    private gargules!: Phaser.Physics.Arcade.Group
    private enemieProjectile!: Phaser.Physics.Arcade.Group

    private layersCollider: Phaser.Tilemaps.TilemapLayer[] = []

    constructor() {
        super({key: CST.SCENES.PLAY})

    }

    createGroupsEnemies()
    {
        this.enemieProjectile = this.physics.add.group({
            classType: Projectile,
            runChildUpdate: true,
        })

        this.hodeds = this.physics.add.group({
            classType: Hoded,
            createCallback: (go) => {
                const hodedgo = go as Hoded       
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

        this.gargules = this.physics.add.group({
            classType: Gargule,
            createCallback: (go) => {
                const gargule = go as Gargule
                gargule.setAtackes(this.enemieProjectile)
                
                gargule.intervalThrowAtack(this.character)
            }
        })

        this.enemies = this.physics.add.group()
    }

    createCharacter()
    {
        this.character = this.add.character(100, 800, 'characters')
        this.character.setColliderCharacterGroupEnemies(this.enemies)
        this.character.setCharacterColliderGroupProjectiles(this.enemieProjectile)
    }

    preload() {
        this.cursor = this.input.keyboard?.addKeys(CST.KEYBOARD.KEYS) as Phaser.Types.Input.Keyboard.CursorKeys
        
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }

    create() {
        this.scene.run(CST.SCENES.GAME_UI)

        createSpells(this.anims)
        createCharacterAnims(this.anims)
        createEnemiesAnims(this.anims)

        this.items = this.physics.add.group({
            classType: Item
        })

        this.createGroupsEnemies() 
        this.createCharacter()
        
        for(let x = 0; x < 1; x++)
        {
            this.enemies.add(this.bats.get(Phaser.Math.Between(2, 400), Phaser.Math.Between(500, 1200), 'enemies', 'bat-front1')) 
            this.enemies.add(this.hodeds.get(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 250), 'enemies', 'demon-gargoyle-front1'))
            this.enemies.add(this.gargules.get(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 250), 'enemies', 'demon-gargoyle-front1'))
        }

        const map = this.add.tilemap("map")
        const tileset: Phaser.Tilemaps.Tileset  = map.addTilesetImage("textures", "tiles") as Phaser.Tilemaps.Tileset

        const ground = map.createLayer("floor", tileset, 0, 0)?.setDepth(-2)
        const waterLayer = map.createLayer("water_above", tileset, 0, 0)
        const objcollider = map.createLayer("collider", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer
        const shadow = map.createLayer("shadow", tileset, 0, 0)
        const groundAbove = map.createLayer('floor_above', tileset, 0, 0)
        const objcollider_1 = map.createLayer("collider_1", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer
        const objabove_1 = map.createLayer("above_1", tileset, 0 , 0)?.setDepth(2)
        const objabove = map.createLayer("above", tileset, 0, 0)?.setDepth(3)
              
        const tileColliderGroup = map.getObjectLayer('tiles_collider')
        const staticTileGroup = this.physics.add.staticGroup()

        window.char = this.character

        tileColliderGroup?.objects.forEach((tile) => {
            const objectX = tile.x as number + (tile.width as number) / 2; // Adiciona a metade da largura para centralizar o objeto
            const objectY = tile.y as number + (tile.height as number)  / 2; // Adiciona a metade da altura para centralizar o objeto
        
            const tileCollider = staticTileGroup.create(objectX, objectY, undefined) as Phaser.Physics.Arcade.Image

            tileCollider.setSize(tile.width as number, tile.height as number)
            tileCollider.setVisible(false)

            tileCollider.setImmovable(true);
        })

        this.layersCollider.push(objcollider)
        this.layersCollider.push(objcollider_1)

        this.layersCollider.forEach(layer => {
            layer?.setCollisionByProperty({collider: true})
        })

        this.character.setLayersCollider(this.layersCollider)
        
        ConfingScene.followCamera(this.cameras, this.character, map)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        
        // TILE _ COLLIDER
        this.layersCollider.forEach(layerCollider => {
            this.physics.add.collider(this.enemieProjectile, layerCollider as Phaser.Tilemaps.TilemapLayer, this.handleProjectileWallCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
        })

        this.enemies.getChildren().forEach(enemie => {
          this.layersCollider?.forEach(layer => {
            this.physics.add.collider(enemie, layer)
          })
        })

        // ATACK _ COLLIDER
        this.physics.add.collider(this.enemieProjectile, staticTileGroup, this.handleProjectileWallCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)

        // ENEMY _ COLLIDER
        
        this.physics.add.collider(this.items, this.character, this.handleItemCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)
        
    }  

    private handleProjectileWallCollision(obj1: Phaser.Physics.Arcade.Sprite, obj2: Phaser.Physics.Arcade.Sprite)
    {
        obj1.destroy()
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
        this.hodeds.getChildren().forEach((hoded) => {
            hoded.update(this.character);
        });
        
        this.gargules.getChildren().forEach((gargule) => {
            gargule.update(this.character);
        });

        if(this.character) {
            this.character.update(this.cursor, this)
        }

        if(this.character.x <= 20)
        {
            // this.SceneAbandonedVillage(CST.SCENES.ABANDONED_VILLAGE)
            this.scene.start(CST.SCENES.ABANDONED_VILLAGE, {spawn: "spawn_right"})
        }
    }

    SceneAbandonedVillage(targetScene: string)
    {
        this.scene.transition({
            target: targetScene,
            duration: 1000,
            moveBelow: true,
            data: {x: this.character.x, y: this.character.y}
        })
    }

}