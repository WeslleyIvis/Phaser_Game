export default class Item extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) 
    {
        super(scene, x, y, texture, frame)
        scene.physics.world.enable(this)
    }
}