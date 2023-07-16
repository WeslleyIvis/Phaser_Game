import { CST } from "../CST";
import { createHodedAnims, createBatAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import "../characters/Samira";
import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
import { createSpellBubleAnims } from "../anims/SpellsAnims";
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
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy1.json");
    }
    create() {
        var _a, _b;
        this.scene.run(CST.SCENES.GAME_UI);
        createSpellBubleAnims(this.anims);
        createCharacterAnims(this.anims);
        createHodedAnims(this.anims);
        createBatAnims(this.anims);
        this.character = this.add.samira(500, 500, 'characters').setSize(30, 50).setOffset(10, 20);
        this.atackes = this.physics.add.group();
        const hodeds = this.physics.add.group({
            classType: Hoded,
            createCallback: (go) => {
                const hodedgo = go;
                hodedgo.setSize(30, 50).setOffset(10, 20);
            }
        });
        const bats = this.physics.add.group({
            classType: Bat,
            createCallback: (go) => {
                const batgo = go;
                batgo.setSize(47, 40).setOffset(0, 10).setScale(.9),
                    batgo.body.onCollide = true;
            }
        });
        hodeds.get(400, 400, 'enemies', 'ghost-front1');
        bats.get(500, 500, 'enemies', 'bat-front1');
        bats.get(500, 600, 'enemies', 'bat-front1');
        bats.get(500, 700, 'enemies', 'bat-front1');
        //@ts-ignore
        window.character = this.character;
        this.input.on("pointermove", (pointer) => {
            if (pointer.isDown) { //is clicking
                let magic = this.physics.add.sprite(pointer.worldX, pointer.worldY, "magicEffect", "magic1").play("spellBuble").setSize(50, 50).setOffset(20, 35);
                this.atackes.add(magic);
                magic.on('animationcomplete', () => {
                    magic.destroy();
                });
            }
        });
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("textures", "tiles");
        const ground = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
        const groundAbove = (_b = map.createLayer('floor_above', tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(-1);
        const shadow = map.createLayer("shadow", tileset, 0, 0);
        const objcollider = map.createLayer("collider", tileset, 0, 0);
        const objabove = map.createLayer("above", tileset, 0, 0);
        this.input.on("gameobjectdown", (pointer, obj) => {
            obj.destroy();
        });
        this.input.on("pointerdown", (pointer) => {
            //@ts-ignore
            let tile = map.getTileAt(map.worldToTileX(pointer.x), map.worldToTileY(pointer.y));
            if (tile)
                console.log(tile);
        });
        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1);
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollisionByProperty({ collider: true });
        //this.physics.world.addCollider(this.character, bats)
        this.physics.add.collider(this.character, objcollider);
        this.physics.add.collider(bats, objcollider);
        this.physics.add.collider(bats, this.character, this.handlePlayerBatCollision, undefined, this);
    }
    handlePlayerBatCollision(obj1, obj2) {
        const bat = obj2;
        const dx = this.character.x - bat.x;
        const dy = this.character.y - bat.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
        this.character.handleDamege(dir);
    }
    update(time, delta) {
        if (this.character) {
            this.character.update(this.cursor);
        }
    }
}
