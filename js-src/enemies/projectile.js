export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
    }
    fire(x, y, velocityX, velocityY) {
        var _a;
        (_a = this.body) === null || _a === void 0 ? void 0 : _a.reset(x, y);
        this.setActive(true).setVisible(true);
        this.setVelocity(velocityX, velocityY);
    }
}
