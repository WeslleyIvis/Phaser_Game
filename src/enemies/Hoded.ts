enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

const randomDireciton = (exclude: Direction) => {
    let newDiretion = Phaser.Math.Between(0,3);
    while(newDiretion === exclude) {
        newDiretion = Phaser.Math.Between(0,3);
    }

    return newDiretion
}

export default class Hoded extends Phaser.Physics.Arcade.Sprite {
    private direction = Direction.RIGHT
    speed: number = 40

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileColision, this)
 
    }

    private handleTileColision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) 
    {
        if(go !== this) return

        this.direction = randomDireciton(this.direction)
    }

    moveTowardsPlayer(player: Phaser.GameObjects.Sprite) 
    {
        const direciton = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y)
        
        if (Math.abs(direciton.x) > Math.abs(direciton.y))
        {
            this.direction = direciton.x < 0 ? Direction.LEFT : Direction.RIGHT
        } else {
            this.direction = direciton.y < 0 ? Direction.UP : Direction.DOWN
        }

        direciton.normalize()
        this.setVelocity(direciton.x * this.speed, direciton.y * this.speed)
        
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)

        switch(this.direction) {
            case Direction.UP:
                this.anims.play('assassin-up', true)
                break;

            case Direction.DOWN:
                this.anims.play('assassin-down', true)
                break;

            case Direction.LEFT:
                this.anims.play('assassin-left', true)
                break;

            case Direction.RIGHT:
                this.anims.play('assassin-right', true)
                break;
        }
    }

    update(player: Phaser.GameObjects.Sprite): void {
        this.moveTowardsPlayer(player);
    }
}