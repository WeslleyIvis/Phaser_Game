enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export default class Hoded extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
    }
}