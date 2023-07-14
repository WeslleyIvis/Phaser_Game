// Adiciona a classe para os types do GameObjectFactory

declare global 
{
    namespace Phaser.GameObjects 
    {
        interface GameObjectFactory 
        {
            samira(x: number, y: number, texture: string, frame?: string | number): Samira
        }
    }
}

export default class Samira extends Phaser.Physics.Arcade.Sprite {
    hp: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        // scene.add.existing(this)
        // scene.physics.world.enableBody(this);
        this.setFrame('samira-front1')
        this.hp = 10;
    }

    update(cursor: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if(!cursor) return


        this.setVelocityX(0)
        this.setVelocityY(0)
        // Keys
        if (cursor.right.isDown) {
            this.setVelocityX(128)
        } else if (cursor.left.isDown) {
            this.setVelocityX(-128)
        }

        if(cursor.up.isDown) {
            this.setVelocityY(-128)        
        }
        else if(cursor.down.isDown) {
            this.setVelocityY(128)
        }

        if(this.body?.velocity.x as number > 0) {
            this.play("right", true) // Animation sprite
        } else if(this.body?.velocity.x as number < 0) {
            this.play("left", true)
        } else if(this.body?.velocity.y as number > 0) {
            this.play("down", true)
        } else if(this.body?.velocity.y as number < 0) {
            this.play("up", true)
        } 
    }
}

Phaser.GameObjects.GameObjectFactory.register('samira', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
    var sprite = new Samira(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    sprite.body?.setOffset(10, 20).setSize(30, 50)
    sprite.setCollideWorldBounds(true)

    return sprite;
})