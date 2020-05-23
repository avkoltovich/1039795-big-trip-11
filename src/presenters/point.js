import {render, replace, InsertionPosition} from '../helpers/render.js';
import CollapsedEventComponent from '../components/trip/points/collapsed-point.js';
import EditableEventComponent from '../components/trip/points/editable-point.js';

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointPresenter {
  constructor(container, pointsObserver) {
    this._container = container;
    this._editablePointPresenter = pointsObserver;
    this._mode = Mode.DEFAULT;
    this._collapsedEventComponent = null;
    this._editableEventComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, destinations, offers) {
    this._collapsedEventComponent = new CollapsedEventComponent(event, offers);
    this._editableEventComponent = new EditableEventComponent(event, destinations, offers);

    this._collapsedEventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
    });

    this._editableEventComponent.setSubmitHandler(() => {
      this._replaceEditToEvent();
      const data = this._editableEventComponent.getData();
      this._editablePointPresenter.syncData(event, Object.assign({}, event, data));
    });

    this._editableEventComponent.setCollapseHandler(() => {
      this._replaceEditToEvent();
    });

    this._editableEventComponent.setDeleteButtonClickHandler(() => {
      this._editablePointPresenter.syncData(event, null);
    });

    this._editableEventComponent.setFavoritesButtonClickHandler(() => {
      this._editablePointPresenter.syncFavorite(event.id, !(event[`isFavorite`]));
    });

    render(this._container, this._collapsedEventComponent, InsertionPosition.BEFOREEND);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._editablePointPresenter.collapse();
    replace(this._editableEventComponent, this._collapsedEventComponent);
    this._mode = Mode.EDIT;
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._editablePointPresenter.subscribe(this);
  }

  _replaceEditToEvent() {
    replace(this._collapsedEventComponent, this._editableEventComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._editablePointPresenter.unsubscribe(this);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
