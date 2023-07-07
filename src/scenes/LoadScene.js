import { CST } from '../CST';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD,
    });
  }

  init() {}

  preload() {
    // Load image, spritesheet, sound

    this.load.image('menu_bg', './assets/Background/bg-menu.png');
    this.load.spritesheet('bluebird', './assets/Enemies/BlueBird/Flying.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.audio('menu_music', './assets/Songs/ost-menu.mp3');

    const loadingTitle = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Loading',
      {
        fontFamily: 'Arial',
        fontSize: '40px',
        color: '#ffffff',
      },
    );

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
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50,
      );
    });

    this.load.on('progress', () => {
      //console.log('complete');
    });
  }

  create() {
    this.scene.start(CST.SCENES.MENU, 'hello from snece');
    // this.scene.launch();
  }
}
