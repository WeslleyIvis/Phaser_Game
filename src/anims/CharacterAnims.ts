//@ts-ignore
import Phaser from "../../lib/phaser";

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {

    anims.create({
        key: 'char-idle-down',
        frames: [{key: 'characters', frame: 'char_1'}]
    })

    anims.create({
        key: 'char-idle-up',
        frames: [{key: 'characters', frame: 'char_37'}]
    })

    anims.create({
        key: 'char-idle-left',
        frames: [{key: 'characters', frame: 'char_13'}]
    })

    anims.create({
        key: 'char-idle-right',
        frames: [{key: 'characters', frame: 'char_25'}]
    })

    anims.create({
        key: 'char-run-down',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'char-run-up',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 36,
            end: 38
        })
    })

    anims.create({
        key: 'char-run-left',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 12,
            end: 14
        })
    })

    anims.create({
        key: 'char-run-right',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 24,
            end: 26
        })
    })    

    anims.create({
        key: 'char-faint',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('characters', {
            prefix: 'char_',
            start: 12,
            end: 14
        })
    })    
}

export  {
    createCharacterAnims
}