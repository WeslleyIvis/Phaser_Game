//@ts-ignore
import Phaser from "lib/phaser";

const createSpells = (anims: Phaser.Animation.AnimationManager) => {
            // animator.effectAnimation("magic", 2000, 'magicEffect', 'magic', 0, 60, true, true)
        // anims.create({
        //     key: 'spellBuble',
        //     duration: 2000,
        //     frames: anims.generateFrameNames('magicEffect', {
        //         prefix: 'magic',
        //         start: 0,
        //         end: 60
        //     }),
        //     showOnStart: true,
        //     hideOnComplete: true
        // })

        anims.create({
            key: 'tornado',
            frameRate: 10,
            repeat: -1,
            frames: anims.generateFrameNames('magicEffect', {
                prefix: 'effect_',
                start: 6,
                end: 9
            }),
        })

        anims.create({
            key: 'star',
            frameRate: 10,
            repeat: -1,
            frames: anims.generateFrameNames('magicEffect', {
                prefix: 'effect_',
                start: 146,
                end: 149
            }),
        })
}

export {
    createSpells
}