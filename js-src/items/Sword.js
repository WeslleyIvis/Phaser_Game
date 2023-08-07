export default class Sword extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, damage, atackSpeed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.damage = damage;
        this.atackSpeed = atackSpeed;
    }
}
