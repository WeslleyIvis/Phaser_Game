const createHodedAnims = (anims: Phaser.Animations.AnimationManager) => {
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
}

export {
    createHodedAnims
}