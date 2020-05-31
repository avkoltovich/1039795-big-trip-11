export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems(key) {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey + key)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(key, items) {
    this._storage.setItem(
        key = this._storeKey + key,
        JSON.stringify(items)
    );
  }
}
