import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.prepare();
    this.unsubscribers = [];
  }
  toHTML() {
    return '';
  }
  prepare() {
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  $sub(event, fn) {
    this.emitter.subscribe(event, fn);
  }
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
