export default class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    hp: number;
   
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setOrigin(0, 0);
        this.setScale(1)
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.hp = 10;
    }
}