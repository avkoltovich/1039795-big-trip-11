export default class Provider {
  constructor(api) {
    this._api = api;
  }

  addEvent(data) {
    return this._api.addEvent(data);
  }

  deleteEvent(id) {
    return this._api.deleteEvent(id);
  }

  getData() {
    return this._api.getData();
  }

  updateEvent(id, data) {
    return this._api.updateEvent(id, data);
  }
}
