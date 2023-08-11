import { CST } from "../CST"
import { createCharacterAnims } from "../anims/CharacterAnims"
import { createEnemiesAnims } from "../anims/EnemyAnims"
import { createSpells } from "../anims/SpellsAnims"
import { SpawnArea } from "./Interfaces"

import "../characters/Character";
import Character from "../characters/Character"
import Hoded from "../enemies/Hoded";
import ConfingScene from "./ConfingScene"

enum SpawnState {
    FULL,
    EMPTY
}

export default class AbandonedVillage extends Phaser.Scene {
    private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
    private character!: Character
    private spawnEnemies!: SpawnArea 

    private hodeds!: Phaser.Physics.Arcade.Group

    private enemies!: Phaser.Physics.Arcade.Group 
    private layersCollider: Phaser.Tilemaps.TilemapLayer[] = []

    constructor()
    {
        super({key: CST.SCENES.ABANDONED_VILLAGE})
    }

    preload()
    {
        this.cursor = this.input.keyboard?.addKeys(CST.KEYBOARD.KEYS) as Phaser.Types.Input.Keyboard.CursorKeys

        this.load.tilemapTiledJSON("ab_village", "./assets/maps/mappy1.json")
    }

    create(data: Character)
    {
        this.scene.run(CST.SCENES.GAME_UI)

        console.log(data)

        const map = this.add.tilemap("ab_village")
        const tileset: Phaser.Tilemaps.Tileset = map.addTilesetImage("textures", "tiles") as Phaser.Tilemaps.Tileset

        const floor = map.createLayer("floor", tileset, 0, 0)?.setDepth(-2)
        const waterLayer = map.createLayer("water_above", tileset, 0, 0)
        const objcollider = map.createLayer("collider", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer
        const groundAbove = map.createLayer('floor_above', tileset, 0, 0)
        const objcollider_1 = map.createLayer("collider_1", tileset, 0, 0) as Phaser.Tilemaps.TilemapLayer
        const objabove_1 = map.createLayer("above_1", tileset, 0 , 0)?.setDepth(2)
        const objabove = map.createLayer("above", tileset, 0, 0)?.setDepth(3)

        this.layersCollider.push(objcollider)
        this.layersCollider.push(objcollider_1)

        this.layersCollider.forEach(layer => {
            layer?.setCollisionByProperty({collider: true})
        })

        const spawnCharRight = map.getObjectLayer('spawn_character')
        let spawnX = 0, spawnY = 0
        
        spawnCharRight?.objects.forEach(element => {
            if(element.name === "Spawn_Right")
            {
                spawnX = element.x as number
                spawnY = element.y as number
            }
        })

        this.character = this.add.character(spawnX, spawnY, 'characters')


        const spawnEnemies = map.getObjectLayer('spawn_monster')
        spawnEnemies?.objects.forEach(area => {
            console.log(area)
            if(area.name === 'enemies')
            {
                this.spawnEnemies = {
                    x: area.x as number,
                    y: area.y as number,
                    width: area.width as number + (area.x as number),
                    height: area.height as number + (area.y as number)
                }
            }
        })

        this.enemies = this.physics.add.group()    

        this.hodeds = this.physics.add.group({
            classType: Hoded,
        })

        this.layersCollider.forEach(layer => {
            this.physics.add.collider(this.enemies, layer)
        })

        for(let i = 0 ; i < 8; i++)
        {
           this.enemies.add(this.hodeds.get(Phaser.Math.Between(this.spawnEnemies.x, this.spawnEnemies.width), Phaser.Math.Between(this.spawnEnemies.y, this.spawnEnemies.height), 'enemies', 'assassin-front1'))
        }

        this.character.setLayersCollider(this.layersCollider)
        this.character.setColliderCharacterGroupEnemies(this.enemies)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        ConfingScene.followCamera(this.cameras, this.character, map)
    }

    update(time: number, delta: number): void {
        if(this.character) {
            this.character.update(this.cursor, this)
        }

        this.hodeds.getChildren().forEach(hoded => {
            hoded.update(this.character)
        })
    }
}