//@ts-ignore
import Phaser from "lib/phaser"

const createEnemiesAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'assassin-down',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'assassin-front',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'assassin-up',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'assassin-back',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'assassin-left',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'assassin-left',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'assassin-right',
        frameRate: 6,
        repeat: 0,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'assassin-right',
            start: 0,
            end: 2
        })
    }) 

    // -- // 

    anims.create({
        key: 'bat-front',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'bat-front',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'bat-back',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'bat-back',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'bat-left',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'bat-left',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'bat-right',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'bat-right',
            start: 0,
            end: 2
        })
    })

    // -- //

    anims.create({
        key: 'gargoyle-up',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'demon-gargoyle-back',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'gargoyle-down',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'demon-gargoyle-front',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'gargoyle-left',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'demon-gargoyle-left',
            start: 0,
            end: 2
        })
    })

    anims.create({
        key: 'gargoyle-right',
        frameRate: 6,
        repeat: -1,
        frames: anims.generateFrameNames('enemies', {
            prefix: 'demon-gargoyle-right',
            start: 0,
            end: 2
        })
    })
}

export {
    createEnemiesAnims
}