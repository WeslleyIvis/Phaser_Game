const createCharacterAnims = (anims) => {
    anims.create({
        key: 'char-idle-down',
        frames: [{ key: 'characters', frame: 'char_247' }]
    });
    anims.create({
        key: 'char-idle-up',
        frames: [{ key: 'characters', frame: 'char_283' }]
    });
    anims.create({
        key: 'char-idle-left',
        frames: [{ key: 'characters', frame: 'char_259' }]
    });
    anims.create({
        key: 'char-idle-right',
        frames: [{ key: 'characters', frame: 'char_271' }]
    });
    anims.create({
        key: 'char-run-down',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 246,
            end: 248
        })
    });
    anims.create({
        key: 'char-run-up',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 282,
            end: 284
        })
    });
    anims.create({
        key: 'char-run-left',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 258,
            end: 260
        })
    });
    anims.create({
        key: 'char-run-right',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 270,
            end: 272
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
