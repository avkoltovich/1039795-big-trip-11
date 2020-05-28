import moment from 'moment';

export default class EventAdapter {
  constructor(data) {
    this.basePrice = data[`base_price`];
    this.dateFrom = new Date(data[`date_from`]);
    this.dateTo = new Date(data[`date_to`]);
    this.destination = data[`destination`];
    this.id = data[`id`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`];
    this.type = data[`type`];
  }

  toRAW() {
    const RAWObj = {
      'id': this.id,
      'type': this.type,
      'date_from': moment.parseZone(this.start).utc().format(),
      'date_to': moment.parseZone(this.end).utc().format(),
      'is_favorite': this.isFavorite,
      'base_price': this.basePrice,
      'offers': this.offers,
      'destination': this.destination,
    };
    return RAWObj;
  }

  static parseEvent(data) {
    return new EventAdapter(data);
  }

  static parseEvents(data) {
    return data.map(EventAdapter.parseEvent);
  }
}
