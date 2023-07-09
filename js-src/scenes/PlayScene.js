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
    }
    create() {
        // add a sprite to window, (x, y, texture, atlas)
        this.character = this.add.sprite(100, 100, "characters", "samira-front1").setScale(2);
        const vielo = this.add.sprite(200, 200, "characters", "vielo-front1");
        const magicEffect = this.add.sprite(300, 300, "magicEffect", "magic0").play('magic');
        //@ts-ignore
        window.character = this.character;
        // Create keyboards && events 
        this.keyboard = this.input.keyboard.addKeys("W, S, A, D");
        this.input.on("pointermove", (pointer) => {
            if (pointer.isDown) { //is clicking
                let magic = this.add.sprite(pointer.x, pointer.y, "magicEffect", "magic1").play("magic");
                magic.on('animationcomplete', () => {
                    magic.destroy();
                });
            }
        });
    }
    //@ts-ignore
    update(time, delta) {
        if (this.keyboard.D.isDown === true) {
            this.character.x += 64 * (delta / 1000);
            this.character.play("right", true); // animation - press key start animation
        }
        if (this.keyboard.A.isDown === true) {
            this.character.x -= 64 * (delta / 1000);
            this.character.play("left", true);
        }
        if (this.keyboard.W.isDown === true) {
            this.character.y -= 64 * (delta / 1000);
            this.character.play("up", true);
        }
        if (this.keyboard.S.isDown === true) {
            this.character.y += 64 * (delta / 1000);
            this.character.play("down", true);
        }
    }
}
