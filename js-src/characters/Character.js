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
    setAtackes(atackes) {
        this.atackes = atackes;
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
            this.anims.play('char-faint');
            this.setVelocity(0, 0);
        }
        else {
            this.setVelocity(dir.x, dir.y);
            this.setTint(0xff0000);
            this.healthState = HealthState.DAMAGE;
            this.damageTime = 0;
        }
    }
    throwAtack(scene) {
        var _a;
        if (!this.atackes) {
            return;
        }
        const atack = this.atackes.get(this.x, this.y, 'magicEffect', 'effect_146');
        if (!atack) {
            return;
        }
        const parts = (_a = this.anims.currentAnim) === null || _a === void 0 ? void 0 : _a.key.split('-');
        if (parts) {
            const direction = parts[2];
            const vec = new Phaser.Math.Vector2(0, 0);
            switch (direction) {
                case 'up':
                    vec.y = -1;
                    break;
                case 'down':
                    vec.y = 1;
                    break;
                case 'left':
                    vec.x = -1;
                    break;
                case 'right':
                    vec.x = 1;
                    break;
            }
            const angle = vec.angle();
            atack.setActive(true);
            atack.setVisible(true);
            atack.x += vec.x * 16;
            atack.y += vec.y * 16;
            atack.setRotation(angle);
            atack.setVelocity(vec.x * 300, vec.y * 300);
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
    update(cursor, scene) {
        var _a, _b, _c, _d, _e;
        if (this.healthState === HealthState.DAMAGE
            || this.healthState === HealthState.DEAD) {
            return;
        }
        if (!cursor) {
            return;
        }
        if (Phaser.Input.Keyboard.JustDown(cursor.space)) {
            this.throwAtack(scene);
            return;
        }
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
            this.anims.play("char-run-right", true); // Animation sprite
        }
        else if (((_b = this.body) === null || _b === void 0 ? void 0 : _b.velocity.x) < 0) {
            this.anims.play("char-run-left", true);
        }
        else if (((_c = this.body) === null || _c === void 0 ? void 0 : _c.velocity.y) > 0) {
            this.anims.play("char-run-down", true);
        }
        else if (((_d = this.body) === null || _d === void 0 ? void 0 : _d.velocity.y) < 0) {
            this.anims.play("char-run-up", true);
        }
        else {
            const parts = (_e = this.anims.currentAnim) === null || _e === void 0 ? void 0 : _e.key.split('-');
            if (parts) {
                parts[1] = 'idle';
                this.anims.play(parts.join('-'));
                this.setVelocity(0);
            }
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
    (_a = sprite.body) === null || _a === void 0 ? void 0 : _a.setSize(sprite.width * 0.6, sprite.height * 0.8).setOffset(10, 10);
    /*
        Configuração do objeto 'sprite' para colidir com os limites do mundo do jogo (setCollideWorldBounds(true)).
    */
    sprite.setCollideWorldBounds(true);
    return sprite;
});
