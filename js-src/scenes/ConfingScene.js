export default {
    followCamera: (camera, character, tileMap) => {
        camera.main.startFollow(character);
        camera.main.setBounds(0, 0, tileMap.widthInPixels, tileMap.heightInPixels);
        camera.main.setZoom(1.2);
        // camera.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)
    }
};
