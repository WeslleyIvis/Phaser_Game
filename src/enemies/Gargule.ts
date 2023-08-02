import Projectile from "./projectile"

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export default class Gargule extends Phaser.Physics.Arcade.Sprite {
    private direction = Direction.LEFT
    private projectiles!: Phaser.Physics.Arcade.Group
    atackEvent!: Phaser.Time.TimerEvent
    
    
    private speed: number = 60
    heart = 5

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string | number) {
        super(scene, x, y, texture, frame)
    }

    setAtackes(projectiles: Phaser.Physics.Arcade.Group) {
        this.projectiles = projectiles
    }

    intervalThrowAtack(player: Phaser.GameObjects.Sprite)
    {
        this.atackEvent = this.scene.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: () => {
                this.throwFire(player)
            },
            loop: true
        })
    }

    throwFire(player: Phaser.GameObjects.Sprite)
    {
        const vec = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y)
        vec.normalize()

        const speedX = 200, speedY = 200
        const projectile: Phaser.GameObjects.Sprite & Projectile = this.projectiles.get(this.x, this.y, 'magicEffect', 'effect_11')
        
        projectile.setRotation(vec.angle())
        projectile.playReverse('fire-bal')

        if(projectile)
        {
            projectile.fire(this.x, this.y, vec.x * speedX, vec.y * speedY)
        }
    }

    moveTowardsPlayer(player: Phaser.GameObjects.Sprite)
    {
        const direciton = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y)

        if(Math.abs(direciton.x) > Math.abs(direciton.y))
        {
            this.direction = direciton.x < 0 ? Direction.LEFT : Direction.RIGHT
        } else {
            this.direction = direciton.y < 0 ? Direction.UP : Direction.DOWN
        }
        
        direciton.normalize()
        this.setVelocity(direciton.x * this.speed, direciton.y * this.speed)
    }

    destroy(fromScene?: boolean | undefined): void {
        if(this.projectiles) {
            this.atackEvent?.destroy();

            super.destroy(fromScene);
        }
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)

        switch(this.direction) {
            case Direction.UP:
                this.anims.play('gargoyle-up', true)
                break;

            case Direction.DOWN:
                this.anims.play('gargoyle-down', true)
                break;

            case Direction.LEFT:
                this.anims.play('gargoyle-left', true)
                break;

            case Direction.RIGHT:
                this.anims.play('gargoyle-right', true)
                break;
        }
    }

    update(player: Phaser.GameObjects.Sprite): void {
        this.moveTowardsPlayer(player);
    }
}