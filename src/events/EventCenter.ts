/*
`Phaser.Events.EventEmitter` é uma classe no Phaser que permite a criação e gerenciamento de eventos personalizados. É usada para implementar um sistema de eventos no Phaser, onde objetos podem emitir eventos e outros objetos podem se inscrever para ouvir esses eventos e responder a eles.

A classe `Phaser.Events.EventEmitter` fornece métodos para emitir eventos, se inscrever em eventos e cancelar a inscrição de eventos. Alguns dos métodos importantes incluem:

- `on(event: string, callback: Function, context?: any)`: Registra uma função de retorno de chamada (callback) para um determinado evento. Sempre que o evento for emitido, a função de retorno de chamada será chamada.

- `emit(event: string, ...args: any[])`: Emite um evento, disparando todas as funções de retorno de chamada registradas para esse evento. Os argumentos adicionais passados para `emit` serão repassados para as funções de retorno de chamada.

- `off(event?: string, callback?: Function, context?: any, once?: boolean)`: Cancela a inscrição em um evento específico. Se nenhum evento for fornecido, todas as inscrições serão canceladas. É possível filtrar a cancelação de inscrição com base na função de retorno de chamada e no contexto.

O uso do `Phaser.Events.EventEmitter` permite que você crie e gerencie facilmente eventos personalizados em seu jogo Phaser. Isso pode ser útil para comunicação entre objetos, notificações de eventos importantes, atualizações de estado e muito mais.
*/

const sceneEvents = new Phaser.Events.EventEmitter();

export {
    sceneEvents
}   
