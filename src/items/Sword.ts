enum SwordState {
    INTERVAL,
    READY
}

export default class Sword extends Phaser.Physics.Arcade.Sprite {
    stateSword = SwordState.READY
    private damage?: number
    private atackSpeed?: number = 0
    private angleStartDirection = {
        right: 0,
        left: 270,
        top: 0,
        down: 180
    }
    angleFinalDirection: number = 0

    getState()
    {
        return this.stateSword
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number, damage?: number, atackSpeed?: number) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.world.enable(this)
        this.setActive(false).setVisible(false).setImmovable(true).setDepth(1).disableBody(true)
        this.damage = damage
        this.atackSpeed = atackSpeed

    }

    toggleActiveSword()
    {
        this.setActive(!this.active).setVisible(!this.visible);
    }

    throwAtack(angle: Phaser.Math.Vector2)
    {
        if(this.stateSword === SwordState.READY)
        {
            if(angle.x === 1) 
            {
                this.setAngle(this.angleStartDirection.right)
                this.angleFinalDirection = 80
            } else if(angle.x === -1) 
            {
                this.setAngle(this.angleStartDirection.left)
                this.angleFinalDirection = -180
            }
            
            if(angle.y === 1)
            {
                this.setAngle(this.angleStartDirection.down)
                this.angleFinalDirection = 100
            } else if(angle.y === -1) 
            {
                this.setAngle(this.angleStartDirection.top)
                this.angleFinalDirection = -80
            }

            this.enableBody(true)
            this.setAlpha(1)
            this.toggleActiveSword()
            this.animationRotation()
            
            this.stateSword = SwordState.INTERVAL

            const intervalDuration = 300 - (this.atackSpeed as number)

            this.scene.time.delayedCall(intervalDuration, () => {
                this.toggleActiveSword();
                this.disableBody(true)

                const atackDuration = 600 - (this.atackSpeed as number);
                this.scene.time.delayedCall(atackDuration, () => {
                    this.stateSword = SwordState.READY
                })
            })
        
        }
    }

    updatePosition(character: Phaser.Physics.Arcade.Sprite, direction: Phaser.Math.Vector2)
    {
        this.x = character.x + (direction.x * 20)
        this.y = character.y + (direction.y * 35)
    }

    animationRotation()
    {
        this.scene.tweens.add({
            targets: this,
            angle: this.angleFinalDirection,
            ease: 'Linear',
            duration: 200,   
        })
    }
}