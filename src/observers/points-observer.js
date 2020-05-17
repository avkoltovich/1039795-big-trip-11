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

  syncData(pointPresenter, oldData, newData) {
    const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

    if (isSuccess) {
      pointPresenter.render(newData);
    }
  }
}
