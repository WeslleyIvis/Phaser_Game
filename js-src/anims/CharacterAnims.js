const createCharacterAnims = (anims) => {
    anims.create({
        key: 'char-idle-down',
        frames: [{ key: 'characters', frame: 'char_670' }]
    });
    anims.create({
        key: 'char-idle-up',
        frames: [{ key: 'characters', frame: 'char_706' }]
    });
    anims.create({
        key: 'char-idle-left',
        frames: [{ key: 'characters', frame: 'char_682' }]
    });
    anims.create({
        key: 'char-idle-right',
        frames: [{ key: 'characters', frame: 'char_694' }]
    });
    anims.create({
        key: 'char-run-down',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 669,
            end: 671
        })
    });
    anims.create({
        key: 'char-run-up',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 705,
            end: 707
        })
    });
    anims.create({
        key: 'char-run-left',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 681,
            end: 683
        })
    });
    anims.create({
        key: 'char-run-right',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 693,
            end: 695
        })
    });
    anims.create({
        key: 'char-faint',
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
