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

enum HealthState 
{
    IDLE,
    DAMAGE
}

export default class Samira extends Phaser.Physics.Arcade.Sprite {
    private healthState = HealthState.IDLE;
    private damageTime = 0;
    hp: number;
    velocity: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        // scene.add.existing(this)
        // scene.physics.world.enableBody(this);
        this.setFrame('samira-front1')

        this.hp = 10;
        this.velocity = 128;
    }

    handleDamege(dir: Phaser.Math.Vector2) 
    {
        if(this.healthState === HealthState.DAMAGE) return

        this.setVelocity(dir.x, dir.y)

        this.setTint(0xff0000)

        this.healthState = HealthState.DAMAGE
        this.damageTime= 0;
    }

    protected preUpdate(time: number, delta: number): void 
    {
        super.preUpdate(time, delta)
        switch (this.healthState) 
        {
            case HealthState.IDLE:
                break

            case HealthState.DAMAGE:
                this.damageTime += delta;
                if(this.damageTime >= 250) 
                {
                    this.healthState = HealthState.IDLE
                    this.setTint(0xffffff)
                    this.damageTime = 0
                }
                break
        }    
    }
    
    update(cursor: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if(!cursor) return


        this.setVelocityX(0)
        this.setVelocityY(0)
        // Keys
        if (cursor.right.isDown) {
            this.setVelocityX(this.velocity)
        } else if (cursor.left.isDown) {
            this.setVelocityX(-this.velocity)
        }

        if(cursor.up.isDown) {
            this.setVelocityY(-this.velocity)        
        }
        else if(cursor.down.isDown) {
            this.setVelocityY(this.velocity)
        }
        
        if(this.body?.velocity.x as number > 0) {
            this.anims.play("right", true) // Animation sprite
        } else if(this.body?.velocity.x as number < 0) {
            this.anims.play("left", true)
        } else if(this.body?.velocity.y as number > 0) {
            this.anims.play("down", true)
        } else if(this.body?.velocity.y as number < 0) {
            this.anims.play("up", true)
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