export class Animation {
    constructor(scene) {
        this.scene = scene;
    }
    spriteAnimationMove(key, frame, name, prefix, start, end, repeat) {
        this.scene.anims.create({
            key: key,
            frameRate: frame,
            repeat: repeat,
            frames: this.scene.anims.generateFrameNames(name, {
                prefix: prefix,
                start: start,
                end: end
            }),
        });
    }
    effectAnimation(key, duration, name, prefix, start, end, showOnStart, hideOnComplete) {
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
        });
    }
}
