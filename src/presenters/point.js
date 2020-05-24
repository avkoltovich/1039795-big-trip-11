import {render, replace, InsertionPosition} from '../helpers/render.js';
import {Mode} from '../helpers/const.js';
import CollapsedPointComponent from '../components/trip/points/collapsed-point.js';
import EditablePointComponent from '../components/trip/points/editable-point.js';

export default class PointPresenter {
  constructor(container, event, pointsPresenter) {
    this._container = container;
    this._collapsedPointComponent = null;
    this._editablePointComponent = null;
    this._event = event;
    this._mode = Mode.DEFAULT;
    this._pointsPresenter = pointsPresenter;

    this._destinations = this._pointsPresenter.getDestinations();
    this._offers = this._pointsPresenter.getOffers();

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEscKeyDownNewEvent = this._onEscKeyDownNewEvent.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  remove() {
    if (this._editablePointComponent) {
      this._editablePointComponent.getElement().remove();
      this._editablePointComponent = null;
    }
  }

  render(mode) {
    this._mode = mode;

    if (this._mode === Mode.DEFAULT) {
      this._collapsedPointComponent = new CollapsedPointComponent(this._event, this._offers);
      this._editablePointComponent = new EditablePointComponent(this._event, this._destinations, this._offers, this._mode);

      this._collapsedPointComponent.setEditButtonClickHandler(() => {
        this._replaceEventToEdit();
      });

      this._editablePointComponent.setSubmitHandler((evt) => {
        evt.preventDefault();
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

      render(this._container, this._collapsedPointComponent, InsertionPosition.BEFOREEND);
    } else {
      this._addNewEvent();

      render(this._container, this._editablePointComponent, InsertionPosition.AFTEREND);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToEvent();
    }

    if (this._mode === Mode.ADDING) {
      this._deleteAddNewEventForm();
    }
  }

  _addNewEvent() {
    this._event[`id`] = this._pointsPresenter.getNewID();
    this._event[`destination`] = this._destinations[0];
    this._editablePointComponent = new EditablePointComponent(this._event, this._destinations, this._offers, this._mode);
    this._editablePointComponent.applyFlatpickr();
    this._editablePointComponent.subscribeOnEvents();

    this._editablePointComponent.setDeleteButtonClickHandler(() => {
      this._deleteAddNewEventForm();
    });

    this._editablePointComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._editablePointComponent.removeFlatpickr();
      const data = this._editablePointComponent.getData();
      this._editablePointComponent.getElement().remove();
      this._pointsPresenter.syncData(null, data);
      this._pointsPresenter.unsubscribe(this);
    });

    this._pointsPresenter.subscribe(this);

    document.addEventListener(`keydown`, this._onEscKeyDownNewEvent);
  }

  _deleteAddNewEventForm() {
    this._editablePointComponent.removeFlatpickr();
    this._editablePointComponent.getElement().remove();
    this._pointsPresenter.unsubscribe(this);
    this._pointsPresenter.callEnableNewEventButtonHandler();
    document.removeEventListener(`keydown`, this._onEscKeyDownNewEvent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onEscKeyDownNewEvent(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._deleteAddNewEventForm();
    }
  }

  _replaceEditToEvent() {
    replace(this._collapsedPointComponent, this._editablePointComponent);
    this._editablePointComponent.removeFlatpickr();
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
    this._editablePointComponent.applyFlatpickr();
    this._editablePointComponent.subscribeOnEvents();
  }
}
