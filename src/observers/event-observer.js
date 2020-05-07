export default class EventObserver {
  constructor() {
    this._syncData = null;
    this.observers = [];
  }

  setSyncDataFunction(fn) {
    this._syncData = fn;
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  collapse() {
    this.observers.forEach((it) => it.setDefaultView());
  }

  syncData(...args) {
    if (this._syncData) {
      this._syncData(...args);
    } else {
      throw new Error(`Please set syncData function.`);
    }
  }
}
