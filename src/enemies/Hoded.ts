import Character from "../characters/Character";

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
    private moveEvent: Phaser.Time.TimerEvent
    speed: number = 40

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this.anims.play('assassin-front')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileColision, this)

        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.direction = randomDireciton(this.direction)
            },
            loop: true
        })       
    }

    private handleTileColision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) 
    {
        console.log(go)
        if(go !== this) return

        this.direction = randomDireciton(this.direction)
    }

    moveTowardsPlayer(player: Phaser.GameObjects.Sprite) 
    {
        const direciton = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y)

        direciton.normalize()
        this.setVelocity(direciton.x * this.speed, direciton.y * this.speed)
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)

        switch(this.direction) {
            case Direction.UP:
                this.setVelocity(0, -this.speed)
                this.anims.play('assassin-up', true)
                break;

            case Direction.DOWN:
                this.setVelocity(0, this.speed)
                this.anims.play('assassin-down', true)
                break;

            case Direction.LEFT:
                this.setVelocity(-this.speed, 0)
                this.anims.play('assassin-left', true)
                break;

            case Direction.RIGHT:
                this.setVelocity(this.speed, 0)
                this.anims.play('assassin-right', true)
                break;
        }
    }

    update(player: Character): void {
        this.moveTowardsPlayer(player);
    }
}