export default class Sword extends Phaser.Physics.Arcade.Sprite {
    private damage?: number
    private atackSpeed?: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number, damage?: number, atackSpeed?: number) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.world.enable(this)

        this.damage = damage
        this.atackSpeed = atackSpeed
    }
}