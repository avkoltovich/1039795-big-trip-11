import FilterComponent from '../components/header/filter.js';
import {InsertionPosition, render} from '../helpers/render.js';

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
  }

  render() {
    render(this._container, new FilterComponent(), InsertionPosition.BEFOREEND);
  }
}
