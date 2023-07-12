export class Animation  {
    scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        this.scene = scene; 
    }

    spriteAnimationMove(key: string, frame: number, name: string, prefix: string, start: number, end: number, repeat: number) {
        this.scene.anims.create({
            key: key,
            frameRate: frame,
            repeat: repeat,
            frames: this.scene.anims.generateFrameNames(name, {
                prefix: prefix,
                start: start,
                end: end
            }),
        })
    }

    effectAnimation(key: string, duration: number, name: string, prefix: string, start: number, end: number, showOnStart: boolean, hideOnComplete: boolean) {
        this.scene.anims.create({
            key: key,
            duration: duration,
            frames: this.scene.anims.generateFrameNames(name, {
                prefix: prefix,
                start: start,
                end: end,
            }),
            showOnStart: showOnStart,
            hideOnComplete: hideOnComplete
        })
    }
}