export default class HealthBar extends Phaser.GameObjects.Graphics {
    private barWidth: number;
    private barHeight: number;
    private healthBar: Phaser.GameObjects.Graphics
    private value: number
    private maxValue: number

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, {x: x, y: y})

        this.barWidth = width;
        this.barHeight = height ;
        this.value = 100
        this.maxValue = 100

        this.healthBar = new Phaser.GameObjects.Graphics(scene);
        
        this.draw()
        this.scene.add.existing(this);
    }

    setValue(newValue: number) {
        this.value = newValue
        this.draw()
    }

    setMaxValue(newValue: number) {
        this.maxValue = newValue
        this.draw()
    }

    draw() {
        this.clear()
        const percent = this.value / this.maxValue

        this.scene.add.rectangle(1000, 1000, 50, 50, 0xff0000)

        this.healthBar.fillStyle(0x00ff00)
        this.healthBar.fillRect(-this.barWidth / 2, -this.barHeight / 2, this.barHeight * percent, this.barHeight)


        this.healthBar.lineStyle(2, 0x000000);
        this.healthBar.strokeRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight);

        this.healthBar.setPosition(this.x, this.barWidth / 2, this.y - this.barHeight)
    }

}