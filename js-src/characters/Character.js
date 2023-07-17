/*
A linha declare global é usada para adicionar uma declaração global ao escopo do TypeScript.
    Em seguida, é definido um namespace Phaser.GameObjects com uma interface GameObjectFactory que estende o GameObjectFactory do Phaser. A interface adiciona um novo método chamado character ao GameObjectFactory.
 */
// Estados numerados do objeto Character
var HealthState;
(function (HealthState) {
    HealthState[HealthState["IDLE"] = 0] = "IDLE";
    HealthState[HealthState["DAMAGE"] = 1] = "DAMAGE";
    HealthState[HealthState["DEAD"] = 2] = "DEAD";
})(HealthState || (HealthState = {}));
/*
    A classe Character é definida, que herda da classe Phaser.Physics.Arcade.Sprite. Ela contém propriedades e métodos relacionados ao personagem do jogo.
*/
export default class Character extends Phaser.Physics.Arcade.Sprite {
    get health() {
        return this._health;
    }
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.healthState = HealthState.IDLE;
        this.damageTime = 0;
        this._health = 3;
        this.setFrame('char_670');
        this.hp = 10;
        this.velocity = 128;
    }
    /*
        O método handleDamage é responsável por lidar com o dano recebido pelo personagem e atualizar seu estado de saúde.
    */
    handleDamege(dir) {
        if (this._health <= 0) {
            return;
        }
        if (this.healthState === HealthState.DAMAGE) {
            return;
        }
        --this._health;
        if (this._health <= 0) {
            // TODO: die
            this.healthState = HealthState.DEAD;
            this.anims.play('faint');
            this.setVelocity(0, 0);
        }
        else {
            this.setVelocity(dir.x, dir.y);
            this.setTint(0xff0000);
            this.healthState = HealthState.DAMAGE;
            this.damageTime = 0;
        }
    }
    /*
        O método preUpdate é um método interno do Phaser que é chamado antes da atualização do objeto a cada quadro. Ele é usado para atualizar o estado do personagem, como a contagem de tempo de dano.
    */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        switch (this.healthState) {
            case HealthState.IDLE:
                break;
            case HealthState.DAMAGE:
                this.damageTime += delta;
                if (this.damageTime >= 250) {
                    this.healthState = HealthState.IDLE;
                    this.setTint(0xffffff);
                    this.damageTime = 0;
                }
                break;
        }
    }
    /*
        O método update é usado para atualizar o personagem a cada quadro, verificando as teclas pressionadas e ajustando a velocidade e a animação do personagem de acordo.
    */
    update(cursor) {
        var _a, _b, _c, _d;
        if (this.healthState === HealthState.DAMAGE
            || this.healthState === HealthState.DEAD) {
            return;
        }
        if (!cursor)
            return;
        this.setVelocityX(0);
        this.setVelocityY(0);
        // Keys
        if (cursor.right.isDown) {
            this.setVelocityX(this.velocity);
        }
        else if (cursor.left.isDown) {
            this.setVelocityX(-this.velocity);
        }
        if (cursor.up.isDown) {
            this.setVelocityY(-this.velocity);
        }
        else if (cursor.down.isDown) {
            this.setVelocityY(this.velocity);
        }
        if (((_a = this.body) === null || _a === void 0 ? void 0 : _a.velocity.x) > 0) {
            this.anims.play("right", true); // Animation sprite
        }
        else if (((_b = this.body) === null || _b === void 0 ? void 0 : _b.velocity.x) < 0) {
            this.anims.play("left", true);
        }
        else if (((_c = this.body) === null || _c === void 0 ? void 0 : _c.velocity.y) > 0) {
            this.anims.play("down", true);
        }
        else if (((_d = this.body) === null || _d === void 0 ? void 0 : _d.velocity.y) < 0) {
            this.anims.play("up", true);
        }
    }
}
/*
     o método Phaser.GameObjects.GameObjectFactory.register é usado para registrar a criação do objeto character no GameObjectFactory do Phaser. Ele cria uma nova instância da classe Character, configura sua física e adiciona à lista de exibição e atualização do Phaser.
*/
Phaser.GameObjects.GameObjectFactory.register('character', function (x, y, texture, frame) {
    var _a;
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
    (_a = sprite.body) === null || _a === void 0 ? void 0 : _a.setOffset(10, 20).setSize(30, 50);
    /*
        Configuração do objeto 'sprite' para colidir com os limites do mundo do jogo (setCollideWorldBounds(true)).
    */
    sprite.setCollideWorldBounds(true);
    return sprite;
});
