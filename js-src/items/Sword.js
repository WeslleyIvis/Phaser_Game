export default class Sword extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, damage, atackSpeed) {
        super(scene, x, y, texture, frame);
        scene.physics.world.enable(this);
        this.damage = damage;
        this.atackSpeed = atackSpeed;
    }
}
