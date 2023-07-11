import { CST } from "../CST";
export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.PLAY });
    }
    spriteAnimationMove(key, frame, name, prefix, start, end, repeat) {
        this.anims.create({
            key: key,
            frameRate: frame,
            repeat: repeat,
            frames: this.anims.generateFrameNames(name, {
                prefix: prefix,
                start: start,
                end: end
            }),
        });
    }
    effectAnimation(key, duration, name, prefix, start, end, showOnStart, hideOnComplete) {
        this.anims.create({
            key: key,
            duration: duration,
            frames: this.anims.generateFrameNames(name, {
                prefix: prefix,
                start: start,
                end: end,
            }),
            showOnStart: showOnStart,
            hideOnComplete: hideOnComplete
        });
    }
    preload() {
        //console.log(this.textures.list)
        this.spriteAnimationMove('down', 6, 'characters', 'samira-front', 0, 2, 0);
        this.spriteAnimationMove('up', 6, 'characters', 'samira-back', 0, 2, 0);
        this.spriteAnimationMove('left', 6, 'characters', 'samira-left', 0, 2, 0);
        this.spriteAnimationMove('right', 6, 'characters', 'samira-right', 0, 2, 0);
        this.effectAnimation("magic", 2000, 'magicEffect', 'magic', 0, 60, true, true);
        this.load.image("tiles", "./assets/maps/texture.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }
    create() {
        var _a;
        // add a sprite to window, (x, y, texture, atlas)
        this.character = this.physics.add.sprite(100, 100, "characters", "samira-front1");
        this.character.setSize(30, 50).setOffset(10, 20);
        this.assassin = this.physics.add.sprite(200, 200, "enemies", "assassin-front1");
        this.character.setCollideWorldBounds(true);
        //@ts-ignore
        window.character = this.character;
        // Create keyboards && events 
        //@ts-ignore
        this.keyboard = this.input.keyboard.addKeys("W, S, A, D");
        this.input.on("pointerdown", (pointer) => {
            if (pointer.isDown) { //is clicking
                let magic = this.physics.add.sprite(pointer.x, pointer.y, "magicEffect", "magic1").play("magic");
                magic.on('animationcomplete', () => {
                    magic.destroy();
                });
            }
        });
        // Create map
        //const map = this.make.tilemap({key: "map"})
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("aseets", "tiles");
        // Layers
        const ground = (_a = map.createLayer("ground", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-1);
        const objcollider = map.createLayer("objcollider", tileset, 0, 0);
        const objabove = map.createLayer("objabove", tileset, 0, 0);
        // Map Collision
        this.physics.add.collider(this.character, objcollider);
        this.physics.add.collider(this.assassin, objcollider);
        // By tile property
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollisionByProperty({ collision: true });
        // By tile index
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollision([]);
    }
    //@ts-ignore
    update(time, delta) {
        this.physics.world.collide(this.character, this.assassin, () => { });
        // Keys
        if (this.keyboard.D.isDown) {
            this.character.setVelocityX(128);
            this.character.play("right", true); // animation - press key start animation
        }
        else if (this.keyboard.A.isDown) {
            this.character.setVelocityX(-128);
            this.character.play("left", true);
        }
        else {
            this.character.setVelocityX(0);
            if (this.keyboard.A.isDown && this.keyboard.D.isDown) {
                this.character.anims.stop();
            }
        }
        if (this.keyboard.W.isDown) {
            this.character.setVelocityY(-128);
            this.character.play("up", true);
        }
        else if (this.keyboard.S.isDown) {
            this.character.setVelocityY(128);
            this.character.play("down", true);
        }
        else {
            this.character.setVelocityY(0);
            if ((this.keyboard.W.isDown && this.keyboard.S.isDown)) {
                this.character.anims.stop();
            }
        }
    }
}
