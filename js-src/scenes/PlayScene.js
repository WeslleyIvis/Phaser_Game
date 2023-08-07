import { CST } from "../CST";
import { createEnemiesAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createSpells } from "../anims/SpellsAnims";
import { sceneEvents } from "../events/EventCenter";
import "../characters/Character";
import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
import Item from "../items/Item";
import Gargule from "../enemies/Gargule";
import Projectile from "../enemies/projectile";
import ConfingScene from "./ConfingScene";
export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.PLAY });
        this.layersCollider = [];
    }
    createGroupsEnemies() {
        this.enemieProjectile = this.physics.add.group({
            classType: Projectile,
            runChildUpdate: true,
        });
        this.hodeds = this.physics.add.group({
            classType: Hoded,
            createCallback: (go) => {
                const hodedgo = go;
                hodedgo.setSize(30, 50).setOffset(10, 20);
            }
        });
        this.bats = this.physics.add.group({
            classType: Bat,
            createCallback: (go) => {
                const batgo = go;
                batgo.setSize(47, 40).setOffset(0, 10).setScale(.9),
                    batgo.body.onCollide = true;
            }
        });
        this.gargules = this.physics.add.group({
            classType: Gargule,
            createCallback: (go) => {
                const gargule = go;
                gargule.setAtackes(this.enemieProjectile);
                gargule.intervalThrowAtack(this.character);
            }
        });
        this.enemies = this.physics.add.group();
    }
    createCharacter() {
        this.character = this.add.character(700, 100, 'characters');
        this.character.setColliderCharacterGroupEnemies(this.enemies);
        this.character.setCharacterColliderGroupProjectiles(this.enemieProjectile);
        this.atackes = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            maxSize: this.character.maxAtackes,
            createCallback: (go) => {
                this.anims.play('star', go);
            }
        });
        this.character.setAtackes(this.atackes);
    }
    preload() {
        //console.log(this.textures.list)     x
        var _a;
        this.cursor = (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKeys(CST.KEYBOARD.KEYS);
        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }
    create() {
        var _a, _b, _c;
        this.scene.run(CST.SCENES.GAME_UI);
        createSpells(this.anims);
        createCharacterAnims(this.anims);
        createEnemiesAnims(this.anims);
        this.items = this.physics.add.group({
            classType: Item
        });
        this.createGroupsEnemies();
        this.createCharacter();
        for (let x = 0; x < 1; x++) {
            // this.enemies.add(this.bats.get(Phaser.Math.Between(2, 400), Phaser.Math.Between(500, 1200), 'enemies', 'bat-front1')) 
            this.enemies.add(this.hodeds.get(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 250), 'enemies', 'demon-gargoyle-front1'));
            this.enemies.add(this.gargules.get(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 250), 'enemies', 'demon-gargoyle-front1'));
        }
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("textures", "tiles");
        const ground = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
        const waterLayer = map.createLayer("water_above", tileset, 0, 0);
        const objcollider = map.createLayer("collider", tileset, 0, 0);
        const shadow = map.createLayer("shadow", tileset, 0, 0);
        const groundAbove = map.createLayer('floor_above', tileset, 0, 0);
        const objcollider_1 = map.createLayer("collider_1", tileset, 0, 0);
        const objabove_1 = (_b = map.createLayer("above_1", tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(2);
        const objabove = (_c = map.createLayer("above", tileset, 0, 0)) === null || _c === void 0 ? void 0 : _c.setDepth(3);
        const tileColliderGroup = map.getObjectLayer('tiles_collider');
        const staticTileGroup = this.physics.add.staticGroup();
        //Cria colisão para todos os objetos do tileMap
        tileColliderGroup === null || tileColliderGroup === void 0 ? void 0 : tileColliderGroup.objects.forEach((tile) => {
            const objectX = tile.x + tile.width / 2; // Adiciona a metade da largura para centralizar o objeto
            const objectY = tile.y + tile.height / 2; // Adiciona a metade da altura para centralizar o objeto
            const tileCollider = staticTileGroup.create(objectX, objectY, undefined);
            tileCollider.setSize(tile.width, tile.height);
            tileCollider.setVisible(false);
            tileCollider.setImmovable(true);
        });
        this.layersCollider.push(objcollider);
        this.layersCollider.push(objcollider_1);
        this.layersCollider.forEach(layer => {
            layer === null || layer === void 0 ? void 0 : layer.setCollisionByProperty({ collider: true });
        });
        this.character.setLayersCollider(this.layersCollider);
        ConfingScene.followCamera(this.cameras, this.character, map);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // TILE _ COLLIDER
        this.layersCollider.forEach(layerCollider => {
            this.physics.add.collider(this.enemieProjectile, layerCollider, this.handleProjectileWallCollision, undefined, this);
        });
        this.enemies.getChildren().forEach(enemie => {
            var _a;
            (_a = this.layersCollider) === null || _a === void 0 ? void 0 : _a.forEach(layer => {
                this.physics.add.collider(enemie, layer);
            });
        });
        // ATACK _ COLLIDER
        this.physics.add.collider(this.atackes, this.enemies, this.handleAtackeCollision, undefined, this);
        this.physics.add.collider(this.atackes, staticTileGroup, this.handleAtackWallCollision, undefined, this);
        this.physics.add.collider(this.enemieProjectile, staticTileGroup, this.handleProjectileWallCollision, undefined, this);
        // ENEMY _ COLLIDER
        this.physics.add.collider(this.items, this.character, this.handleItemCollision, undefined, this);
    }
    handleAtackWallCollision(obj1, obj2) {
        //this.atackes.killAndHide(obj1)
        sceneEvents.emit('update-count-atackes', this.character.maxAtackes + 1 - this.atackes.getChildren().length);
        obj1.destroy();
    }
    handleProjectileWallCollision(obj1, obj2) {
        obj1.destroy();
    }
    handleAtackeCollision(obj1, obj2) {
        const random = Phaser.Math.Between(0, 10);
        if (random <= 2) {
            this.items.get(obj2.x, obj2.y, CST.IMAGE.HEART_FULL);
        }
        sceneEvents.emit('update-count-atackes', this.character.maxAtackes + 1 - this.atackes.getChildren().length);
        // this.enemies.get(Phaser.Math.Between(100, 1500), Phaser.Math.Between(100, 1500), 'enemies', 'bat-front1')
        obj2.destroy();
        obj1.destroy();
    }
    handleItemCollision(obj1, obj2) {
        // Pega
        if (this.character.health < this.character.maxHealth) {
            this.character.recoverHealth();
            obj2.destroy();
        }
        sceneEvents.emit('update-max-health-changed', this.character.health, this.character.maxHealth);
        obj2.destroy();
    }
    update(time, delta) {
        this.hodeds.getChildren().forEach((hoded) => {
            hoded.update(this.character);
        });
        this.gargules.getChildren().forEach((gargule) => {
            gargule.update(this.character);
        });
        if (this.character) {
            this.character.update(this.cursor, this);
        }
    }
}
