export default class PointPresenter {
  constructor(eventsModel) {
    this._eventsModel = eventsModel;
    this._destinations = this._eventsModel.getDestinations();
    this._offers = this._eventsModel.getOffers();
    this._observers = [];
  }

  collapse() {
    this._observers.forEach((item) => item.setDefaultView());
  }

  getDestinations() {
    return this._destinations;
  }

  getNewID() {
    return this._eventsModel.getNewID();
  }

  getOffers() {
    return this._offers;
  }

  subscribe(handler) {
    this._observers.push(handler);
  }

  syncData(oldData, newData) {
    if (oldData && newData) {
      this._eventsModel.updateEvent(oldData.id, newData);
    } else if (!oldData) {
      this._eventsModel.addEvent(newData);
    } else {
      this._eventsModel.removeEvent(oldData.id);
    }
  }

  syncFavorite(id, isFavorite) {
    this._eventsModel.updateFavoriteEvent(id, isFavorite);
  }

  unsubscribe(handler) {
    this._observers = this._observers.filter((subscriber) => subscriber !== handler);
  }
}
