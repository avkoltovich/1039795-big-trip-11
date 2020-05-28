export default class PointPresenter {
  constructor(eventsModel) {
    this._enableNewEventButtonHandler = null;
    this._eventsModel = eventsModel;
    this._observers = [];
  }

  collapse() {
    this._observers.forEach((item) => item.setDefaultView());
  }

  collapseAndUnsubscribeAll() {
    if (this._observers.length > 0) {
      this.collapse();
      this._observers = [];
    }
  }

  callEnableNewEventButtonHandler() {
    this._enableNewEventButtonHandler();
  }

  getDestinations() {
    return this._eventsModel.getDestinations();
  }

  getNewID() {
    return this._eventsModel.getNewID();
  }

  getOffers() {
    return this._eventsModel.getOffers();
  }

  getOffersTitleMap() {
    return this._eventsModel.getOffersTitleMap();
  }

  setEnableNewEventButtonHandler(handler) {
    this._enableNewEventButtonHandler = handler;
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
