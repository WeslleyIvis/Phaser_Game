import { CST } from "../CST";
import { createHodedAnims, createBatAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import Character from "../character/Character";
import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
import { createSpellBubleAnims } from "../anims/SpellsAnims";
export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.PLAY });
    }
    preload() {
        //console.log(this.textures.list)     
        createSpellBubleAnims(this.anims);
        createCharacterAnims(this.anims);
        createHodedAnims(this.anims);
        createBatAnims(this.anims);
        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.image("itens", "./assets/maps/itens.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy1.json");
    }
    create() {
        var _a, _b;
        // CREATE SPRITES
        this.character = new Character(this, 500, 500, "characters", 'samira-front1');
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
        //@ts-ignore
        window.character = this.character;
        // Create keyboards && events 
        //@ts-ignore
        this.keyboard = this.input.keyboard.addKeys(CST.KEYBOARD.KEYS);
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
        this.physics.world.addCollider(this.character, bats);
        this.physics.add.collider(this.character, objcollider);
        this.physics.add.collider(bats, objcollider);
    }
    //@ts-ignore
    update(time, delta) {
        var _a, _b, _c, _d;
        this.character.setVelocityX(0);
        this.character.setVelocityY(0);
        // Keys
        if (this.keyboard.D.isDown) {
            this.character.setVelocityX(128);
        }
        else if (this.keyboard.A.isDown) {
            this.character.setVelocityX(-128);
        }
        if (this.keyboard.W.isDown) {
            this.character.setVelocityY(-128);
        }
        else if (this.keyboard.S.isDown) {
            this.character.setVelocityY(128);
        }
        if (((_a = this.character.body) === null || _a === void 0 ? void 0 : _a.velocity.x) > 0) {
            this.character.play("right", true); // Animation sprite
        }
        else if (((_b = this.character.body) === null || _b === void 0 ? void 0 : _b.velocity.x) < 0) {
            this.character.play("left", true);
        }
        else if (((_c = this.character.body) === null || _c === void 0 ? void 0 : _c.velocity.y) > 0) {
            this.character.play("down", true);
        }
        else if (((_d = this.character.body) === null || _d === void 0 ? void 0 : _d.velocity.y) < 0) {
            this.character.play("up", true);
        }
        // if(this.keyboard.SPACE.isDown) {
        //     console.log('oloco meo')
        // }
    }
}
