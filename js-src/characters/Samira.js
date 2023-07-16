// Adiciona a classe para os types do GameObjectFactory
var HealthState;
(function (HealthState) {
    HealthState[HealthState["IDLE"] = 0] = "IDLE";
    HealthState[HealthState["DAMAGE"] = 1] = "DAMAGE";
})(HealthState || (HealthState = {}));
export default class Samira extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.healthState = HealthState.IDLE;
        this.damageTime = 0;
        // scene.add.existing(this)
        // scene.physics.world.enableBody(this);
        this.setFrame('samira-front1');
        this.hp = 10;
        this.velocity = 128;
    }
    handleDamege(dir) {
        if (this.healthState === HealthState.DAMAGE)
            return;
        this.setVelocity(dir.x, dir.y);
        this.setTint(0xff0000);
        this.healthState = HealthState.DAMAGE;
        this.damageTime = 0;
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        switch (this.healthState) {
            case HealthState.IDLE:
                break;
            case HealthState.DAMAGE:
                this.damageTime += delta;
                if (this.damageTime >= 250) {
                    this.healthState = HealthState.IDLE;
                    this.setTint(0xffffff);
                    this.damageTime = 0;
                }
                break;
        }
    }
    update(cursor) {
        var _a, _b, _c, _d;
        if (!cursor)
            return;
        this.setVelocityX(0);
        this.setVelocityY(0);
        // Keys
        if (cursor.right.isDown) {
            this.setVelocityX(this.velocity);
        }
        else if (cursor.left.isDown) {
            this.setVelocityX(-this.velocity);
        }
        if (cursor.up.isDown) {
            this.setVelocityY(-this.velocity);
        }
        else if (cursor.down.isDown) {
            this.setVelocityY(this.velocity);
        }
        if (((_a = this.body) === null || _a === void 0 ? void 0 : _a.velocity.x) > 0) {
            this.anims.play("right", true); // Animation sprite
        }
        else if (((_b = this.body) === null || _b === void 0 ? void 0 : _b.velocity.x) < 0) {
            this.anims.play("left", true);
        }
        else if (((_c = this.body) === null || _c === void 0 ? void 0 : _c.velocity.y) > 0) {
            this.anims.play("down", true);
        }
        else if (((_d = this.body) === null || _d === void 0 ? void 0 : _d.velocity.y) < 0) {
            this.anims.play("up", true);
        }
    }
}
Phaser.GameObjects.GameObjectFactory.register('samira', function (x, y, texture, frame) {
    var _a;
    var sprite = new Samira(this.scene, x, y, texture, frame);
    this.displayList.add(sprite);
    this.updateList.add(sprite);
    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
    (_a = sprite.body) === null || _a === void 0 ? void 0 : _a.setOffset(10, 20).setSize(30, 50);
    sprite.setCollideWorldBounds(true);
    return sprite;
});
