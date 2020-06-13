export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer;
    this.state = this.rootReducer(initialState, {type: 'INIT'});
    this.subscribers = [];
  }
  subscribe(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }
  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
    this.subscribers.forEach(sub => sub(this.state));
  }
  getState() {
    return this.state;
  }
}
