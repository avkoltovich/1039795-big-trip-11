import EventAdapter from './models/event-adapter.js';

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

  addEvent(data) {
    return this._sendRequest({
      url: ServerUrl.POINTS,
      method: `POST`,
      body: JSON.stringify(data.toRAW()),
    })
      .then((response) => response.json())
      .then(EventAdapter.parseTripEvent);
  }

  deleteEvent(id) {
    return this._sendRequest({
      url: `${ServerUrl.POINTS}/${id}`,
      method: `DELETE`,
    });
  }

  updateEvent(id, data) {
    return this._sendRequest({
      url: `${ServerUrl.POINTS}/${id}`,
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
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
    return this._sendRequest({url: ServerUrl.POINTS})
      .then((response) => response.json())
      .then(EventAdapter.parseEvents);
  }

  _getDestinations() {
    return this._sendRequest({url: ServerUrl.DESTINATIONS})
      .then((response) => response.json());
  }

  _getOffers() {
    return this._sendRequest({url: ServerUrl.OFFERS})
      .then((response) => response.json());
  }

  _sendRequest({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(url, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
