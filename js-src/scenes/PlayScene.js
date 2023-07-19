import { CST } from "../CST";
import { createHodedAnims, createBatAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createSpells } from "../anims/SpellsAnims";
import { sceneEvents } from "../events/EventCenter";
import "../characters/Character";
import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.PLAY });
    }
    preload() {
        //console.log(this.textures.list)     
        var _a;
        this.cursor = (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKeys(CST.KEYBOARD.KEYS);
        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.image("itens", "./assets/maps/itens.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }
    create() {
        var _a, _b, _c;
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
        this.character = this.add.character(700, 100, 'characters');
        this.character.setScale(0.9);
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
        for (let x = 0; x < 15; x++) {
            this.bats.get(Phaser.Math.Between(400, 800), Phaser.Math.Between(400, 900), 'enemies', 'bat-front1');
        }
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("textures", "tiles");
        const ground = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
        const groundAbove = (_b = map.createLayer('floor_above', tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(-1);
        const shadow = map.createLayer("shadow", tileset, 0, 0);
        const objcollider = map.createLayer("collider", tileset, 0, 0);
        const objabove = (_c = map.createLayer("above", tileset, 0, 0)) === null || _c === void 0 ? void 0 : _c.setDepth(1);
        this.input.on("gameobjectdown", (pointer, obj) => {
            obj.destroy();
        });
        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1);
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.character, objcollider);
        this.physics.add.collider(this.atackes, objcollider, this.handleAtackWallCollision, undefined, this);
        this.physics.add.collider(this.atackes, this.bats, this.handleAtackeCollision, undefined, this);
        this.physics.add.collider(this.bats, objcollider);
        this.playerCollider = this.physics.add.collider(this.bats, this.character, this.handlePlayerBatCollision, undefined, this);
    }
    handleAtackWallCollision(obj1, obj2) {
        this.atackes.killAndHide(obj1);
        obj1.destroy();
    }
    handleAtackeCollision(obj1, obj2) {
        this.bats.killAndHide(obj1);
        this.bats.killAndHide(obj2);
        obj2.destroy();
        obj1.destroy();
    }
    handlePlayerBatCollision(obj1, obj2) {
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
    update(time, delta) {
        if (this.character) {
            this.character.update(this.cursor, this);
        }
    }
}
