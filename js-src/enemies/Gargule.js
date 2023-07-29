var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
export default class Gargule extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.direction = Direction.LEFT;
        this.speed = 60;
    }
    setAtackes(projectiles) {
        this.projectiles = projectiles;
    }
    throwFire(player) {
        const vec = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
        vec.normalize();
        const speedX = 200, speedY = 200;
        const projectile = this.projectiles.get(this.x, this.y, 'magicEffect', 'effect_11');
        projectile.setRotation(vec.angle());
        projectile.playReverse('fire-bal');
        if (projectile) {
            projectile.fire(this.x, this.y, vec.x * speedX, vec.y * speedY);
        }
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
        var _a;
        if (this.projectiles) {
            (_a = this.atackEvent) === null || _a === void 0 ? void 0 : _a.destroy();
            super.destroy(fromScene);
        }
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        switch (this.direction) {
            case Direction.UP:
                this.anims.play('gargoyle-up', true);
                break;
            case Direction.DOWN:
                this.anims.play('gargoyle-down', true);
                break;
            case Direction.LEFT:
                this.anims.play('gargoyle-left', true);
                break;
            case Direction.RIGHT:
                this.anims.play('gargoyle-right', true);
                break;
        }
    }
    update(player) {
        this.moveTowardsPlayer(player);
    }
}
