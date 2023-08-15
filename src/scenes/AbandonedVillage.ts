import { CST } from "../CST"
import { createCharacterAnims } from "../anims/CharacterAnims"
import { createEnemiesAnims } from "../anims/EnemyAnims"
import { createSpells } from "../anims/SpellsAnims"
import { SpawnArea, SpawnXYLayerObject } from "./Interfaces"

import "../characters/Character";
import Character from "../characters/Character"
import Hoded from "../enemies/Hoded";
import ConfingScene from "./ConfingScene"

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

    spawnLayerObjectLocation(map: Phaser.Tilemaps.Tilemap, layerObject: string, objectName: string)
    {
        const layerObj = map.getObjectLayer(layerObject)
        const locationXY: {x: number, y: number} = {x: 0, y: 0}

        layerObj?.objects.forEach(obj => {
            if(obj.name === objectName)
            {
                locationXY.x = obj.x as number,
                locationXY.y = obj.y as number
            }
        })

        return locationXY;
    }

    spawnLayerObjectArea(map: Phaser.Tilemaps.Tilemap, layerObj: string, areaName: string)
    {
        const layer = map.getObjectLayer(layerObj);
        let areaSpawn: SpawnArea = {x: 0, y:0, width:0, height:0};
        
        layer?.objects.forEach(area => {
            if(area.name === areaName)
            {
                console.log(area)
                areaSpawn.x = area.x as number,
                areaSpawn.y = area.y as number,
                areaSpawn.width = area.width as number + (area.x as number),
                areaSpawn.height = area.height as number + (area.y as number)
            }
        })
        
        return areaSpawn;
    }

    create(data: any)
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

        const spawnChar:SpawnXYLayerObject = this.spawnLayerObjectLocation(map, 'spawn', data.spawn)

        console.log(spawnChar)
        
        this.character = this.add.character(spawnChar.x, spawnChar.y, 'characters')

        this.spawnEnemies = this.spawnLayerObjectArea(map, 'spawn', 'enemies');
        console.log(this.spawnEnemies)

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