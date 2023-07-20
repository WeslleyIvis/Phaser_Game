import { CST } from "../CST";
import { sceneEvents } from "../events/EventCenter";
export default class GameUI extends Phaser.Scene {
    constructor() {
        super(CST.SCENES.GAME_UI);
        this.amountHearts = 3;
    }
    create() {
        this.add.rectangle(95, 47, 82, 10, 0xff0000);
        const bar = this.add.image(48, -64, CST.IMAGE.LIFE_BAR).setOrigin(0).setCrop(0, 48, 48, 16).setScale(2);
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        });
        this.hearts.createMultiple({
            key: CST.IMAGE.HEART_FULL,
            setXY: {
                x: 50,
                y: 300,
            },
            quantity: 3,
        });
        //@ts-ignore
        this.hearts.children.iterate((heart, index) => {
            heart.x = 50 + (index * 30);
            heart.setScale(2);
        });
        sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this);
        sceneEvents.on('update-max-health-changed', this.updateHeartCount, this);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('player-health-changed', this.handlePlayerHealthChanged, this);
        });
    }
    handlePlayerHealthChanged(health) {
        //@ts-ignore
        this.hearts.children.each((go, index) => {
            const heart = go;
            if (index < health) {
                heart.setTexture(CST.IMAGE.HEART_FULL);
            }
            else {
                heart.setTexture(CST.IMAGE.HEART_EMPTY);
            }
        });
    }
    updateHeartCount(currentHealth, maxHealth) {
        maxHealth -= currentHealth;
        console.log({ currentHealth, maxHealth });
        this.hearts.clear(true);
        this.hearts.createMultiple({
            key: CST.IMAGE.HEART_FULL,
            setXY: {
                x: 50,
                y: 50,
            },
            quantity: currentHealth
        });
        if (maxHealth) {
            this.hearts.createMultiple({
                key: CST.IMAGE.HEART_EMPTY,
                setXY: {
                    x: 50,
                    y: 50,
                },
                quantity: maxHealth
            });
        }
        //@ts-ignore
        this.hearts.children.iterate((heart, index) => {
            heart.x = 50 + (index * 30);
            heart.setScale(2);
        });
    }
}
