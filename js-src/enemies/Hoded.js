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
export default class Hoded extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.direction = Direction.RIGHT;
        this.speed = 40;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setSize(this.width * 0.6, this.height * 0.7).setOffset(10, 20).setScale(0.85);
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileColision, this);
        this.setDepth(1);
    }
    handleTileColision(go, tile) {
        if (go !== this)
            return;
        this.direction = randomDireciton(this.direction);
    }
    moveTowardsPlayer(player) {
        const direciton = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
        if (Math.abs(direciton.x) > Math.abs(direciton.y)) {
            this.direction = direciton.x < 0 ? Direction.LEFT : Direction.RIGHT;
        }
        else {
            this.direction = direciton.y < 0 ? Direction.UP : Direction.DOWN;
        }
        direciton.normalize();
        this.setVelocity(direciton.x * this.speed, direciton.y * this.speed);
    }
    destroy(fromScene) {
        this.scene.time.delayedCall(2000, () => {
            super.destroy(fromScene);
        });
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        switch (this.direction) {
            case Direction.UP:
                this.anims.play('assassin-up', true);
                break;
            case Direction.DOWN:
                this.anims.play('assassin-down', true);
                break;
            case Direction.LEFT:
                this.anims.play('assassin-left', true);
                break;
            case Direction.RIGHT:
                this.anims.play('assassin-right', true);
                break;
        }
    }
    update(player) {
        this.moveTowardsPlayer(player);
    }
}
