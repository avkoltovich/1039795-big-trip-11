const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api) {
    this._api = api;
  }

  addEvent(data) {
    if (isOnline()) {
      return this._api.addEvent(data);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  deleteEvent(id) {
    if (isOnline()) {
      return this._api.deleteEvent(id);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  getData() {
    if (isOnline()) {
      return this._api.getData();
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }

  updateEvent(id, data) {
    if (isOnline()) {
      return this._api.updateEvent(id, data);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }
}
