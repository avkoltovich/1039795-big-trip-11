export default class PointsObserver {
  constructor(eventsModel) {
    this._eventsModel = eventsModel;
    this._syncData = null;
    this.observers = [];
  }

  subscribe(handler) {
    this.observers.push(handler);
  }

  unsubscribe(handler) {
    this.observers = this.observers.filter((subscriber) => subscriber !== handler);
  }

  collapse() {
    this.observers.forEach((item) => item.setDefaultView());
  }

  syncData(oldData, newData) {
    if (newData) {
      this._eventsModel.updateEvent(oldData.id, newData);
    } else {
      this._eventsModel.removeEvent(oldData.id);
    }
  }

  syncFavorite(id, isFavorite) {
    this._eventsModel.updateFavoriteEvent(id, isFavorite);
  }
}
