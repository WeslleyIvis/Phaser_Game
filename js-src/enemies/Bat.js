var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
const randomDireciton = (exclude) => {
    let newDiretion = Phaser.Math.Between(0, 3);
    while (newDiretion === exclude) {
        newDiretion = Phaser.Math.Between(0, 3);
    }
    return newDiretion;
};
export default class Bat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.direction = Direction.RIGHT;
        this.anims.play('bat-front');
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileColision, this);
        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.direction = randomDireciton(this.direction);
            },
            loop: true
        });
    }
    // Destroi os eventos do objeto
    destroy(fromScene) {
        this.moveEvent.destroy();
        super.destroy(fromScene);
    }
    // Cria colisão do objeto com os colidiveis do mapa
    handleTileColision(go, tile) {
        if (go !== this) {
            return;
        }
        this.direction = randomDireciton(this.direction);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        const speed = 120;
        switch (this.direction) {
            case Direction.UP:
                this.setVelocity(0, -speed);
                this.anims.play('bat-back', true);
                break;
            case Direction.DOWN:
                this.setVelocity(0, speed);
                this.anims.play('bat-front', true);
                break;
            case Direction.LEFT:
                this.setVelocity(-speed, 0);
                this.anims.play('bat-left', true);
                break;
            case Direction.RIGHT:
                this.setVelocity(speed, 0);
                this.anims.play('bat-right', true);
                break;
        }
    }
}
