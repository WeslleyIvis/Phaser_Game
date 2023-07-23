import { CST } from "../CST";
import { createHodedAnims, createBatAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createSpells } from "../anims/SpellsAnims";
import { sceneEvents } from "../events/EventCenter";
import "../characters/Character";
import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
import Item from "../items/item";
export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.PLAY });
    }
    preload() {
        //console.log(this.textures.list)     x
        var _a;
        this.cursor = (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKeys(CST.KEYBOARD.KEYS);
        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy1.json");
    }
    create() {
        var _a, _b, _c, _d, _e;
        this.scene.run(CST.SCENES.GAME_UI);
        createSpells(this.anims);
        createCharacterAnims(this.anims);
        createHodedAnims(this.anims);
        createBatAnims(this.anims);
        this.atackes = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            maxSize: 3,
            createCallback: (go) => {
                this.anims.play('star', go);
            }
        });
        this.items = this.physics.add.group({
            classType: Item
        });
        this.items.get(500, 500, CST.IMAGE.HEART_EMPTY);
        this.character = this.add.character(700, 100, 'characters');
        this.character.setAtackes(this.atackes);
        window.char = this.character;
        const hodeds = this.physics.add.group({
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
        hodeds.get(400, 400, 'enemies', 'demon-gargoyle-front1');
        for (let x = 0; x < 5; x++) {
            this.bats.get(Phaser.Math.Between(400, 800), Phaser.Math.Between(1200, 1200), 'enemies', 'bat-front1');
        }
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("textures", "tiles");
        const ground = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
        const groundAbove = (_b = map.createLayer('floor_above', tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(-1);
        const shadow = map.createLayer("shadow", tileset, 0, 0);
        const shadow_2 = map.createLayer("shadow_2", tileset, 0, 0);
        const objcollider = map.createLayer("collider", tileset, 0, 0);
        const objcollider_2 = (_c = map.createLayer("collider_2", tileset, 0, 0)) === null || _c === void 0 ? void 0 : _c.setDepth(2);
        const objabove = (_d = map.createLayer("above", tileset, 0, 0)) === null || _d === void 0 ? void 0 : _d.setDepth(3);
        const objabove_2 = (_e = map.createLayer("above_2", tileset, 0, 0)) === null || _e === void 0 ? void 0 : _e.setDepth(3);
        const tileColliderGroup = map.getObjectLayer('tiles_collider');
        const staticTileGroup = this.physics.add.staticGroup();
        tileColliderGroup === null || tileColliderGroup === void 0 ? void 0 : tileColliderGroup.objects.forEach((tile) => {
            const objectX = tile.x + tile.width / 2; // Adiciona a metade da largura para centralizar o objeto
            const objectY = tile.y + tile.height / 2; // Adiciona a metade da altura para centralizar o objeto
            const tileCollider = staticTileGroup.create(objectX, objectY, undefined);
            tileCollider.setSize(tile.width, tile.height);
            tileCollider.setVisible(false);
            tileCollider.setImmovable(true);
        });
        this.physics.add.collider(this.character, staticTileGroup);
        this.physics.add.collider(this.bats, staticTileGroup);
        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)
        this.cameras.main.setZoom(1.2);
        window.can = this.cameras;
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollisionByProperty({ collider: true });
        objcollider_2 === null || objcollider_2 === void 0 ? void 0 : objcollider_2.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.character, objcollider);
        this.physics.add.collider(this.atackes, objcollider, this.handleAtackWallCollision, undefined, this);
        this.physics.add.collider(this.atackes, this.bats, this.handleAtackeCollision, undefined, this);
        this.physics.add.collider(this.bats, objcollider);
        this.playerCollider = this.physics.add.collider(this.bats, this.character, this.handlePlayerEnemyCollision, undefined, this);
        this.physics.add.collider(this.items, objcollider);
        this.physics.add.collider(this.items, this.character, this.handleItemCollision, undefined, this);
    }
    handleAtackWallCollision(obj1, obj2) {
        this.atackes.killAndHide(obj1);
        obj1.destroy();
    }
    handleAtackeCollision(obj1, obj2) {
        console.dir({ obj1, obj2 });
        const random = Phaser.Math.Between(0, 10);
        console.log(random);
        if (random <= 4) {
            this.items.get(obj2.x, obj2.y, CST.IMAGE.HEART_FULL);
        }
        obj2.destroy();
        obj1.destroy();
    }
    handlePlayerEnemyCollision(obj1, obj2) {
        var _a;
        const bat = obj2;
        const dx = this.character.x - bat.x;
        const dy = this.character.y - bat.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
        this.character.handleDamege(dir);
        sceneEvents.emit('player-health-changed', this.character.health);
        if (this.character.health <= 0) {
            (_a = this.playerCollider) === null || _a === void 0 ? void 0 : _a.destroy();
        }
    }
    handleItemCollision(obj1, obj2) {
        // Pega
        if (this.character.health < this.character.maxHealth) {
            this.character.recoverHealth();
            obj2.destroy();
        }
        sceneEvents.emit('update-max-health-changed', this.character.health, this.character.maxHealth);
    }
    update(time, delta) {
        if (this.character) {
            this.character.update(this.cursor, this);
        }
    }
}
