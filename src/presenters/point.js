import {render, replace, InsertionPosition} from '../helpers/render.js';
import {Mode} from '../helpers/const.js';
import CollapsedPointComponent from '../components/trip/points/collapsed-point.js';
import EditablePointComponent from '../components/trip/points/editable-point.js';

const emptyEvent = {
  'basePrice': 0,
  'dateFrom': new Date(),
  'dateTo': new Date(),
  'destination': null,
  'id': null,
  'isFavorite': false,
  'offers': null,
  'type': `taxi`
};

export default class PointPresenter {
  constructor(container, event, pointsPresenter) {
    this._container = container;
    this._event = event;
    this._pointsPresenter = pointsPresenter;
    this._destinations = this._pointsPresenter.getDestinations();
    this._offers = this._pointsPresenter.getOffers();
    this._mode = Mode.DEFAULT;
    this._collapsedPointComponent = null;
    this._editablePointComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(mode) {
    this._mode = mode;

    if (this._mode === Mode.DEFAULT) {
      this._collapsedPointComponent = new CollapsedPointComponent(this._event, this._offers);
      this._editablePointComponent = new EditablePointComponent(this._event, this._destinations, this._offers);

      this._collapsedPointComponent.setEditButtonClickHandler(() => {
        this._replaceEventToEdit();
      });

      this._editablePointComponent.setSubmitHandler(() => {
        this._replaceEditToEvent();
        const data = this._editablePointComponent.getData();
        this._pointsPresenter.syncData(this._event, Object.assign({}, this._event, data));
      });

      this._editablePointComponent.setCollapseHandler(() => {
        this._replaceEditToEvent();
      });

      this._editablePointComponent.setDeleteButtonClickHandler(() => {
        this._pointsPresenter.syncData(this._event, null);
      });

      this._editablePointComponent.setFavoritesButtonClickHandler(() => {
        this._pointsPresenter.syncFavorite(this._event.id, !(this._event[`isFavorite`]));
      });

    } else {
      this._event = emptyEvent;
      this._event[`id`] = this._pointsPresenter.getNewID();
      this._event[`destination`] = this._destinations[0][`name`];
      this._editablePointComponent = new EditablePointComponent(this._event, this._destinations, this._offers);

      this._editablePointComponent.setSubmitHandler(() => {
        const data = this._editablePointComponent.getData();
        this._pointsPresenter.syncData(null, data);
      });
    }

    render(this._container, this._collapsedPointComponent, InsertionPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceEditToEvent() {
    replace(this._collapsedPointComponent, this._editablePointComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointsPresenter.unsubscribe(this);
  }

  _replaceEventToEdit() {
    this._pointsPresenter.collapse();
    replace(this._editablePointComponent, this._collapsedPointComponent);
    this._mode = Mode.EDIT;
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._pointsPresenter.subscribe(this);
  }
}
