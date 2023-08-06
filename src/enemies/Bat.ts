enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

const randomDireciton = (exclude: Direction) => {
    let newDiretion = Phaser.Math.Between(0, 3);
    while(newDiretion === exclude) {
        newDiretion = Phaser.Math.Between(0, 3);
    }

    return newDiretion
}

export default class Bat extends Phaser.Physics.Arcade.Sprite {
    private direction = Direction.RIGHT
    private moveEvent: Phaser.Time.TimerEvent

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)

        this.anims.play('bat-front')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileColision, this)

        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.direction = randomDireciton(this.direction)
            },
            loop: true
        })

        this.setDepth(1)
    }

    // Destroi os eventos do objeto
    destroy(fromScene: boolean): void {
        this.moveEvent.destroy();
        
        super.destroy(fromScene)
    }
 
    // Cria colisão do objeto com os colidiveis do mapa
    private handleTileColision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {
        if(go !== this)
        {
            return
        } 

        this.direction = randomDireciton(this.direction)
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)

        const speed = 120

        switch(this.direction) {
            case Direction.UP:
                this.setVelocity(0, -speed)
                this.anims.play('bat-back', true)
                break;

            case Direction.DOWN:
                this.setVelocity(0, speed)
                this.anims.play('bat-front', true)
                break;

            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                this.anims.play('bat-left', true)
                break;

            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                this.anims.play('bat-right', true)
                break;
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('bat', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
    var sprite = new Bat(this.scene, x, y, texture, frame);
  
    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.    DYNAMIC_BODY);
  
    sprite.body?.setSize(sprite.width * 0.6, sprite.height * 0.8).setOffset(10, 10)

    sprite.setScale(0.9)
    sprite.setDepth(1);

    sprite.setCollideWorldBounds(true)

    return sprite;
})