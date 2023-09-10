// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js-src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    LOAD: 'LOAD',
    MENU: 'MENU',
    PLAY: 'PLAY',
    ABANDONED_VILLAGE: 'ABANDONED_VILLAGE',
    GAME_UI: 'GAME-UI',
    HEALTH_BAR: 'HEALTH_BAR'
  },
  IMAGE: {
    BG_MENU: "bg-menu.jpg",
    HEART_FULL: 'heart_full.png',
    HEART_EMPTY: 'heart_empty.png',
    INTERFACE_BAR: 'Interface_health.png',
    HEALTH_BAR: 'health_bar.png',
    MANA_BAR: 'mana_bar.png',
    EXP_BAR: 'exp_bar.png'
  },
  AUDIO: {
    TITLE: "title-song.mp3"
  },
  SPRITE: {
    BLUEBIRD: "bluebirdFlying.png"
  },
  KEYBOARD: {
    KEYS: {
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE
    }
  }
};
exports.CST = CST;
},{}],"js-src/events/EventCenter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sceneEvents = void 0;
/*
`Phaser.Events.EventEmitter` é uma classe no Phaser que permite a criação e gerenciamento de eventos personalizados. É usada para implementar um sistema de eventos no Phaser, onde objetos podem emitir eventos e outros objetos podem se inscrever para ouvir esses eventos e responder a eles.

A classe `Phaser.Events.EventEmitter` fornece métodos para emitir eventos, se inscrever em eventos e cancelar a inscrição de eventos. Alguns dos métodos importantes incluem:

- `on(event: string, callback: Function, context?: any)`: Registra uma função de retorno de chamada (callback) para um determinado evento. Sempre que o evento for emitido, a função de retorno de chamada será chamada.

- `emit(event: string, ...args: any[])`: Emite um evento, disparando todas as funções de retorno de chamada registradas para esse evento. Os argumentos adicionais passados para `emit` serão repassados para as funções de retorno de chamada.

- `off(event?: string, callback?: Function, context?: any, once?: boolean)`: Cancela a inscrição em um evento específico. Se nenhum evento for fornecido, todas as inscrições serão canceladas. É possível filtrar a cancelação de inscrição com base na função de retorno de chamada e no contexto.

O uso do `Phaser.Events.EventEmitter` permite que você crie e gerencie facilmente eventos personalizados em seu jogo Phaser. Isso pode ser útil para comunicação entre objetos, notificações de eventos importantes, atualizações de estado e muito mais.
*/
var sceneEvents = new Phaser.Events.EventEmitter();
exports.sceneEvents = sceneEvents;
},{}],"js-src/items/Sword.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var SwordState;
(function (SwordState) {
  SwordState[SwordState["INTERVAL"] = 0] = "INTERVAL";
  SwordState[SwordState["READY"] = 1] = "READY";
})(SwordState || (SwordState = {}));
var Sword = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Sword, _Phaser$Physics$Arcad);
  var _super = _createSuper(Sword);
  function Sword(scene, x, y, texture, frame, damage, atackSpeed) {
    var _this;
    _classCallCheck(this, Sword);
    _this = _super.call(this, scene, x, y, texture, frame);
    _this.stateSword = SwordState.READY;
    _this.atackSpeed = 0;
    _this.angleStartDirection = {
      right: 0,
      left: 270,
      top: 0,
      down: 180
    };
    _this.angleFinalDirection = 0;
    scene.add.existing(_assertThisInitialized(_this));
    scene.physics.world.enable(_assertThisInitialized(_this));
    _this.setActive(false).setVisible(false).setImmovable(true).setDepth(1).disableBody(true);
    _this.damage = damage;
    _this.atackSpeed = atackSpeed;
    return _this;
  }
  _createClass(Sword, [{
    key: "getState",
    value: function getState() {
      return this.stateSword;
    }
  }, {
    key: "toggleActiveSword",
    value: function toggleActiveSword() {
      this.setActive(!this.active).setVisible(!this.visible);
    }
  }, {
    key: "throwAtack",
    value: function throwAtack(angle) {
      var _this2 = this;
      if (this.stateSword === SwordState.READY) {
        if (angle.x === 1) {
          this.setAngle(this.angleStartDirection.right);
          this.angleFinalDirection = 80;
        } else if (angle.x === -1) {
          this.setAngle(this.angleStartDirection.left);
          this.angleFinalDirection = -180;
        }
        if (angle.y === 1) {
          this.setAngle(this.angleStartDirection.down);
          this.angleFinalDirection = 100;
        } else if (angle.y === -1) {
          this.setAngle(this.angleStartDirection.top);
          this.angleFinalDirection = -80;
        }
        this.enableBody(true);
        this.setAlpha(1);
        this.toggleActiveSword();
        this.animationRotation();
        this.stateSword = SwordState.INTERVAL;
        var intervalDuration = 300 - this.atackSpeed;
        this.scene.time.delayedCall(intervalDuration, function () {
          _this2.toggleActiveSword();
          _this2.disableBody(true);
          var atackDuration = 600 - _this2.atackSpeed;
          _this2.scene.time.delayedCall(atackDuration, function () {
            if (_this2.stateSword === SwordState.INTERVAL) _this2.stateSword = SwordState.READY;
          });
        });
      }
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(character, direction) {
      this.x = character.x + direction.x * 20;
      this.y = character.y + direction.y * 35;
    }
  }, {
    key: "animationRotation",
    value: function animationRotation() {
      this.scene.tweens.add({
        targets: this,
        angle: this.angleFinalDirection,
        ease: 'Linear',
        duration: 100
      });
    }
  }]);
  return Sword;
}(Phaser.Physics.Arcade.Sprite);
exports.default = Sword;
},{}],"js-src/characters/Character.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _EventCenter = require("../events/EventCenter");
var _Sword = _interopRequireDefault(require("../items/Sword"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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
var Character = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Character, _Phaser$Physics$Arcad);
  var _super = _createSuper(Character);
  function Character(scene, x, y, texture, frame) {
    var _this;
    _classCallCheck(this, Character);
    _this = _super.call(this, scene, x, y, texture, frame);
    _this.healthState = HealthState.IDLE;
    _this.TouchBorder = undefined;
    _this.damageTime = 0;
    _this._health = 5;
    _this.atackPower = 1;
    _this.atackSpeed = 1;
    _this.maxHealth = 3;
    _this.maxProjectiles = 3;
    _this.velocity = 100;
    _this.experience = 0;
    _this.lv = 1;
    _this.setFrame('char_1');
    scene.input.on('pointerdown', function (cursor) {
      _this.cursorAtack(cursor);
    });
    _this.weapon = new _Sword.default(scene, x, y, 'itens', 'equip_14', 10, 10);
    _this.projectiles = _this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: _this.maxProjectiles,
      createCallback: function createCallback(projectile) {
        var projec = projectile;
        _this.scene.anims.play('star', projec);
        projec.setCollideWorldBounds(true);
      }
    });
    console.log(_this.scene.game.config);
    return _this;
  }
  _createClass(Character, [{
    key: "health",
    get: function get() {
      return this._health;
    }
  }, {
    key: "recoverHealth",
    value: function recoverHealth() {
      this._health++;
    }
  }, {
    key: "setWeapon",
    value: function setWeapon(weapon) {
      this.weapon = weapon;
    }
  }, {
    key: "setProjectile",
    value: function setProjectile(group) {
      this.projectiles = group;
    }
    /*
        O método handleDamage é responsável por lidar com o dano recebido pelo personagem e atualizar seu estado de saúde.
    */
  }, {
    key: "handleDamege",
    value: function handleDamege(dir) {
      if (this._health <= 0) {
        return;
      }
      if (this.healthState === HealthState.DAMAGE) {
        return;
      }
      --this._health;
      if (this._health <= 0) {
        this.healthState = HealthState.DEAD;
        this.anims.play('char-faint');
        this.setVelocity(0, 0);
      } else {
        this.setVelocity(dir.x, dir.y);
        this.setTint(0xff0000);
        this.healthState = HealthState.DAMAGE;
        this.damageTime = 0;
      }
    }
  }, {
    key: "setColliderCharacterGroupEnemies",
    value: function setColliderCharacterGroupEnemies(object) {
      this.characterCollider = this.scene.physics.add.collider(this, object, this.handlePlayerEnemyCollision, undefined, this);
      this.scene.physics.add.collider(this.weapon, object, this.handleWeaponCollider, undefined, this);
      this.scene.physics.add.collider(this.projectiles, object, this.handleProjectileCollider, undefined, this);
    }
  }, {
    key: "setCharacterColliderGroupProjectiles",
    value: function setCharacterColliderGroupProjectiles(object) {
      this.scene.physics.add.collider(this, object, this.handlePlayerEnemyCollision, undefined, this);
    }
  }, {
    key: "setLayersCollider",
    value: function setLayersCollider(tileLayers, staticObjects) {
      var _this2 = this;
      console.log(tileLayers, _typeof(tileLayers));
      if (_typeof(tileLayers) === 'object') {
        tileLayers.forEach(function (layer) {
          _this2.scene.physics.add.collider(_this2, layer);
          _this2.scene.physics.add.collider(_this2.projectiles, layer, _this2.handleProjectileWallCollider, undefined, _this2);
        });
      } else if (tileLayers) {
        this.scene.physics.add.collider(this, tileLayers);
        this.scene.physics.add.collider(this.projectiles, tileLayers, this.handleProjectileWallCollider, undefined, this);
      }
      if (staticObjects) {
        staticObjects.getChildren().forEach(function (object) {
          _this2.scene.physics.add.collider(_this2, object);
          _this2.scene.physics.add.collider(_this2.projectiles, object);
          _this2.scene.physics.add.collider(_this2.weapon, object);
        });
      }
    }
  }, {
    key: "handlePlayerEnemyCollision",
    value: function handlePlayerEnemyCollision(obj1, obj2) {
      var _a;
      var objectCollision = obj2;
      var dx = this.x - objectCollision.x;
      var dy = this.y - objectCollision.y;
      var dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
      this.handleDamege(dir);
      _EventCenter.sceneEvents.emit('player-health-changed', this.health);
      if (this.health <= 0) {
        (_a = this.characterCollider) === null || _a === void 0 ? void 0 : _a.destroy();
      }
      if (Object.getPrototypeOf(objectCollision).constructor.name === 'Projectile') {
        objectCollision.destroy();
      }
    }
  }, {
    key: "handleWeaponCollider",
    value: function handleWeaponCollider(weapon, enemie) {
      var _this3 = this;
      setTimeout(function () {
        var _a;
        (_a = _this3.weapon) === null || _a === void 0 ? void 0 : _a.setActive(false).setVisible(false);
      }, 1000);
      enemie.destroy();
    }
  }, {
    key: "handleProjectileCollider",
    value: function handleProjectileCollider(projectile, object) {
      projectile.destroy();
      object.destroy();
    }
  }, {
    key: "handleProjectileWallCollider",
    value: function handleProjectileWallCollider(projectile, tile) {
      _EventCenter.sceneEvents.emit('update-count-atackes', this.maxProjectiles + 1 - this.projectiles.getChildren().length);
      projectile.destroy();
    }
  }, {
    key: "throwAtack",
    value: function throwAtack() {
      if (!this.projectiles) return;
      var atack = this.projectiles.get(this.x, this.y, 'magicEffect', 'effect_146');
      if (!atack) {
        return;
      }
      var vec = this.currentAngle();
      var angle = vec.angle();
      atack.setActive(true);
      atack.setVisible(true);
      atack.x += vec.x * 16;
      atack.y += vec.y * 16;
      atack.setRotation(angle);
      atack.setVelocity(vec.x * 300, vec.y * 300);
    }
  }, {
    key: "weaponAtack",
    value: function weaponAtack() {
      if (!this.weapon) return;
      var angle = this.currentAngle();
      this.weapon.throwAtack(angle);
    }
  }, {
    key: "cursorAtack",
    value: function cursorAtack(cursor) {
      if (!this.projectiles) return;
      var projectile = this.projectiles.get(this.x, this.y, 'magicEffect', 'effect_146');
      if (!projectile) return;
      _EventCenter.sceneEvents.emit('update-count-atackes', this.maxProjectiles - this.projectiles.getChildren().length);
      var directionX = cursor.worldX - this.x;
      var directionY = cursor.worldY - this.y;
      /*
          O processo de normalização consiste em dividir cada componente do vetor pela magnitude total do vetor. A magnitude total do vetor é a raiz quadrada da soma dos quadrados de suas componentes (de acordo com o teorema de Pitágoras). O cálculo é feito da seguinte maneira:
           length é a magnitude total do vetor de direção. normalizedDirectionX e normalizedDirectionY são as componentes do vetor de direção normalizado.
      */
      var length = Math.sqrt(directionX * directionX + directionY * directionY);
      var normalizedDirectionX = directionX / length;
      var normalizedDirectionY = directionY / length;
      // Velocidade do atack
      var atackSpeed = 300;
      /*
      Define a velocidade do ataque multiplicando o vetor de direção normalizado pela velocidade
      */
      projectile.setActive(true).setVisible(true).setVelocity(normalizedDirectionX * atackSpeed, normalizedDirectionY * atackSpeed);
      // Define a rotação do ataque para a direção do cursor -- Radianos
      var angle = Phaser.Math.RadToDeg(Math.atan2(normalizedDirectionY, normalizedDirectionX));
      projectile.setRotation(angle);
    }
    /*
    Pega a direção do personagem em angulos com base na direção que ele se movimentou pela última vez
    */
  }, {
    key: "currentAngle",
    value: function currentAngle() {
      var _a;
      var parts = (_a = this.anims.currentAnim) === null || _a === void 0 ? void 0 : _a.key.split('-');
      var vec = new Phaser.Math.Vector2(0, 0);
      if (parts) {
        var diretion = parts[2];
        switch (diretion) {
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
      }
      return vec;
    }
    /*
        O método preUpdate é um método interno do Phaser que é chamado antes da atualização do objeto a cada quadro. Ele é usado para atualizar o estado do personagem, como a contagem de tempo de dano.
    */
  }, {
    key: "preUpdate",
    value: function preUpdate(time, delta) {
      _get(_getPrototypeOf(Character.prototype), "preUpdate", this).call(this, time, delta);
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
  }, {
    key: "update",
    value: function update(cursor, scene) {
      var _a, _b, _c, _d, _e;
      if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD) {
        return;
      }
      if (!cursor) {
        return;
      }
      if (Phaser.Input.Keyboard.JustDown(cursor.space)) {
        this.weaponAtack();
        return;
      }
      this.setVelocityX(0);
      this.setVelocityY(0);
      // Keys
      if (cursor.right.isDown) {
        this.setVelocityX(this.velocity);
      } else if (cursor.left.isDown) {
        this.setVelocityX(-this.velocity);
      }
      if (cursor.up.isDown) {
        this.setVelocityY(-this.velocity);
      } else if (cursor.down.isDown) {
        this.setVelocityY(this.velocity);
      }
      if (((_a = this.body) === null || _a === void 0 ? void 0 : _a.velocity.x) > 0) {
        this.anims.play("char-run-right", true); // Animation sprite
      } else if (((_b = this.body) === null || _b === void 0 ? void 0 : _b.velocity.x) < 0) {
        this.anims.play("char-run-left", true);
      } else if (((_c = this.body) === null || _c === void 0 ? void 0 : _c.velocity.y) > 0) {
        this.anims.play("char-run-down", true);
      } else if (((_d = this.body) === null || _d === void 0 ? void 0 : _d.velocity.y) < 0) {
        this.anims.play("char-run-up", true);
      } else {
        var parts = (_e = this.anims.currentAnim) === null || _e === void 0 ? void 0 : _e.key.split('-');
        if (parts) {
          parts[1] = 'idle';
          this.anims.play(parts.join('-'));
          this.setVelocity(0);
        }
      }
      // Sword
      if (this.weapon) {
        var angle = this.currentAngle();
        this.weapon.updatePosition(this, angle);
      }
    }
  }]);
  return Character;
}(Phaser.Physics.Arcade.Sprite);
exports.default = Character;
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
  sprite.setScale(0.85);
  sprite.setDepth(1);
  /*
      Configuração do objeto 'sprite' para colidir com os limites do mundo do jogo (setCollideWorldBounds(true)).
  */
  // sprite.setCollideWorldBounds(true)
  return sprite;
});
},{"../events/EventCenter":"js-src/events/EventCenter.js","../items/Sword":"js-src/items/Sword.js"}],"js-src/enemies/Hoded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Direction;
(function (Direction) {
  Direction[Direction["UP"] = 0] = "UP";
  Direction[Direction["DOWN"] = 1] = "DOWN";
  Direction[Direction["LEFT"] = 2] = "LEFT";
  Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
var randomDireciton = function randomDireciton(exclude) {
  var newDiretion = Phaser.Math.Between(0, 3);
  while (newDiretion === exclude) {
    newDiretion = Phaser.Math.Between(0, 3);
  }
  return newDiretion;
};
var Hoded = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Hoded, _Phaser$Physics$Arcad);
  var _super = _createSuper(Hoded);
  function Hoded(scene, x, y, texture, frame) {
    var _this;
    _classCallCheck(this, Hoded);
    _this = _super.call(this, scene, x, y, texture, frame);
    _this.direction = Direction.RIGHT;
    _this.speed = 40;
    scene.add.existing(_assertThisInitialized(_this));
    scene.physics.world.enable(_assertThisInitialized(_this));
    _this.setSize(_this.width * 0.6, _this.height * 0.7).setOffset(10, 20).setScale(0.85);
    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, _this.handleTileColision, _assertThisInitialized(_this));
    _this.setDepth(1);
    return _this;
  }
  _createClass(Hoded, [{
    key: "handleTileColision",
    value: function handleTileColision(go, tile) {
      if (go !== this) return;
      this.direction = randomDireciton(this.direction);
    }
  }, {
    key: "moveTowardsPlayer",
    value: function moveTowardsPlayer(player) {
      var direciton = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
      if (Math.abs(direciton.x) > Math.abs(direciton.y)) {
        this.direction = direciton.x < 0 ? Direction.LEFT : Direction.RIGHT;
      } else {
        this.direction = direciton.y < 0 ? Direction.UP : Direction.DOWN;
      }
      direciton.normalize();
      this.setVelocity(direciton.x * this.speed, direciton.y * this.speed);
    }
  }, {
    key: "destroy",
    value: function destroy(fromScene) {
      var _this2 = this;
      this.scene.time.delayedCall(2000, function () {
        _get(_getPrototypeOf(Hoded.prototype), "destroy", _this2).call(_this2, fromScene);
      });
    }
  }, {
    key: "preUpdate",
    value: function preUpdate(time, delta) {
      _get(_getPrototypeOf(Hoded.prototype), "preUpdate", this).call(this, time, delta);
      switch (this.direction) {
        case Direction.UP:
          this.anims.play('assassin-up', true);
          break;
        case Direction.DOWN:
          this.anims.play('assassin-down', true);
          break;
        case Direction.LEFT:
          this.anims.play('assassin-left', true);
          break;
        case Direction.RIGHT:
          this.anims.play('assassin-right', true);
          break;
      }
    }
  }, {
    key: "update",
    value: function update(player) {
      this.moveTowardsPlayer(player);
    }
  }]);
  return Hoded;
}(Phaser.Physics.Arcade.Sprite);
exports.default = Hoded;
},{}],"js-src/scenes/ConfingScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  followCamera: function followCamera(camera, character, tileMap) {
    camera.main.startFollow(character);
    camera.main.setBounds(0, 0, tileMap.widthInPixels, tileMap.heightInPixels);
    camera.main.setZoom(1.2);
    // camera.main.setDeadzone(this.scale.width * 0.1, this.scale.height * 0.1)
  }
};
exports.default = _default;
},{}],"js-src/scenes/AbandonedVillage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CST = require("../CST");
require("../characters/Character");
var _Hoded = _interopRequireDefault(require("../enemies/Hoded"));
var _ConfingScene = _interopRequireDefault(require("./ConfingScene"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var AbandonedVillage = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(AbandonedVillage, _Phaser$Scene);
  var _super = _createSuper(AbandonedVillage);
  function AbandonedVillage() {
    var _this;
    _classCallCheck(this, AbandonedVillage);
    _this = _super.call(this, {
      key: _CST.CST.SCENES.ABANDONED_VILLAGE
    });
    _this.layersCollider = [];
    return _this;
  }
  _createClass(AbandonedVillage, [{
    key: "preload",
    value: function preload() {
      var _a;
      this.cursor = (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKeys(_CST.CST.KEYBOARD.KEYS);
      this.load.tilemapTiledJSON("ab_village", "./assets/maps/mappy1.json");
    }
  }, {
    key: "spawnLayerObjectLocation",
    value: function spawnLayerObjectLocation(map, layerObject, objectName) {
      var layerObj = map.getObjectLayer(layerObject);
      var locationXY = {
        x: 0,
        y: 0
      };
      layerObj === null || layerObj === void 0 ? void 0 : layerObj.objects.forEach(function (obj) {
        if (obj.name === objectName) {
          locationXY.x = obj.x, locationXY.y = obj.y;
        }
      });
      return locationXY;
    }
  }, {
    key: "spawnLayerObjectArea",
    value: function spawnLayerObjectArea(map, layerObj, areaName) {
      var layer = map.getObjectLayer(layerObj);
      var areaSpawn = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      layer === null || layer === void 0 ? void 0 : layer.objects.forEach(function (area) {
        if (area.name === areaName) {
          console.log(area);
          areaSpawn.x = area.x, areaSpawn.y = area.y, areaSpawn.width = area.width + area.x, areaSpawn.height = area.height + area.y;
        }
      });
      return areaSpawn;
    }
  }, {
    key: "create",
    value: function create(data) {
      var _this2 = this;
      var _a, _b, _c;
      this.scene.run(_CST.CST.SCENES.GAME_UI);
      console.log(data);
      var map = this.add.tilemap("ab_village");
      var tileset = map.addTilesetImage("textures", "tiles");
      var floor = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
      var waterLayer = map.createLayer("water_above", tileset, 0, 0);
      var objcollider = map.createLayer("collider", tileset, 0, 0);
      var groundAbove = map.createLayer('floor_above', tileset, 0, 0);
      var objcollider_1 = map.createLayer("collider_1", tileset, 0, 0);
      var objabove_1 = (_b = map.createLayer("above_1", tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(2);
      var objabove = (_c = map.createLayer("above", tileset, 0, 0)) === null || _c === void 0 ? void 0 : _c.setDepth(3);
      this.layersCollider.push(objcollider);
      this.layersCollider.push(objcollider_1);
      this.layersCollider.forEach(function (layer) {
        layer === null || layer === void 0 ? void 0 : layer.setCollisionByProperty({
          collider: true
        });
      });
      var spawnChar = this.spawnLayerObjectLocation(map, 'spawn', data.spawn);
      console.log(spawnChar);
      this.character = this.add.character(spawnChar.x, spawnChar.y, 'characters');
      this.spawnEnemies = this.spawnLayerObjectArea(map, 'spawn', 'enemies');
      console.log(this.spawnEnemies);
      this.enemies = this.physics.add.group();
      this.hodeds = this.physics.add.group({
        classType: _Hoded.default
      });
      this.layersCollider.forEach(function (layer) {
        _this2.physics.add.collider(_this2.enemies, layer);
      });
      for (var i = 0; i < 8; i++) {
        this.enemies.add(this.hodeds.get(Phaser.Math.Between(this.spawnEnemies.x, this.spawnEnemies.width), Phaser.Math.Between(this.spawnEnemies.y, this.spawnEnemies.height), 'enemies', 'assassin-front1'));
      }
      this.character.setLayersCollider(this.layersCollider);
      this.character.setColliderCharacterGroupEnemies(this.enemies);
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      _ConfingScene.default.followCamera(this.cameras, this.character, map);
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      var _this3 = this;
      if (this.character) {
        this.character.update(this.cursor, this);
      }
      this.hodeds.getChildren().forEach(function (hoded) {
        hoded.update(_this3.character);
      });
    }
  }]);
  return AbandonedVillage;
}(Phaser.Scene);
exports.default = AbandonedVillage;
},{"../CST":"js-src/CST.js","../characters/Character":"js-src/characters/Character.js","../enemies/Hoded":"js-src/enemies/Hoded.js","./ConfingScene":"js-src/scenes/ConfingScene.js"}],"js-src/scenes/GameUI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CST = require("../CST");
var _EventCenter = require("../events/EventCenter");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var GameUI = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(GameUI, _Phaser$Scene);
  var _super = _createSuper(GameUI);
  function GameUI() {
    var _this;
    _classCallCheck(this, GameUI);
    _this = _super.call(this, _CST.CST.SCENES.GAME_UI);
    _this.amountHearts = 5;
    _this.amoutAtackes = 0;
    return _this;
  }
  _createClass(GameUI, [{
    key: "create",
    value: function create() {
      var _this2 = this;
      this.hearts = this.add.group({
        classType: Phaser.GameObjects.Image
      });
      this.hearts.createMultiple({
        key: _CST.CST.IMAGE.HEART_FULL,
        setXY: {
          x: 50,
          y: 50
        },
        quantity: this.amountHearts
      });
      //@ts-ignore
      this.hearts.children.iterate(function (heart, index) {
        heart.x = 50 + index * 30;
        heart.setScale(2);
      });
      this.atackes = this.add.text(45, 70, "X ".concat(3));
      _EventCenter.sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this);
      _EventCenter.sceneEvents.on('update-max-health-changed', this.updateHeartCount, this);
      _EventCenter.sceneEvents.on('update-count-atackes', this.countAtackes, this);
      this.events.once(Phaser.Scenes.Events.SHUTDOWN, function () {
        _EventCenter.sceneEvents.off('player-health-changed', _this2.handlePlayerHealthChanged, _this2);
      });
    }
  }, {
    key: "handlePlayerHealthChanged",
    value: function handlePlayerHealthChanged(health) {
      //@ts-ignore
      this.hearts.children.each(function (go, index) {
        var heart = go;
        if (index < health) {
          heart.setTexture(_CST.CST.IMAGE.HEART_FULL);
        } else {
          heart.setTexture(_CST.CST.IMAGE.HEART_EMPTY);
        }
      });
    }
  }, {
    key: "updateHeartCount",
    value: function updateHeartCount(currentHealth, maxHealth) {
      maxHealth -= currentHealth;
      this.hearts.clear(true);
      this.hearts.createMultiple({
        key: _CST.CST.IMAGE.HEART_FULL,
        setXY: {
          x: 50,
          y: 50
        },
        quantity: currentHealth
      });
      if (maxHealth) {
        this.hearts.createMultiple({
          key: _CST.CST.IMAGE.HEART_EMPTY,
          setXY: {
            x: 50,
            y: 50
          },
          quantity: maxHealth
        });
      }
      //@ts-ignore
      this.hearts.children.iterate(function (heart, index) {
        heart.x = 50 + index * 30;
        heart.setScale(2);
      });
    }
  }, {
    key: "countAtackes",
    value: function countAtackes(amount) {
      this.atackes.text = "X ".concat(amount);
    }
  }]);
  return GameUI;
}(Phaser.Scene);
exports.default = GameUI;
},{"../CST":"js-src/CST.js","../events/EventCenter":"js-src/events/EventCenter.js"}],"js-src/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CST = require("../CST");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var LoadScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);
  var _super = _createSuper(LoadScene);
  function LoadScene() {
    _classCallCheck(this, LoadScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.LOAD
    });
  }
  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "loadImages",
    value: function loadImages() {
      this.load.setPath("./assets/image");
      for (var prop in _CST.CST.IMAGE) {
        // @ts-ignore
        this.load.image(_CST.CST.IMAGE[prop], _CST.CST.IMAGE[prop]);
      }
    }
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      this.load.setPath("./assets/audio");
      for (var prop in _CST.CST.AUDIO) {
        //@ts-ignore 
        this.load.audio(_CST.CST.AUDIO[prop], _CST.CST.AUDIO[prop]);
      }
    }
  }, {
    key: "loadSprit",
    value: function loadSprit(frameConfig) {
      this.load.setPath("./assets/sprites");
      for (var prop in _CST.CST.SPRITE) {
        //@ts-ignore
        this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], frameConfig);
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;
      // Load Atlas
      this.load.atlas("characters", "./assets/sprites/characters.png", "./assets/sprites/characters.json");
      this.load.atlas("enemies", "./assets/sprites/enemies.png", "./assets/sprites/enemies.json");
      this.load.atlas("itens", "./assets/image/itens.png", "./assets/image/itens.json");
      this.load.atlas("magicEffect", "./assets/sprites/spellsEfects.png", "./assets/sprites/spellsEfects.json");
      this.load.image("tiles", "./assets/maps/textures.png");
      // Load image, spritesheet, sound
      this.loadImages();
      this.loadAudio();
      this.loadSprit({
        frameWidth: 32,
        frameHeight: 32
      });
      var loadingTitle = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Loading', {
        fontFamily: 'Arial',
        fontSize: '40px',
        color: '#ffffff'
      });
      loadingTitle.setOrigin(0.5, 2);
      // Create loading bar
      /*
      Loader Events:
        Complete - when done loading everything.
        Progress - loader number progress in decimal.
      */
      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff
        }
      });
      this.load.on('progress', function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
      });
      this.load.on('load', function (file) {
        // todos os arquivos que são carregados antes do jogo começar
        console.log(file.src);
      });
    }
  }, {
    key: "create",
    value: function create() {
      this.scene.start(_CST.CST.SCENES.MENU);
      // this.scene.launch();
    }
  }]);
  return LoadScene;
}(Phaser.Scene);
exports.default = LoadScene;
},{"../CST":"js-src/CST.js"}],"js-src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CST = require("../CST");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var MenuScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);
  var _super = _createSuper(MenuScene);
  function MenuScene() {
    _classCallCheck(this, MenuScene);
    return _super.call(this, {
      key: _CST.CST.SCENES.MENU
    });
  }
  _createClass(MenuScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      var defaultCaracter = {
        fontFamily: 'Arial',
        fontSize: '40px',
        color: '#00000'
      };
      this.add.image(0, 0, _CST.CST.IMAGE.BG_MENU).setScale(1).setOrigin(0).setDepth(0).setAlpha(.8);
      var playButton = this.add.text(this.renderer.width / 2.3, this.renderer.height / 2.5, '< Play >', defaultCaracter).setDepth(1);
      var optionsButton = this.add.text(this.renderer.width / 2.3, this.renderer.height / 2.5 + 100, '< Options >', {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#ffffff'
      }).setDepth(1);
      var hoverSprit = this.add.sprite(100, 100, _CST.CST.SPRITE.BLUEBIRD).setDepth(1);
      hoverSprit.setScale(2);
      hoverSprit.setVisible(false);
      // this.sound.play(CST.AUDIO.TITLE, {
      //   loop: true,
      // });
      // create Animations
      this.anims.create({
        key: 'walk',
        frameRate: 8,
        repeat: -1,
        frames: this.anims.generateFrameNames(_CST.CST.SPRITE.BLUEBIRD, {
          frames: [0, 1, 2, 3, 4, 5, 7, 8]
        })
      });
      playButton.setInteractive();
      optionsButton.setInteractive();
      playButton.on('pointerover', function () {
        hoverSprit.setVisible(true);
        hoverSprit.play('walk');
        hoverSprit.x = playButton.x - 50;
        hoverSprit.y = playButton.y + 20;
      });
      playButton.on('pointerout', function () {
        hoverSprit.setVisible(false);
      });
      playButton.on('pointerup', function () {
        _this.scene.start(_CST.CST.SCENES.PLAY);
      });
      optionsButton.on('pointerover', function () {
        hoverSprit.setVisible(true);
        hoverSprit.play('walk');
        hoverSprit.x = optionsButton.x - 50;
        hoverSprit.y = optionsButton.y + 20;
      });
      optionsButton.on('pointerout', function () {
        hoverSprit.setVisible(false);
      });
      optionsButton.on('pointerup', function () {
        //this.scene.lauch();
      });
    }
  }]);
  return MenuScene;
}(Phaser.Scene);
exports.default = MenuScene;
},{"../CST":"js-src/CST.js"}],"js-src/anims/EnemyAnims.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEnemiesAnims = void 0;
var createEnemiesAnims = function createEnemiesAnims(anims) {
  anims.create({
    key: 'assassin-down',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'assassin-front',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'assassin-up',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'assassin-back',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'assassin-left',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'assassin-left',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'assassin-right',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'assassin-right',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'assassin-faint',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'assassin-faint',
      start: 36,
      end: 38
    })
  });
  // -- // 
  anims.create({
    key: 'bat-front',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'bat-front',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'bat-back',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'bat-back',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'bat-left',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'bat-left',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'bat-right',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'bat-right',
      start: 0,
      end: 2
    })
  });
  // -- //
  anims.create({
    key: 'gargoyle-up',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'demon-gargoyle-back',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'gargoyle-down',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'demon-gargoyle-front',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'gargoyle-left',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'demon-gargoyle-left',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'gargoyle-right',
    frameRate: 6,
    repeat: -1,
    frames: anims.generateFrameNames('enemies', {
      prefix: 'demon-gargoyle-right',
      start: 0,
      end: 2
    })
  });
};
exports.createEnemiesAnims = createEnemiesAnims;
},{}],"js-src/anims/CharacterAnims.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCharacterAnims = void 0;
var createCharacterAnims = function createCharacterAnims(anims) {
  anims.create({
    key: 'char-idle-down',
    frames: [{
      key: 'characters',
      frame: 'char_1'
    }]
  });
  anims.create({
    key: 'char-idle-up',
    frames: [{
      key: 'characters',
      frame: 'char_37'
    }]
  });
  anims.create({
    key: 'char-idle-left',
    frames: [{
      key: 'characters',
      frame: 'char_13'
    }]
  });
  anims.create({
    key: 'char-idle-right',
    frames: [{
      key: 'characters',
      frame: 'char_25'
    }]
  });
  anims.create({
    key: 'char-run-down',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('characters', {
      prefix: 'char_',
      start: 0,
      end: 2
    })
  });
  anims.create({
    key: 'char-run-up',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('characters', {
      prefix: 'char_',
      start: 36,
      end: 38
    })
  });
  anims.create({
    key: 'char-run-left',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('characters', {
      prefix: 'char_',
      start: 12,
      end: 14
    })
  });
  anims.create({
    key: 'char-run-right',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('characters', {
      prefix: 'char_',
      start: 24,
      end: 26
    })
  });
  anims.create({
    key: 'char-faint',
    frameRate: 6,
    repeat: 0,
    frames: anims.generateFrameNames('characters', {
      prefix: 'char_',
      start: 12,
      end: 14
    })
  });
};
exports.createCharacterAnims = createCharacterAnims;
},{}],"js-src/anims/SpellsAnims.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpells = void 0;
var createSpells = function createSpells(anims) {
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
    })
  });
  anims.create({
    key: 'star',
    frameRate: 10,
    repeat: -1,
    frames: anims.generateFrameNames('magicEffect', {
      prefix: 'effect_',
      start: 146,
      end: 149
    })
  });
  anims.create({
    key: 'fire-bal',
    frameRate: 10,
    repeat: -1,
    frames: anims.generateFrameNames('magicEffect', {
      prefix: 'effect_',
      start: 51,
      end: 54
    })
  });
};
exports.createSpells = createSpells;
},{}],"js-src/enemies/Bat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Direction;
(function (Direction) {
  Direction[Direction["UP"] = 0] = "UP";
  Direction[Direction["DOWN"] = 1] = "DOWN";
  Direction[Direction["LEFT"] = 2] = "LEFT";
  Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
var randomDireciton = function randomDireciton(exclude) {
  var newDiretion = Phaser.Math.Between(0, 3);
  while (newDiretion === exclude) {
    newDiretion = Phaser.Math.Between(0, 3);
  }
  return newDiretion;
};
var Bat = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Bat, _Phaser$Physics$Arcad);
  var _super = _createSuper(Bat);
  function Bat(scene, x, y, texture, frame) {
    var _this;
    _classCallCheck(this, Bat);
    _this = _super.call(this, scene, x, y, texture, frame);
    _this.direction = Direction.RIGHT;
    _this.anims.play('bat-front');
    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, _this.handleTileColision, _assertThisInitialized(_this));
    _this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: function callback() {
        _this.direction = randomDireciton(_this.direction);
      },
      loop: true
    });
    _this.setDepth(1);
    return _this;
  }
  // Destroi os eventos do objeto
  _createClass(Bat, [{
    key: "destroy",
    value: function destroy(fromScene) {
      this.moveEvent.destroy();
      _get(_getPrototypeOf(Bat.prototype), "destroy", this).call(this, fromScene);
    }
    // Cria colisão do objeto com os colidiveis do mapa
  }, {
    key: "handleTileColision",
    value: function handleTileColision(go, tile) {
      if (go !== this) {
        return;
      }
      this.direction = randomDireciton(this.direction);
    }
  }, {
    key: "preUpdate",
    value: function preUpdate(time, delta) {
      _get(_getPrototypeOf(Bat.prototype), "preUpdate", this).call(this, time, delta);
      var speed = 120;
      switch (this.direction) {
        case Direction.UP:
          this.setVelocity(0, -speed);
          this.anims.play('bat-back', true);
          break;
        case Direction.DOWN:
          this.setVelocity(0, speed);
          this.anims.play('bat-front', true);
          break;
        case Direction.LEFT:
          this.setVelocity(-speed, 0);
          this.anims.play('bat-left', true);
          break;
        case Direction.RIGHT:
          this.setVelocity(speed, 0);
          this.anims.play('bat-right', true);
          break;
      }
    }
  }]);
  return Bat;
}(Phaser.Physics.Arcade.Sprite);
exports.default = Bat;
Phaser.GameObjects.GameObjectFactory.register('bat', function (x, y, texture, frame) {
  var _a;
  var sprite = new Bat(this.scene, x, y, texture, frame);
  this.displayList.add(sprite);
  this.updateList.add(sprite);
  this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
  (_a = sprite.body) === null || _a === void 0 ? void 0 : _a.setSize(sprite.width * 0.6, sprite.height * 0.8).setOffset(10, 10);
  sprite.setScale(0.9);
  sprite.setDepth(1);
  sprite.setCollideWorldBounds(true);
  return sprite;
});
},{}],"js-src/items/Item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Item = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Item, _Phaser$Physics$Arcad);
  var _super = _createSuper(Item);
  function Item(scene, x, y, texture, frame) {
    var _this;
    _classCallCheck(this, Item);
    _this = _super.call(this, scene, x, y, texture, frame);
    scene.physics.world.enable(_assertThisInitialized(_this));
    return _this;
  }
  return _createClass(Item);
}(Phaser.Physics.Arcade.Image);
exports.default = Item;
},{}],"js-src/enemies/Gargule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Direction;
(function (Direction) {
  Direction[Direction["UP"] = 0] = "UP";
  Direction[Direction["DOWN"] = 1] = "DOWN";
  Direction[Direction["LEFT"] = 2] = "LEFT";
  Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
var Gargule = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Gargule, _Phaser$Physics$Arcad);
  var _super = _createSuper(Gargule);
  function Gargule(scene, x, y, texture, frame) {
    var _this;
    _classCallCheck(this, Gargule);
    _this = _super.call(this, scene, x, y, texture, frame);
    _this.direction = Direction.LEFT;
    _this.speed = 60;
    _this.heart = 5;
    _this.setDepth(1);
    return _this;
  }
  _createClass(Gargule, [{
    key: "setAtackes",
    value: function setAtackes(projectiles) {
      this.projectiles = projectiles;
    }
  }, {
    key: "intervalThrowAtack",
    value: function intervalThrowAtack(player) {
      var _this2 = this;
      this.atackEvent = this.scene.time.addEvent({
        delay: Phaser.Math.Between(1000, 3000),
        callback: function callback() {
          _this2.throwFire(player);
        },
        loop: true
      });
    }
  }, {
    key: "throwFire",
    value: function throwFire(player) {
      var vec = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
      vec.normalize();
      var speedX = 200,
        speedY = 200;
      var projectile = this.projectiles.get(this.x, this.y, 'magicEffect', 'effect_11');
      projectile.setRotation(vec.angle());
      projectile.playReverse('fire-bal');
      if (projectile) {
        projectile.fire(this.x, this.y, vec.x * speedX, vec.y * speedY);
      }
    }
  }, {
    key: "moveTowardsPlayer",
    value: function moveTowardsPlayer(player) {
      var direciton = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
      if (Math.abs(direciton.x) > Math.abs(direciton.y)) {
        this.direction = direciton.x < 0 ? Direction.LEFT : Direction.RIGHT;
      } else {
        this.direction = direciton.y < 0 ? Direction.UP : Direction.DOWN;
      }
      direciton.normalize();
      this.setVelocity(direciton.x * this.speed, direciton.y * this.speed);
    }
  }, {
    key: "destroy",
    value: function destroy(fromScene) {
      var _a;
      if (this.projectiles) {
        (_a = this.atackEvent) === null || _a === void 0 ? void 0 : _a.destroy();
        _get(_getPrototypeOf(Gargule.prototype), "destroy", this).call(this, fromScene);
      }
    }
  }, {
    key: "preUpdate",
    value: function preUpdate(time, delta) {
      _get(_getPrototypeOf(Gargule.prototype), "preUpdate", this).call(this, time, delta);
      switch (this.direction) {
        case Direction.UP:
          this.anims.play('gargoyle-up', true);
          break;
        case Direction.DOWN:
          this.anims.play('gargoyle-down', true);
          break;
        case Direction.LEFT:
          this.anims.play('gargoyle-left', true);
          break;
        case Direction.RIGHT:
          this.anims.play('gargoyle-right', true);
          break;
      }
    }
  }, {
    key: "update",
    value: function update(player) {
      this.moveTowardsPlayer(player);
    }
  }]);
  return Gargule;
}(Phaser.Physics.Arcade.Sprite);
exports.default = Gargule;
},{}],"js-src/enemies/projectile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Projectile = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(Projectile, _Phaser$Physics$Arcad);
  var _super = _createSuper(Projectile);
  function Projectile(scene, x, y, texture) {
    var _this;
    _classCallCheck(this, Projectile);
    _this = _super.call(this, scene, x, y, texture);
    scene.physics.world.enable(_assertThisInitialized(_this));
    scene.add.existing(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Projectile, [{
    key: "fire",
    value: function fire(x, y, velocityX, velocityY) {
      var _a;
      (_a = this.body) === null || _a === void 0 ? void 0 : _a.reset(x, y);
      this.setActive(true).setVisible(true);
      this.setVelocity(velocityX, velocityY);
    }
  }]);
  return Projectile;
}(Phaser.Physics.Arcade.Sprite);
exports.default = Projectile;
},{}],"js-src/scenes/PlayScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CST = require("../CST");
var _EnemyAnims = require("../anims/EnemyAnims");
var _CharacterAnims = require("../anims/CharacterAnims");
var _SpellsAnims = require("../anims/SpellsAnims");
var _EventCenter = require("../events/EventCenter");
require("../characters/Character");
var _Bat = _interopRequireDefault(require("../enemies/Bat"));
var _Hoded = _interopRequireDefault(require("../enemies/Hoded"));
var _Item = _interopRequireDefault(require("../items/Item"));
var _Gargule = _interopRequireDefault(require("../enemies/Gargule"));
var _projectile = _interopRequireDefault(require("../enemies/projectile"));
var _ConfingScene = _interopRequireDefault(require("./ConfingScene"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var PlayScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(PlayScene, _Phaser$Scene);
  var _super = _createSuper(PlayScene);
  function PlayScene() {
    var _this;
    _classCallCheck(this, PlayScene);
    _this = _super.call(this, {
      key: _CST.CST.SCENES.PLAY
    });
    _this.layersCollider = [];
    return _this;
  }
  _createClass(PlayScene, [{
    key: "createGroupsEnemies",
    value: function createGroupsEnemies() {
      var _this2 = this;
      this.enemieProjectile = this.physics.add.group({
        classType: _projectile.default,
        runChildUpdate: true
      });
      this.hodeds = this.physics.add.group({
        classType: _Hoded.default,
        createCallback: function createCallback(go) {
          var hodedgo = go;
        }
      });
      this.bats = this.physics.add.group({
        classType: _Bat.default,
        createCallback: function createCallback(go) {
          var batgo = go;
          batgo.setSize(47, 40).setOffset(0, 10).setScale(.9), batgo.body.onCollide = true;
        }
      });
      this.gargules = this.physics.add.group({
        classType: _Gargule.default,
        createCallback: function createCallback(go) {
          var gargule = go;
          gargule.setAtackes(_this2.enemieProjectile);
          gargule.intervalThrowAtack(_this2.character);
        }
      });
      this.enemies = this.physics.add.group();
    }
  }, {
    key: "createCharacter",
    value: function createCharacter() {
      this.character = this.add.character(100, 800, 'characters');
      this.character.setColliderCharacterGroupEnemies(this.enemies);
      this.character.setCharacterColliderGroupProjectiles(this.enemieProjectile);
    }
  }, {
    key: "preload",
    value: function preload() {
      var _a;
      this.cursor = (_a = this.input.keyboard) === null || _a === void 0 ? void 0 : _a.addKeys(_CST.CST.KEYBOARD.KEYS);
      this.load.tilemapTiledJSON("map", "./assets/maps/mappy.json");
    }
  }, {
    key: "create",
    value: function create() {
      var _this3 = this;
      var _a, _b, _c;
      this.scene.run(_CST.CST.SCENES.GAME_UI);
      (0, _SpellsAnims.createSpells)(this.anims);
      (0, _CharacterAnims.createCharacterAnims)(this.anims);
      (0, _EnemyAnims.createEnemiesAnims)(this.anims);
      this.items = this.physics.add.group({
        classType: _Item.default
      });
      this.createGroupsEnemies();
      this.createCharacter();
      for (var x = 0; x < 1; x++) {
        this.enemies.add(this.bats.get(Phaser.Math.Between(2, 400), Phaser.Math.Between(500, 1200), 'enemies', 'bat-front1'));
        this.enemies.add(this.hodeds.get(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 250), 'enemies', 'demon-gargoyle-front1'));
        this.enemies.add(this.gargules.get(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 250), 'enemies', 'demon-gargoyle-front1'));
      }
      var map = this.add.tilemap("map");
      var tileset = map.addTilesetImage("textures", "tiles");
      var ground = (_a = map.createLayer("floor", tileset, 0, 0)) === null || _a === void 0 ? void 0 : _a.setDepth(-2);
      var waterLayer = map.createLayer("water_above", tileset, 0, 0);
      var objcollider = map.createLayer("collider", tileset, 0, 0);
      var shadow = map.createLayer("shadow", tileset, 0, 0);
      var groundAbove = map.createLayer('floor_above', tileset, 0, 0);
      var objcollider_1 = map.createLayer("collider_1", tileset, 0, 0);
      var objabove_1 = (_b = map.createLayer("above_1", tileset, 0, 0)) === null || _b === void 0 ? void 0 : _b.setDepth(2);
      var objabove = (_c = map.createLayer("above", tileset, 0, 0)) === null || _c === void 0 ? void 0 : _c.setDepth(3);
      var tileColliderGroup = map.getObjectLayer('tiles_collider');
      var staticTileGroup = this.physics.add.staticGroup();
      window.char = this.character;
      tileColliderGroup === null || tileColliderGroup === void 0 ? void 0 : tileColliderGroup.objects.forEach(function (tile) {
        var objectX = tile.x + tile.width / 2; // Adiciona a metade da largura para centralizar o objeto
        var objectY = tile.y + tile.height / 2; // Adiciona a metade da altura para centralizar o objeto
        var tileCollider = staticTileGroup.create(objectX, objectY, undefined);
        tileCollider.setSize(tile.width, tile.height);
        tileCollider.setVisible(false);
        tileCollider.setImmovable(true);
      });
      this.layersCollider.push(objcollider);
      this.layersCollider.push(objcollider_1);
      this.layersCollider.forEach(function (layer) {
        layer === null || layer === void 0 ? void 0 : layer.setCollisionByProperty({
          collider: true
        });
      });
      this.character.setLayersCollider(this.layersCollider);
      _ConfingScene.default.followCamera(this.cameras, this.character, map);
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      // TILE _ COLLIDER
      this.layersCollider.forEach(function (layerCollider) {
        _this3.physics.add.collider(_this3.enemieProjectile, layerCollider, _this3.handleProjectileWallCollision, undefined, _this3);
      });
      this.enemies.getChildren().forEach(function (enemie) {
        var _a;
        (_a = _this3.layersCollider) === null || _a === void 0 ? void 0 : _a.forEach(function (layer) {
          _this3.physics.add.collider(enemie, layer);
        });
      });
      // ATACK _ COLLIDER
      this.physics.add.collider(this.enemieProjectile, staticTileGroup, this.handleProjectileWallCollision, undefined, this);
      // ENEMY _ COLLIDER
      this.physics.add.collider(this.items, this.character, this.handleItemCollision, undefined, this);
    }
  }, {
    key: "handleProjectileWallCollision",
    value: function handleProjectileWallCollision(obj1, obj2) {
      obj1.destroy();
    }
  }, {
    key: "handleItemCollision",
    value: function handleItemCollision(obj1, obj2) {
      // Pega
      if (this.character.health < this.character.maxHealth) {
        this.character.recoverHealth();
        obj2.destroy();
      }
      _EventCenter.sceneEvents.emit('update-max-health-changed', this.character.health, this.character.maxHealth);
      obj2.destroy();
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      var _this4 = this;
      this.hodeds.getChildren().forEach(function (hoded) {
        hoded.update(_this4.character);
      });
      this.gargules.getChildren().forEach(function (gargule) {
        gargule.update(_this4.character);
      });
      if (this.character) {
        this.character.update(this.cursor, this);
      }
      if (this.character.x <= 20) {
        // this.SceneAbandonedVillage(CST.SCENES.ABANDONED_VILLAGE)
        this.scene.start(_CST.CST.SCENES.ABANDONED_VILLAGE, {
          spawn: "spawn_right"
        });
      }
    }
  }, {
    key: "SceneAbandonedVillage",
    value: function SceneAbandonedVillage(targetScene) {
      this.scene.transition({
        target: targetScene,
        duration: 1000,
        moveBelow: true,
        data: {
          x: this.character.x,
          y: this.character.y
        }
      });
    }
  }]);
  return PlayScene;
}(Phaser.Scene);
exports.default = PlayScene;
},{"../CST":"js-src/CST.js","../anims/EnemyAnims":"js-src/anims/EnemyAnims.js","../anims/CharacterAnims":"js-src/anims/CharacterAnims.js","../anims/SpellsAnims":"js-src/anims/SpellsAnims.js","../events/EventCenter":"js-src/events/EventCenter.js","../characters/Character":"js-src/characters/Character.js","../enemies/Bat":"js-src/enemies/Bat.js","../enemies/Hoded":"js-src/enemies/Hoded.js","../items/Item":"js-src/items/Item.js","../enemies/Gargule":"js-src/enemies/Gargule.js","../enemies/projectile":"js-src/enemies/projectile.js","./ConfingScene":"js-src/scenes/ConfingScene.js"}],"js-src/main.js":[function(require,module,exports) {
"use strict";

var _AbandonedVillage = _interopRequireDefault(require("./scenes/AbandonedVillage"));
var _GameUI = _interopRequireDefault(require("./scenes/GameUI"));
var _LoadScene = _interopRequireDefault(require("./scenes/LoadScene"));
var _MenuScene = _interopRequireDefault(require("./scenes/MenuScene"));
var _PlayScene = _interopRequireDefault(require("./scenes/PlayScene"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//npm install @types/phaser
// Autocompleta os types do phaser
/** @type {import("../typings/phaser")} */

var game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [_LoadScene.default, _MenuScene.default, _PlayScene.default, _GameUI.default, _AbandonedVillage.default],
  render: {
    pixelArt: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
});
},{"./scenes/AbandonedVillage":"js-src/scenes/AbandonedVillage.js","./scenes/GameUI":"js-src/scenes/GameUI.js","./scenes/LoadScene":"js-src/scenes/LoadScene.js","./scenes/MenuScene":"js-src/scenes/MenuScene.js","./scenes/PlayScene":"js-src/scenes/PlayScene.js"}],"../../AppData/Roaming/nvm/v18.12.1/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52129" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../AppData/Roaming/nvm/v18.12.1/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js-src/main.js"], null)
//# sourceMappingURL=/main.53a5891e.js.map