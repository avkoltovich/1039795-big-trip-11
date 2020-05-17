export default class PointsObserver {
  constructor(eventsModel) {
    this._eventsModel = eventsModel;
    this._syncData = null;
    this.observers = [];
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

  syncData(oldData, newData) {
    if (newData) {
      this._eventsModel.updateEvent(oldData.id, newData);
    } else {
      this._eventsModel.removeTask(oldData.id);
    }
  }
}
