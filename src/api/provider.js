const keyMap = {
  EVENTS: `-events`,
  DESTINATIONS: `-destinations`,
  OFFERS: `-offers`
};

const isOnline = () => {
  return window.navigator.onLine;
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
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
      return this._api.getData()
        .then((response) => {
          const events = createStoreStructure(response.events.map((event) => event.toRAW()));

          this._store.setItems(keyMap.OFFERS, response.offers);
          this._store.setItems(keyMap.DESTINATIONS, response.destinations);
          this._store.setItems(keyMap.EVENTS, events);

          return response;
        });
    }

    return Promise.resolve(Object.assign({},
        {events: this._store.getItems(keyMap.EVENTS)},
        {destinations: this._store.getItems(keyMap.DESTINATIONS)},
        {offers: this._store.getItems(keyMap.OFFERS)}));
  }

  updateEvent(id, data) {
    if (isOnline()) {
      return this._api.updateEvent(id, data);
    }

    // TODO: Реализовать логику при отсутствии интернета
    return Promise.reject(`offline logic is not implemented`);
  }
}
