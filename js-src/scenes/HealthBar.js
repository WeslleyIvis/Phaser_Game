import { sceneEvents } from "../events/EventCenter";
export default class HealthBar extends Phaser.GameObjects.Co {
    constructor(scene, x, y, width, height) {
        super(scene, { x: x, y: y });
        this.barWidth = width;
        this.barHeight = height;
        this.value = 100;
        this.maxValue = 100;
        this.healthBar = new Phaser.GameObjects.Graphics(scene);
        this.add;
        this.draw();
        this.scene.add.existing(this);
    }
    create() {
        sceneEvents.emit('update-health-bar');
    }
    setValue(newValue) {
        this.value = newValue;
        this.draw();
    }
    setMaxValue(newValue) {
        this.maxValue = newValue;
        this.draw();
    }
    draw() {
        this.clear();
        const percent = this.value / this.maxValue;
        this.healthBar.fillStyle(0x00ff00);
        this.healthBar.fillRect(-this.barWidth / 2, -this.barHeight / 2, this.barHeight * percent, this.barHeight);
        this.healthBar.lineStyle(2, 0x000000);
        this.healthBar.strokeRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight);
        this.healthBar.setPosition(this.x, this.barWidth / 2, this.y - this.barHeight);
    }
}
