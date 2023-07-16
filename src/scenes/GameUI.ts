import { CST } from "../CST"

export default class GameUI extends Phaser.Scene {
    constructor()
    {
        super(CST.SCENES.GAME_UI)
    }

    create()
    {
        const hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        }) 

        hearts.createMultiple({
            key: CST.SPRITE.BLUEBIRD,
            setXY: {
                x: 50,
                y: 20,                  
            },
            quantity: 3
        })

        //@ts-ignore
        hearts.children.iterate((heart: Phaser.GameObjects.Image, index: number) => {
            heart.x = 10 + (index * 30)
        })

        const lifebg = this.add.rectangle(50, 10, 50, 10, 0x000000)
        const lifebar = this.add.rectangle(52, 12, 45, 8, 0xff0000, .8)

    }
}