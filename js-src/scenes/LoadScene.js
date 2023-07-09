import { CST } from '../CST';
export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD,
        });
    }
    init() { }
    loadImages() {
        this.load.setPath("./assets/image");
        for (let prop in CST.IMAGE) {
            // @ts-ignore
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }
    loadAudio() {
        this.load.setPath("./assets/audio");
        for (let prop in CST.AUDIO) {
            //@ts-ignore 
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }
    loadSprit(frameConfig) {
        this.load.setPath("./assets/sprites");
        for (let prop in CST.SPRITE) {
            //@ts-ignore
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }
    preload() {
        //this.load.spritesheet("character", "./assets/sprites/spritesheet.png", {frameWidth: 48, frameHeight: 72})
        // Load Atlas
        this.load.atlas("characters", "./assets/sprites/spritesheet.png", "./assets/sprites/sprites.json");
        this.load.atlas("enemies", "./assets/sprites/enemies.png", "./assets/sprites/enemies.json");
        this.load.atlas("magicEffect", "./assets/sprites/magicEffect.png", "./assets/sprites/magicEffect.json");
        // Load image, spritesheet, sound
        this.loadImages();
        this.loadAudio();
        this.loadSprit({
            frameWidth: 32,
            frameHeight: 32
        });
        const loadingTitle = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Loading', {
            fontFamily: 'Arial',
            fontSize: '40px',
            color: '#ffffff',
        });
        loadingTitle.setOrigin(0.5, 2);
        // Create loading bar
        /*
        Loader Events:
          Complete - when done loading everything.
          Progress - loader number progress in decimal.
        */
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff,
            },
        });
        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        });
        this.load.on('load', (file) => {
            // todos os arquivos que são carregados antes do jogo começar
            console.log(file.src);
        });
    }
    create() {
        this.scene.start(CST.SCENES.MENU);
        // this.scene.launch();
    }
}
