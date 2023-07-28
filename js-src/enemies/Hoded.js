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
        this.anims.play('assassin-front');
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileColision, this);
        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this.direction = randomDireciton(this.direction);
            },
            loop: true
        });
    }
    handleTileColision(go, tile) {
        console.log(go);
        if (go !== this)
            return;
        this.direction = randomDireciton(this.direction);
    }
    moveTowardsPlayer(player) {
        const direciton = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
        direciton.normalize();
        this.setVelocity(direciton.x * this.speed, direciton.y * this.speed);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        switch (this.direction) {
            case Direction.UP:
                this.setVelocity(0, -this.speed);
                this.anims.play('assassin-up', true);
                break;
            case Direction.DOWN:
                this.setVelocity(0, this.speed);
                this.anims.play('assassin-down', true);
                break;
            case Direction.LEFT:
                this.setVelocity(-this.speed, 0);
                this.anims.play('assassin-left', true);
                break;
            case Direction.RIGHT:
                this.setVelocity(this.speed, 0);
                this.anims.play('assassin-right', true);
                break;
        }
    }
    update(player) {
        this.moveTowardsPlayer(player);
    }
}
