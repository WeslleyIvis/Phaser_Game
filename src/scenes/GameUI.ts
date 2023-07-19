import { CST } from "../CST"
import { sceneEvents } from "../events/EventCenter"

export default class GameUI extends Phaser.Scene {
    //@ts-ignore
    private hearts: Phaser.GameObjects.Group;

    constructor()
    {
        super(CST.SCENES.GAME_UI)
    }

    create()
    {
        // this.add.rectangle(95, 47, 82, 10, 0xff0000)
        // const bar = this.add.image(48, -64, CST.IMAGE.LIFE_BAR).setOrigin(0).setCrop(0, 48, 48, 16).setScale(2)

        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        })

        this.hearts.createMultiple({
            key: CST.IMAGE.HEART_FULL,
            setXY: {
                x: 50,
                y: 50,                  
            },
            quantity: 3,
        })

        //@ts-ignore
        this.hearts.children.iterate((heart: Phaser.GameObjects.Image, index: number) => {
            heart.x = 50 + (index * 30)
            heart.setScale(2)
        })

        sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this)

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('player-health-changed', this.handlePlayerHealthChanged, this)
        })
    }

    private handlePlayerHealthChanged(health: number) 
    {
        //@ts-ignore
        this.hearts.children.each((go: Phaser.GameObjects.GameObject, index: number) => {
            const heart = go as Phaser.GameObjects.Image
            if(index < health) 
            {
                heart.setTexture(CST.IMAGE.HEART_FULL)
            } else 
            {
                heart.setTexture(CST.IMAGE.HEART_EMPTY)
            }

        })
    }
}