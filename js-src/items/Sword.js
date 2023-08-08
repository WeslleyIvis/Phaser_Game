var SwordState;
(function (SwordState) {
    SwordState[SwordState["INTERVAL"] = 0] = "INTERVAL";
    SwordState[SwordState["READY"] = 1] = "READY";
})(SwordState || (SwordState = {}));
export default class Sword extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, damage, atackSpeed) {
        super(scene, x, y, texture, frame);
        this.stateSword = SwordState.READY;
        this.atackSpeed = 0;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setActive(false).setVisible(false).setImmovable(true);
        this.damage = damage;
        this.atackSpeed = atackSpeed;
        this.ag = 130;
    }
    toggleActiveSword() {
        this.setActive(!this.active).setVisible(!this.visible);
    }
    throwAtack(character, angle) {
        if (this.stateSword === SwordState.READY) {
            this.x = character.x + (angle.x * 20);
            this.y = character.y + (angle.y * 30);
            const angles = Phaser.Math.RadToDeg(Math.atan2(character.x, character.y));
            this.setAlpha(1);
            this.setAngle(angles);
            this.toggleActiveSword();
            this.animationRotation();
            this.stateSword = SwordState.INTERVAL;
            setTimeout(() => {
                this.toggleActiveSword();
            }, 500 - this.atackSpeed);
            const atackInterval = setTimeout(() => {
                this.stateSword = SwordState.READY;
            }, 1000 - this.atackSpeed);
        }
    }
    animationRotation() {
        this.scene.tweens.add({
            targets: this,
            angle: this.ag,
            ease: 'Linear',
            duration: 1000,
            alpha: 0
        });
    }
}
