class EventManager {
  constructor() {
    this.eventHandlers = {};
  }
  on(eventName, handler) {
    this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
    this.eventHandlers[eventName].push(handler);
  }

  _fire(eventName) {
    var args = Array.prototype.slice.call(arguments, 0).slice(1);
    var funcs = this.eventHandlers[eventName];
    if (funcs && funcs.length) {
      funcs.forEach(function(func) {
        func.apply(this, args);
      });
    }
  }
}
