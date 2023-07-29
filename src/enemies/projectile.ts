export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        scene.physics.world.enable(this);
        scene.add.existing(this);
    }

    fire(x: number, y: number, velocityX: number, velocityY: number)
    {
        this.body?.reset(x, y);
        this.setActive(true).setVisible(true)
        this.setVelocity(velocityX, velocityY)
    }
}