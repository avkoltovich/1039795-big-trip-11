import FilterComponent from '../components/header/filter.js';
import {InsertionPosition, render} from '../helpers/render.js';

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filterComponent = new FilterComponent();
  }

  render() {
    this._filterComponent.setFilterTypeChangeHandler((filterType) => {
      this._eventsModel.setFilterType(filterType);
    });

    render(this._container, this._filterComponent, InsertionPosition.BEFOREEND);
  }
}
