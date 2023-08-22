import { CST } from "../CST";
import { sceneEvents } from "../events/EventCenter";
export default class GameUI extends Phaser.Scene {
    constructor() {
        super(CST.SCENES.GAME_UI);
        this.amountHearts = 5;
        this.amoutAtackes = 0;
    }
    create() {
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        });
        this.hearts.createMultiple({
            key: CST.IMAGE.HEART_FULL,
            setXY: {
                x: 50,
                y: 50,
            },
            quantity: this.amountHearts,
        });
        //@ts-ignore
        this.hearts.children.iterate((heart, index) => {
            heart.x = 50 + (index * 30);
            heart.setScale(2);
        });
        this.atackes = this.add.text(45, 70, `X ${3}`);
        sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this);
        sceneEvents.on('update-max-health-changed', this.updateHeartCount, this);
        sceneEvents.on('update-count-atackes', this.countAtackes, this);
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
    countAtackes(amount) {
        this.atackes.text = `X ${amount}`;
    }
}
