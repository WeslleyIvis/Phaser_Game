const createCharacterAnims = (anims) => {
    anims.create({
        key: 'down',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 669,
            end: 671
        })
    });
    anims.create({
        key: 'up',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 705,
            end: 707
        })
    });
    anims.create({
        key: 'left',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 681,
            end: 683
        })
    });
    anims.create({
        key: 'right',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 693,
            end: 695
        })
    });
    anims.create({
        key: 'faint',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 429,
            end: 431
        })
    });
};
export { createCharacterAnims };
