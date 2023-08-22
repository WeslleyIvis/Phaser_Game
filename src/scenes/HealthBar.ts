import { CST } from "../CST"
import { sceneEvents } from "../events/EventCenter"
export default class HealthBar extends Phaser.Scene {
    private fullWidth: number;
    private imageBar: string;

    constructor(fullSize: number, image: string)
    {
        super(CST.SCENES.HEALTH_BAR)
        this.fullWidth = fullSize;
        this.imageBar = image;
    }

    init()
    {

    }

    create()
    {

    }

    handlePlayerHealthChanged(health: number)
    {   
        
    }
}