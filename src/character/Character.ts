export default class Character extends Phaser.Physics.Arcade.Sprite {
    hp: number;
   
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        this.setOrigin(0, 0);
        this.setScale(1)
        this.setSize(30,50)
        this.setOffset(10, 20);
        this.setImmovable(true);
        this.hp = 10;
    }
}