import { CST } from "../CST";
import { createHodedAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import CharacterSprite from "../actions/CharacterSprite";
import Sprite from "../actions/Sprite";
import Hoded from "../enemies/Hoded";
export class PlayScene extends Phaser.Scene {
    character!: Phaser.Physics.Arcade.Sprite;
    hoded!: Phaser.Physics.Arcade.Sprite;
    enemies!: Phaser.Physics.Arcade.Group;
    atackes!: Phaser.Physics.Arcade.Group;
    keyboard!: {[index: string] : Phaser.Input.Keyboard.Key};
    constructor() {
        super({key: CST.SCENES.PLAY})
    }

    preload() {
        //console.log(this.textures.list)     
        // animator.effectAnimation("magic", 2000, 'magicEffect', 'magic', 0, 60, true, true)
        createCharacterAnims(this.anims)
        createHodedAnims(this.anims)

        this.load.image("tiles", "./assets/maps/texture.png");
        this.load.image("itens", "./assets/maps/itens.png");

        this.load.tilemapTiledJSON("map", "./assets/maps/mappy1.json");
    }

    create() {
        // CREATE SPRITES
        const bluebird = new Sprite(this, 500, 300, CST.SPRITE.BLUEBIRD).play("walk");
        this.character = new CharacterSprite(this, 500, 500, "characters")
        
        
        this.atackes = this.physics.add.group();

        const hodeds = this.physics.add.group({
            classType: Hoded
        })

        hodeds.get(400, 200, 'enemies', 0)
        
        // Set small hit box
        .setSize(30,50).setOffset(10, 20);
        this.character.setSize(30,50).setOffset(10, 20);
              
        //@ts-ignore
        window.character = this.character

        // Create keyboards && events 
        //@ts-ignore
        this.keyboard = this.input.keyboard.addKeys(CST.KEYBOARD.KEYS)

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {        
            if(pointer.isDown) { //is clicking
                let magic = this.physics.add.sprite(pointer.worldX, pointer.worldY, "magicEffect", "magic1").play("magic").setSize(50,50).setOffset(20, 35)
                this.atackes.add(magic);
                magic.on('animationcomplete', () => {
                    magic.destroy();
                })
            }
        })

        // COLLISION
        //this.physics.world.collide(this.character, , () => {})
        this.enemies = this.physics.add.group({immovable: true});
        this.enemies.add(bluebird)
        
        // adiciona colisão para as bordas da tela
        this.character.setCollideWorldBounds(true);

        this.physics.world.addCollider(this.character, this.enemies, (char, enemey) => {
            if(char.hp <= 0) {
              //  char.destroy();
            }
            console.log('colidiu')
            //enemey.destroy();
        })

        this.physics.world.addCollider(this.atackes, this.enemies, (attack, enemey) => {
            attack.destroy();
            enemey.destroy();
        })

        // CREATE MAP
        //const map = this.make.tilemap({key: "map"})
        const map = this.add.tilemap("map")
        const tileset: Phaser.Tilemaps.Tileset  = map.addTilesetImage("texture", "tiles") as Phaser.Tilemaps.Tileset

        
        // MAP LAYERS
        const ground = map.createLayer("floor", tileset, 0, 0)?.setDepth(-1)
        const objcollider = map.createLayer("collider", tileset, 0, 0)
        const objabove = map.createLayer("above", tileset, 0, 0)
        
        
        // MAP COLLISION
        this.physics.add.collider(this.character, objcollider)
        this.physics.add.collider(this.enemies, objcollider);

            // By tile property
        objcollider?.setCollisionByProperty({collider: true})
        
            // By tile index
        objcollider?.setCollision([418])
        
        // MAP EVENTS
        // INTERACTIVE ITEM FROM OBJECT LAYER
        let origin = map.createFromObjects("enemies", {key: CST.SPRITE.BLUEBIRD}).map((sprite) => {
           sprite.setInteractive();
           
        })

        this.input.on("gameobjectdown", (pointer, obj) => {
            obj.destroy()
        })

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            //@ts-ignore
            let tile = map.getTileAt(map.worldToTileX(pointer.x), map.worldToTileY(pointer.y));

            if(tile) console.log(tile)
        })

        // Camera

        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)

        //@ts-ignore
        this.enemies.children.iterate(enemy => {       
            this.physics.world.addCollider(this.enemies, enemy, () => {
                //enemy.destroy();
            })
        })
    }  
    //@ts-ignore
    update(time, delta) { //delta 16.666 @ 60fps


        let ok = true 

            for(let i = 0; i < this.enemies.getChildren().length; i++) {
                const enemy = this.enemies.getChildren()[i] as Phaser.GameObjects.Sprite;
                const distance = Phaser.Math.Distance.Between(this.character.x, this.character.y, enemy.x, enemy.y)
                
                if(distance <= 100) {
                    this.physics.moveToObject(enemy, this.character, 100)
                } else if(distance > 200) {
                    this.physics.moveTo(enemy, 800, 800, 100)
                }
                // this.physics.accelerateTo(this.enemies.getChildren()[i], this.character.x, this.character.y, 100, 100)
                         
            }
        

        this.character.setVelocityX(0)
        this.character.setVelocityY(0)
        // Keys
        if (this.keyboard.D.isDown) {
            this.character.setVelocityX(128)
        } else if (this.keyboard.A.isDown) {
            this.character.setVelocityX(-128)
        }

        if(this.keyboard.W.isDown) {
            this.character.setVelocityY(-128)        
        }
        else if(this.keyboard.S.isDown) {
            this.character.setVelocityY(128)
        }

        if(this.character.body?.velocity.x as number > 0) {
            this.character.play("right", true) // Animation sprite
        } else if(this.character.body?.velocity.x as number < 0) {
            this.character.play("left", true)
        } else if(this.character.body?.velocity.y as number > 0) {
            this.character.play("down", true)
        } else if(this.character.body?.velocity.y as number < 0) {
            this.character.play("up", true)
        } 

        // if(this.keyboard.SPACE.isDown) {
        //     console.log('oloco meo')
        // }
    }
}