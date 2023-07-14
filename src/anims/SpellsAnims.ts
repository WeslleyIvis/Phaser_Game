//@ts-ignore
import Phaser from "lib/phaser";

const createSpellBubleAnims = (anims: Phaser.Animation.AnimationManager) => {
            // animator.effectAnimation("magic", 2000, 'magicEffect', 'magic', 0, 60, true, true)
        anims.create({
            key: 'spellBuble',
            duration: 2000,
            frames: anims.generateFrameNames('magicEffect', {
                prefix: 'magic',
                start: 0,
                end: 60
            }),
            showOnStart: true,
            hideOnComplete: true
        })
}

export {
    createSpellBubleAnims
}