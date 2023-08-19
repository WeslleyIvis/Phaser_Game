import { CST } from "../CST";
import { sceneEvents } from "../events/EventCenter";
export default class HealthBar extends Phaser.Scene {
    constructor() {
        super(CST.SCENES.HEALTH_BAR);
    }
    create() {
        this.add.rectangle(95, 47, 82, 10, 0xff0000);
        const bar = this.add.image(48, -64, CST.IMAGE.LIFE_BAR).setOrigin(0).setCrop(0, 48, 48, 16).setScale(2);
        sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this);
    }
    handlePlayerHealthChanged(health) {
    }
}
