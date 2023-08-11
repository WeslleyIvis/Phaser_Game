import { CST } from "../CST";
import "../characters/Character";
import Hoded from "../enemies/Hoded";
import ConfingScene from "./ConfingScene";
var SpawnState;
(function (SpawnState) {
    SpawnState[SpawnState["FULL"] = 0] = "FULL";
    SpawnState[SpawnState["EMPTY"] = 1] = "EMPTY";
})(SpawnState || (SpawnState = {}));
export default class AbandonedVillage extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.ABANDONED_VILLAGE });
        this.layersCollider = [];
    }
    preload() {
        var _a;
        this.cursor = (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKeys(CST.KEYBOARD.KEYS);
        this.load.tilemapTiledJSON("ab_village", "./assets/maps/mappy1.json");
    }
    create(data) {
        var _a, _b, _c;
        this.scene.run(CST.SCENES.GAME_UI);
        console.log(data);
        const map = this.add.tilemap("ab_village");
        const tileset = map.addTilesetImage("textures", "tiles");
        const floor = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
        const waterLayer = map.createLayer("water_above", tileset, 0, 0);
        const objcollider = map.createLayer("collider", tileset, 0, 0);
        const groundAbove = map.createLayer('floor_above', tileset, 0, 0);
        const objcollider_1 = map.createLayer("collider_1", tileset, 0, 0);
        const objabove_1 = (_b = map.createLayer("above_1", tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(2);
        const objabove = (_c = map.createLayer("above", tileset, 0, 0)) === null || _c === void 0 ? void 0 : _c.setDepth(3);
        this.layersCollider.push(objcollider);
        this.layersCollider.push(objcollider_1);
        this.layersCollider.forEach(layer => {
            layer === null || layer === void 0 ? void 0 : layer.setCollisionByProperty({ collider: true });
        });
        const spawnCharRight = map.getObjectLayer('spawn_character');
        let spawnX = 0, spawnY = 0;
        spawnCharRight === null || spawnCharRight === void 0 ? void 0 : spawnCharRight.objects.forEach(element => {
            if (element.name === "Spawn_Right") {
                spawnX = element.x;
                spawnY = element.y;
            }
        });
        this.character = this.add.character(spawnX, spawnY, 'characters');
        const spawnEnemies = map.getObjectLayer('spawn_monster');
        spawnEnemies === null || spawnEnemies === void 0 ? void 0 : spawnEnemies.objects.forEach(area => {
            console.log(area);
            if (area.name === 'enemies') {
                this.spawnEnemies = {
                    x: area.x,
                    y: area.y,
                    width: area.width + area.x,
                    height: area.height + area.y
                };
            }
        });
        this.enemies = this.physics.add.group();
        this.hodeds = this.physics.add.group({
            classType: Hoded,
        });
        this.layersCollider.forEach(layer => {
            this.physics.add.collider(this.enemies, layer);
        });
        for (let i = 0; i < 8; i++) {
            this.enemies.add(this.hodeds.get(Phaser.Math.Between(this.spawnEnemies.x, this.spawnEnemies.width), Phaser.Math.Between(this.spawnEnemies.y, this.spawnEnemies.height), 'enemies', 'assassin-front1'));
        }
        this.character.setLayersCollider(this.layersCollider);
        this.character.setColliderCharacterGroupEnemies(this.enemies);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        ConfingScene.followCamera(this.cameras, this.character, map);
    }
    update(time, delta) {
        if (this.character) {
            this.character.update(this.cursor, this);
        }
        this.hodeds.getChildren().forEach(hoded => {
            hoded.update(this.character);
        });
    }
}
