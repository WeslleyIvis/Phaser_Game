import { CST } from "../CST";
import { createEnemiesAnims } from "../anims/EnemyAnims";
import { createCharacterAnims } from "../anims/CharacterAnims";
import { createSpells } from "../anims/SpellsAnims";
import { sceneEvents } from "../events/EventCenter";
import "../characters/Character";
import Bat from "../enemies/Bat";
import Hoded from "../enemies/Hoded";
import Item from "../items/Item";
import Gargule from "../enemies/Gargule";
import Projectile from "../enemies/projectile";
export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.PLAY });
    }
    createGroupsEnemies() {
        this.enemieProjectile = this.physics.add.group({
            classType: Projectile,
            runChildUpdate: true,
        });
        this.hodeds = this.physics.add.group({
            classType: Hoded,
            createCallback: (go) => {
                const hodedgo = go;
                hodedgo.setSize(30, 50).setOffset(10, 20);
                hodedgo.update(this.character);
            }
        });
        this.bats = this.physics.add.group({
            classType: Bat,
            createCallback: (go) => {
                const batgo = go;
                batgo.setSize(47, 40).setOffset(0, 10).setScale(.9),
                    batgo.body.onCollide = true;
            }
        });
        this.gargules = this.physics.add.group({
            classType: Gargule,
            createCallback: (go) => {
                const gargule = go;
                gargule.setAtackes(this.enemieProjectile);
                gargule.atackEvent = this.time.addEvent({
                    delay: Phaser.Math.Between(1000, 3000),
                    callback: () => {
                        gargule.throwFire(this.character);
                    },
                    loop: true
                });
            }
        });
        this.enemies = this.physics.add.group();
    }
    createCharacter() {
        this.character = this.add.character(700, 100, 'characters');
        this.atackes = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            maxSize: this.character.maxAtackes,
            createCallback: (go) => {
                this.anims.play('star', go);
            }
        });
        this.character.setAtackes(this.atackes);
    }
    preload() {
        //console.log(this.textures.list)     x
        var _a;
        this.cursor = (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKeys(CST.KEYBOARD.KEYS);
        this.load.image("tiles", "./assets/maps/textures.png");
        this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }
    create() {
        var _a, _b, _c;
        this.scene.run(CST.SCENES.GAME_UI);
        createSpells(this.anims);
        createCharacterAnims(this.anims);
        createEnemiesAnims(this.anims);
        this.items = this.physics.add.group({
            classType: Item
        });
        this.createCharacter();
        this.createGroupsEnemies();
        for (let x = 0; x < 3; x++) {
            this.enemies.add(this.bats.get(Phaser.Math.Between(400, 800), Phaser.Math.Between(500, 1200), 'enemies', 'bat-front1'));
            this.enemies.add(this.hodeds.get(Phaser.Math.Between(400, 800), Phaser.Math.Between(500, 1200), 'enemies', 'demon-gargoyle-front1'));
            this.enemies.add(this.gargules.get(Phaser.Math.Between(400, 800), Phaser.Math.Between(500, 1200), 'enemies', 'demon-gargoyle-front1'));
        }
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("textures", "tiles");
        const ground = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
        const groundAbove = (_b = map.createLayer('floor_above', tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(-1);
        const shadow = map.createLayer("shadow", tileset, 0, 0);
        const objcollider = map.createLayer("collider", tileset, 0, 0);
        const objabove = (_c = map.createLayer("above", tileset, 0, 0)) === null || _c === void 0 ? void 0 : _c.setDepth(3);
        const tileColliderGroup = map.getObjectLayer('tiles_collider');
        const staticTileGroup = this.physics.add.staticGroup();
        //Cria colisão para todos os objetos do tileMap
        tileColliderGroup === null || tileColliderGroup === void 0 ? void 0 : tileColliderGroup.objects.forEach((tile) => {
            const objectX = tile.x + tile.width / 2; // Adiciona a metade da largura para centralizar o objeto
            const objectY = tile.y + tile.height / 2; // Adiciona a metade da altura para centralizar o objeto
            const tileCollider = staticTileGroup.create(objectX, objectY, undefined);
            tileCollider.setSize(tile.width, tile.height);
            tileCollider.setVisible(false);
            tileCollider.setImmovable(true);
        });
        this.physics.add.collider(this.character, staticTileGroup);
        this.physics.add.collider(this.enemies, staticTileGroup);
        this.cameras.main.startFollow(this.character);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)
        this.cameras.main.setZoom(1.2);
        window.can = this.cameras;
        objcollider === null || objcollider === void 0 ? void 0 : objcollider.setCollisionByProperty({ collider: true });
        // CHAR _ COLLIDER
        this.physics.add.collider(this.character, objcollider);
        // ATACK _ COLLIDER
        this.physics.add.collider(this.atackes, this.enemies, this.handleAtackeCollision, undefined, this);
        this.physics.add.collider(this.atackes, objcollider, this.handleAtackWallCollision, undefined, this);
        this.physics.add.collider(this.atackes, staticTileGroup, this.handleAtackWallCollision, undefined, this);
        this.physics.add.collider(this.enemieProjectile, this.character, this.handlePlayerProjectileCollision, undefined, this);
        this.physics.add.collider(this.enemieProjectile, objcollider, this.handleProjectileWallCollision, undefined, this);
        this.physics.add.collider(this.enemieProjectile, staticTileGroup, this.handleProjectileWallCollision, undefined, this);
        // ENEMY _ COLLIDER
        this.physics.add.collider(this.enemies, objcollider);
        this.playerCollider = this.physics.add.collider(this.enemies, this.character, this.handlePlayerEnemyCollision, undefined, this);
        this.physics.add.collider(this.items, objcollider);
        this.physics.add.collider(this.items, this.character, this.handleItemCollision, undefined, this);
    }
    handleAtackWallCollision(obj1, obj2) {
        //this.atackes.killAndHide(obj1)
        sceneEvents.emit('update-count-atackes', this.character.maxAtackes + 1 - this.atackes.getChildren().length);
        obj1.destroy();
    }
    handleProjectileWallCollision(obj1, obj2) {
        obj1.destroy();
    }
    handleAtackeCollision(obj1, obj2) {
        const random = Phaser.Math.Between(0, 10);
        if (random <= 2) {
            this.items.get(obj2.x, obj2.y, CST.IMAGE.HEART_FULL);
        }
        sceneEvents.emit('update-count-atackes', this.character.maxAtackes - this.atackes.getChildren().length);
        // this.enemies.get(Phaser.Math.Between(100, 1500), Phaser.Math.Between(100, 1500), 'enemies', 'bat-front1')
        obj2.destroy();
        obj1.destroy();
    }
    handlePlayerEnemyCollision(obj1, obj2) {
        var _a;
        const bat = obj2;
        const dx = this.character.x - bat.x;
        const dy = this.character.y - bat.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
        this.character.handleDamege(dir);
        sceneEvents.emit('player-health-changed', this.character.health);
        if (this.character.health <= 0) {
            (_a = this.playerCollider) === null || _a === void 0 ? void 0 : _a.destroy();
        }
    }
    handlePlayerProjectileCollision(player, procjetile) {
        var _a;
        const dx = this.character.x - procjetile.x;
        const dy = this.character.y - procjetile.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
        this.character.handleDamege(dir);
        sceneEvents.emit('player-health-changed', this.character.health);
        if (this.character.health <= 0) {
            (_a = this.playerCollider) === null || _a === void 0 ? void 0 : _a.destroy();
        }
        procjetile.destroy();
    }
    handleItemCollision(obj1, obj2) {
        // Pega
        if (this.character.health < this.character.maxHealth) {
            this.character.recoverHealth();
            obj2.destroy();
        }
        sceneEvents.emit('update-max-health-changed', this.character.health, this.character.maxHealth);
        obj2.destroy();
    }
    update(time, delta) {
        this.hodeds.getChildren().forEach((hoded) => {
            hoded.update(this.character);
        });
        this.gargules.getChildren().forEach((gargule) => {
            gargule.update(this.character);
        });
        if (this.character) {
            this.character.update(this.cursor, this);
        }
    }
}
