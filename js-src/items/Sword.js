var SwordState;
(function (SwordState) {
    SwordState[SwordState["INTERVAL"] = 0] = "INTERVAL";
    SwordState[SwordState["READY"] = 1] = "READY";
})(SwordState || (SwordState = {}));
export default class Sword extends Phaser.Physics.Arcade.Sprite {
    getState() {
        return this.stateSword;
    }
    constructor(scene, x, y, texture, frame, damage, atackSpeed) {
        super(scene, x, y, texture, frame);
        this.stateSword = SwordState.READY;
        this.atackSpeed = 0;
        this.angleStartDirection = {
            right: 0,
            left: 270,
            top: 0,
            down: 180
        };
        this.angleFinalDirection = 0;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setActive(false).setVisible(false).setImmovable(true).setDepth(1).disableBody(true);
        this.damage = damage;
        this.atackSpeed = atackSpeed;
    }
    toggleActiveSword() {
        this.setActive(!this.active).setVisible(!this.visible);
    }
    throwAtack(angle) {
        if (this.stateSword === SwordState.READY) {
            if (angle.x === 1) {
                this.setAngle(this.angleStartDirection.right);
                this.angleFinalDirection = 80;
            }
            else if (angle.x === -1) {
                this.setAngle(this.angleStartDirection.left);
                this.angleFinalDirection = -180;
            }
            if (angle.y === 1) {
                this.setAngle(this.angleStartDirection.down);
                this.angleFinalDirection = 100;
            }
            else if (angle.y === -1) {
                this.setAngle(this.angleStartDirection.top);
                this.angleFinalDirection = -80;
            }
            this.enableBody(true);
            this.setAlpha(1);
            this.toggleActiveSword();
            this.animationRotation();
            this.stateSword = SwordState.INTERVAL;
            const intervalDuration = 300 - this.atackSpeed;
            this.scene.time.delayedCall(intervalDuration, () => {
                this.toggleActiveSword();
                this.disableBody(true);
                const atackDuration = 600 - this.atackSpeed;
                this.scene.time.delayedCall(atackDuration, () => {
                    this.stateSword = SwordState.READY;
                });
            });
        }
    }
    updatePosition(character, direction) {
        this.x = character.x + (direction.x * 20);
        this.y = character.y + (direction.y * 35);
    }
    animationRotation() {
        this.scene.tweens.add({
            targets: this,
            angle: this.angleFinalDirection,
            ease: 'Linear',
            duration: 200,
        });
    }
}
