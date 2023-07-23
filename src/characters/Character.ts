/*
A linha declare global é usada para adicionar uma declaração global ao escopo do TypeScript.
    Em seguida, é definido um namespace Phaser.GameObjects com uma interface GameObjectFactory que estende o GameObjectFactory do Phaser. A interface adiciona um novo método chamado character ao GameObjectFactory.
 */ 

declare global 
{
    namespace Phaser.GameObjects 
    {
        interface GameObjectFactory 
        {
            character(x: number, y: number, texture: string, frame?: string | number): Character
        }
    }
}

// Estados numerados do objeto Character
enum HealthState 
{
    IDLE,
    DAMAGE,
    DEAD
}

/*
    A classe Character é definida, que herda da classe Phaser.Physics.Arcade.Sprite. Ela contém propriedades e métodos relacionados ao personagem do jogo.
*/
export default class Character extends Phaser.Physics.Arcade.Sprite {
    private healthState = HealthState.IDLE;
    private damageTime = 0;

    private _health = 3;
    private atackes!: Phaser.Physics.Arcade.Group
    
    maxHealth: number = 5;
    velocity: number = 300;
    experience: number = 0
    lv: number = 1;

    get health() {
        return this._health;
    }

    recoverHealth() {
        this._health++
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        this.setFrame('char_247')

        scene.input.on('pointerdown', (cursor: Phaser.Input.Pointer) => {
            this.cursorAtack(cursor)
        })
    }

    setAtackes(atackes: Phaser.Physics.Arcade.Group) 
    {
        this.atackes = atackes;
    }

    /*
        O método handleDamage é responsável por lidar com o dano recebido pelo personagem e atualizar seu estado de saúde.
    */
    handleDamege(dir: Phaser.Math.Vector2) 
    {
        if(this._health <= 0) 
        {
            return
        }

        if(this.healthState === HealthState.DAMAGE)
        {
            return  
        } 

        --this._health

        if(this._health <= 0) 
        {
            // TODO: die
            this.healthState = HealthState.DEAD
            this.anims.play('char-faint')
            this.setVelocity(0, 0)
        } else {
            this.setVelocity(dir.x, dir.y)

            this.setTint(0xff0000)
    
            this.healthState = HealthState.DAMAGE
            this.damageTime= 0;
        }
    }

    private throwAtack(scene: Phaser.Scene) 
    {
        if(!this.atackes)
        {
            return 
        }

        const atack = this.atackes.get(this.x, this.y, 'magicEffect', 'effect_146') as Phaser.Physics.Arcade.Sprite

        if(!atack) {
            return
        }

        const vec = this.currentAngle()
        const angle = vec.angle()

        atack.setActive(true)
        atack.setVisible(true);
        
        atack.x += vec.x * 16;
        atack.y += vec.y * 16;
        
        atack.setRotation(angle)
        atack.setVelocity(vec.x * 300, vec.y * 300)        

    }

    private cursorAtack(cursor: Phaser.Input.Pointer) {
        const atack = this.atackes.get(this.x, this.y, 'magicEffect', 'effect_146') as Phaser.Physics.Arcade.Sprite

        const directionX = cursor.worldX - this.x
        const directionY = cursor.worldY - this.y

        /*
            O processo de normalização consiste em dividir cada componente do vetor pela magnitude total do vetor. A magnitude total do vetor é a raiz quadrada da soma dos quadrados de suas componentes (de acordo com o teorema de Pitágoras). O cálculo é feito da seguinte maneira:

            length é a magnitude total do vetor de direção. normalizedDirectionX e normalizedDirectionY são as componentes do vetor de direção normalizado.
        */
        const length = Math.sqrt(directionX * directionX + directionY * directionY)
        const normalizedDirectionX = directionX / length
        const normalizedDirectionY = directionY / length

        // Velocidade do atack
        const atackSpeed = 300;

        /* 
        Define a velocidade do ataque multiplicando o vetor de direção normalizado pela velocidade
        */
        atack.setActive(true).setVisible(true).setVelocity(normalizedDirectionX * atackSpeed, normalizedDirectionY * atackSpeed)

         // Define a rotação do ataque para a direção do cursor -- Radianos
        const angle = Phaser.Math.RadToDeg(Math.atan2(normalizedDirectionY, normalizedDirectionX))
        atack.setRotation(angle)
    }

    /* 
    Pega a direção do personagem em angulos com base na direção que ele se movimentou pela última vez
    */
    private currentAngle() {
        const parts = this.anims.currentAnim?.key.split('-')      
        const vec = new Phaser.Math.Vector2(0, 0)

        if(parts) 
        {
            const diretion = parts[2]
            
            switch(diretion)
            {
                case 'up':
                    vec.y = -1
                    break

                case 'down':
                    vec.y = 1
                    break

                case 'left':
                    vec.x = -1
                    break
                    
                case 'right':
                    vec.x = 1
                    break
            }
        }

        return vec
    }

    /*
        O método preUpdate é um método interno do Phaser que é chamado antes da atualização do objeto a cada quadro. Ele é usado para atualizar o estado do personagem, como a contagem de tempo de dano.
    */
    protected preUpdate(time: number, delta: number): void 
    {
        super.preUpdate(time, delta)
        switch (this.healthState) 
        {
            case HealthState.IDLE:
                break

            case HealthState.DAMAGE:
                this.damageTime += delta;
                if(this.damageTime >= 250) 
                {
                    this.healthState = HealthState.IDLE
                    this.setTint(0xffffff)
                    this.damageTime = 0
                }
                break
        }    
    }
    
    /*
        O método update é usado para atualizar o personagem a cada quadro, verificando as teclas pressionadas e ajustando a velocidade e a animação do personagem de acordo.
    */
    update(cursor: Phaser.Types.Input.Keyboard.CursorKeys, scene: Phaser.Scene): void {
        if(this.healthState === HealthState.DAMAGE 
            || this.healthState === HealthState.DEAD) 
            {
                return
            }

        if(!cursor ) {
            return
        } 

        if(Phaser.Input.Keyboard.JustDown(cursor.space))
        {
            this.throwAtack(scene)
            return
        }

        this.setVelocityX(0)
        this.setVelocityY(0)
        // Keys
        if (cursor.right.isDown) {
            this.setVelocityX(this.velocity)
        } else if (cursor.left.isDown) {
            this.setVelocityX(-this.velocity)
        }

        if(cursor.up.isDown) {
            this.setVelocityY(-this.velocity)        
        }
        else if(cursor.down.isDown) {
            this.setVelocityY(this.velocity)
        }
        
        if(this.body?.velocity.x as number > 0) {
            this.anims.play("char-run-right", true) // Animation sprite
        } else if(this.body?.velocity.x as number < 0) {
            this.anims.play("char-run-left", true)
        } else if(this.body?.velocity.y as number > 0) {
            this.anims.play("char-run-down", true)
        } else if(this.body?.velocity.y as number < 0) {
            this.anims.play("char-run-up", true)
        } else {
            const parts = this.anims.currentAnim?.key.split('-');
            if(parts)
            {
                parts[1] = 'idle' 
                this.anims.play(parts.join('-'));
                this.setVelocity(0);
            }
        }
    }
}

/*
     o método Phaser.GameObjects.GameObjectFactory.register é usado para registrar a criação do objeto character no GameObjectFactory do Phaser. Ele cria uma nova instância da classe Character, configura sua física e adiciona à lista de exibição e atualização do Phaser.
*/
Phaser.GameObjects.GameObjectFactory.register('character', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
    var sprite = new Character(this.scene, x, y, texture, frame);

    
    /* 
    Adição do objeto 'sprite' à lista de exibição (displayList) e lista de atualização (updateList) do Phaser. Isso permite que o Phaser saiba quais objetos devem ser renderizados e atualizados no jogo.
    */ 
   this.displayList.add(sprite);
   this.updateList.add(sprite);
   
   /*
   Ativação do corpo físico do objeto 'sprite' para que ele possa interagir com o ambiente de física do Phaser.
   */
  this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
  
  /*
  Definição de um deslocamento (setOffset) e tamanho (setSize) para o corpo físico do objeto 'sprite'
  */
    sprite.body?.setSize(sprite.width * 0.6, sprite.height * 0.8).setOffset(10, 10)

    sprite.setScale(0.9)
    sprite.setDepth(1);
    /*
        Configuração do objeto 'sprite' para colidir com os limites do mundo do jogo (setCollideWorldBounds(true)).
    */
    sprite.setCollideWorldBounds(true)

    return sprite;
})