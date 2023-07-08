//npm install @types/phaser

// Autocompleta os types do phaser
/** @type {import("../typings/phaser")} */

import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';

let game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [LoadScene, MenuScene],
  render: {
    pixelArt: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});
