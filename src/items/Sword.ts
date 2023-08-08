enum SwordState {
    INTERVAL,
    READY
}

export default class Sword extends Phaser.Physics.Arcade.Sprite {
    private stateSword = SwordState.READY
    private damage?: number
    private atackSpeed?: number = 0
    ag: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number, damage?: number, atackSpeed?: number) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.world.enable(this)
        this.setActive(false).setVisible(false).setImmovable(true)
    
        this.damage = damage
        this.atackSpeed = atackSpeed

        this.ag = 130
    }

    toggleActiveSword()
    {
        this.setActive(!this.active).setVisible(!this.visible);
    }

    throwAtack(character: Phaser.Physics.Arcade.Sprite, angle: Phaser.Math.Vector2)
    {
        if(this.stateSword === SwordState.READY)
        {
            this.x = character.x + (angle.x * 20)
            this.y = character.y + (angle.y * 30)

            const angles = Phaser.Math.RadToDeg(Math.atan2(character.x, character.y))
                      
            this.setAlpha(1)
            this.setAngle(angles)

            this.toggleActiveSword()
            this.animationRotation()
            
            this.stateSword = SwordState.INTERVAL

            setTimeout(() => {
                this.toggleActiveSword()
            }, 500 - (this.atackSpeed as number))
        
            const atackInterval = setTimeout(() => {                
                this.stateSword = SwordState.READY
            }, 1000 - (this.atackSpeed as number))
        }
    }


    animationRotation()
    {
        this.scene.tweens.add({
            targets: this,
            angle: this.ag,
            ease: 'Linear',
            duration: 1000,
            alpha: 0
        })
    }
}