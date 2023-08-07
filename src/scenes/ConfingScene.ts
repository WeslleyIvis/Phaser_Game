export default {
    followCamera: (camera: Phaser.Cameras.Scene2D.CameraManager, character: Phaser.Physics.Arcade.Sprite, tileMap: Phaser.Tilemaps.Tilemap) => {
        camera.main.startFollow(character)
        camera.main.setBounds(0, 0, tileMap.widthInPixels, tileMap.heightInPixels)
        camera.main.setZoom(1.2)
        // camera.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)
    }
}