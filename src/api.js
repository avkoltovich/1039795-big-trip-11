import EventAdapter from './models/event.js';

const ServerUrl = {
  POINTS: `https://11.ecmascript.pages.academy/big-trip/points`,
  OFFERS: `https://11.ecmascript.pages.academy/big-trip/offers`,
  DESTINATIONS: `https://11.ecmascript.pages.academy/big-trip/destinations`
};

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getData() {
    return Promise.all([
      this._getEvents(),
      this._getOffers(),
      this._getDestinations(),
    ])
      .then((response) => {
        const [events, offers, destinations] = response;
        return {
          events,
          offers,
          destinations,
        };
      });
  }

  updateEvent(id, data) {
    return this._loadData({
      url: `${ServerUrl.POINTS}/${id}`,
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(this._checkStatus)
    .then((response) => response.json())
    .then(EventAdapter.parseTripEvent);
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _getEvents() {
    return this._loadData({url: ServerUrl.POINTS})
      .then((response) => response.json())
      .then(EventAdapter.parseEvents);
  }

  _getDestinations() {
    return this._loadData({url: ServerUrl.DESTINATIONS})
      .then((response) => response.json());
  }

  _getOffers() {
    return this._loadData({url: ServerUrl.OFFERS})
      .then((response) => response.json());
  }

  _loadData({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(url, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
