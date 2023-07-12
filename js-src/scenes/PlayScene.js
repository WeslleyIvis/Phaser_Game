import { CST } from "../CST";
import { Animation } from "../actions/Animation";
import CharacterSprite from "../actions/CharacterSprite";
import Sprite from "../actions/Sprite";
export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.PLAY });
    }
    preload() {
        //console.log(this.textures.list)
        const animator = new Animation(this);
        animator.spriteAnimationMove('down', 6, 'characters', 'samira-front', 0, 2, 0);
        animator.spriteAnimationMove('up', 6, 'characters', 'samira-back', 0, 2, 0);
        animator.spriteAnimationMove('left', 6, 'characters', 'samira-left', 0, 2, 0);
        animator.spriteAnimationMove('right', 6, 'characters', 'samira-right', 0, 2, 0);
        animator.effectAnimation("magic", 2000, 'magicEffect', 'magic', 0, 60, true, true);
        this.load.image("tiles", "./assets/maps/texture.png");
        this.load.image("itens", "./assets/maps/itens.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }
    create() {
        var _a;
        // add a sprite to window, (x, y, texture, atlas)
        const bluebird = new Sprite(this, 300, 300, CST.SPRITE.BLUEBIRD);
        this.character = new CharacterSprite(this, 100, 100, CST.SPRITE.CHARACTER);
        this.hoded = this.physics.add.sprite(200, 200, "enemies", "assassin-front1");
        this.atackes = this.physics.add.group();
        // Set small hit box
        this.hoded.setSize(30, 50).setOffset(10, 20);
        this.character.setSize(30, 50).setOffset(10, 20);
        //@ts-ignore
        window.character = this.character;
        // Create keyboards && events 
        //@ts-ignore
        this.keyboard = this.input.keyboard.addKeys("W, S, A, D");
        this.input.on("pointerdown", (pointer) => {
            if (pointer.isDown) { //is clicking
                let magic = this.physics.add.sprite(pointer.x, pointer.y, "magicEffect", "magic1").play("magic").setSize(50, 50).setOffset(20, 35);
                this.atackes.add(magic);
                magic.on('animationcomplete', () => {
                    magic.destroy();
                });
            }
        });
        // Collision
        //this.physics.world.collide(this.character, this.hoded, () => {})
        this.enemies = this.physics.add.group({ immovable: true });
        this.enemies.add(this.hoded);
        // adiciona colisão para as bordas da tela
        this.character.setCollideWorldBounds(true);
        this.physics.world.addCollider(this.character, this.enemies, (char, enemey) => {
            if (char.hp <= 0) {
                char.destroy();
            }
            enemey.destroy();
        });
        this.physics.world.addCollider(this.atackes, this.enemies, (attack, enemey) => {
            attack.destroy();
            enemey.destroy();
        });
        // Create map
        //const map = this.make.tilemap({key: "map"})
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("texture", "tiles");
        const item = this.add.tilemap("map");
        const itemset = item.addTilesetImage("itens", "itens");
        // Layers
        const ground = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-1);
        const shadow = map.createLayer("shadow", tileset, 0, 0);
        const objcollider = map.createLayer("collider", tileset, 0, 0);
        const objabove = map.createLayer("above", tileset, 0, 0);
        const sword = item.createLayer("swords", itemset, 0, 0);
        // Map Collision
        this.physics.add.collider(this.character, objcollider);
        this.physics.add.collider(this.hoded, objcollider);
        // By tile property
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollisionByProperty({ collider: true });
        // By tile index
        sword === null || sword === void 0 ? void 0 : sword.setCollision([739]);
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollision([418]);
        // Map Events 
        //By location
        sword === null || sword === void 0 ? void 0 : sword.setTileLocationCallback(3, 5, 4, 2, (tile) => {
            alert('pass the sword ' + { title: tile });
            //@ts-ignore
            objcollider.setTileLocationCallback(3, 5, 4, 2, null);
        }, this);
        // By index
        objabove === null || objabove === void 0 ? void 0 : objabove.setTileIndexCallback([257, 258, 259, 260, 261, 262, 263, 264, 289, 290, 291, 292, 293], () => {
            console.log("alo");
        }, this);
        // Interactive items from object layer
        let origin = map.createFromObjects("itens", { key: CST.SPRITE.ENEMIES }).map((sprite) => {
            sprite.setInteractive();
        });
    }
    //@ts-ignore
    update(time, delta) {
        var _a, _b, _c, _d;
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            this.physics.accelerateToObject(this.enemies.getChildren()[i], this.character);
        }
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
    }
}
