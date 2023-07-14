const createCharacterAnims = (anims) => {
    anims.create({
        key: 'down',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'samira-front',
            start: 0,
            end: 2
        })
    });
    anims.create({
        key: 'up',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'samira-back',
            start: 0,
            end: 2
        })
    });
    anims.create({
        key: 'left',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'samira-left',
            start: 0,
            end: 2
        })
    });
    anims.create({
        key: 'right',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'samira-right',
            start: 0,
            end: 2
        })
    });
};
export { createCharacterAnims };
