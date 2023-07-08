import { CST } from '../CST';
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU,
        });
    }
    init() {
    }
    create() {
        // setOrigin 0 = faz com que a imagem se pocione no y 0 e x 0
        // setScale = Define o tamanho da imagem
        // setDepth = Define a camada do objeto parecido com (z-index);
        const defaultCaracter = {
            fontFamily: 'Arial',
            fontSize: '40px',
            color: '#ffffff',
        };
        // Create Imagems
        this.add.image(0, 0, CST.IMAGE.BG_MENU).setOrigin(0).setDepth(0);
        // Create text Buttons
        let playButton = this.add
            .text(this.renderer.width / 2.3, this.renderer.height / 2.5, '< Play >', defaultCaracter)
            .setDepth(1);
        const optionsButton = this.add
            .text(this.renderer.width / 2.3, this.renderer.height / 2.5 + 100, '< Options >', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff',
        })
            .setDepth(1);
        // Create sprites
        /*
            sprit - cria uma sprit com o tamanho definido
            setVisible - torna o objeto visivel ou não na tela
        */
        let hoverSprit = this.add.sprite(100, 100, CST.SPRITE.BLUEBIRD).setDepth(1);
        hoverSprit.setScale(2);
        hoverSprit.setVisible(false);
        // create audio, disable pauseonblur
        this.sound.play(CST.AUDIO.MENU, {
            loop: true,
        });
        // create Animations
        this.anims.create({
            key: 'walk',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames(CST.SPRITE.BLUEBIRD, {
                frames: [0, 1, 2, 3, 4, 5, 7, 8],
            }),
        });
        // Make images buttons interactive
        /*
            Pointer Events
              pointerover - hovering
              pointerout - not hovering
              ponterup - click and release
              pointerdown - just click
        */
        playButton.setInteractive();
        optionsButton.setInteractive();
        playButton.on('pointerover', () => {
            hoverSprit.setVisible(true);
            hoverSprit.play('walk');
            hoverSprit.x = playButton.x - 50;
            hoverSprit.y = playButton.y + 20;
        });
        playButton.on('pointerout', () => {
            hoverSprit.setVisible(false);
        });
        playButton.on('pointerup', () => {
            // this.scene.start();
        });
        optionsButton.on('pointerover', () => {
            hoverSprit.setVisible(true);
            hoverSprit.play('walk');
            hoverSprit.x = optionsButton.x - 50;
            hoverSprit.y = optionsButton.y + 20;
        });
        optionsButton.on('pointerout', () => {
            hoverSprit.setVisible(false);
        });
        optionsButton.on('pointerup', () => {
            //this.scene.lauch();
        });
    }
}
