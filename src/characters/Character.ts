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

    get health() {
        return this._health;
    }

    hp: number;
    velocity: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame)
        this.setFrame('char_670',)

        this.hp = 10;
        this.velocity = 128;
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
            this.anims.play('faint')
            this.setVelocity(0, 0)
        } else {
            this.setVelocity(dir.x, dir.y)

            this.setTint(0xff0000)
    
            this.healthState = HealthState.DAMAGE
            this.damageTime= 0;
        }
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
    update(cursor: Phaser.Types.Input.Keyboard.CursorKeys): void {
        
        if(this.healthState === HealthState.DAMAGE 
            || this.healthState === HealthState.DEAD) 
            {
                return
            }

        if(!cursor ) return

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
            this.anims.play("right", true) // Animation sprite
        } else if(this.body?.velocity.x as number < 0) {
            this.anims.play("left", true)
        } else if(this.body?.velocity.y as number > 0) {
            this.anims.play("down", true)
        } else if(this.body?.velocity.y as number < 0) {
            this.anims.play("up", true)
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
    sprite.body?.setOffset(10, 20).setSize(30, 50)

    /*
        Configuração do objeto 'sprite' para colidir com os limites do mundo do jogo (setCollideWorldBounds(true)).
    */
    sprite.setCollideWorldBounds(true)

    return sprite;
})