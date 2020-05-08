import {render, replace, InsertionPosition} from '../helpers/render.js';
import CollapsedEventComponent from '../components/trip/events/collapsed-event.js';
import EditableEventComponent from '../components/trip/events/editable-event.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, pointObserver) {
    this._container = container;
    this._pointObserver = pointObserver;
    this._mode = Mode.DEFAULT;
    this._collapsedEventComponent = null;
    this._editableEventComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    const oldCollapsedEventComponent = this._collapsedEventComponent;
    const oldEditableEventComponent = this._editableEventComponent;

    this._collapsedEventComponent = new CollapsedEventComponent(event);
    this._editableEventComponent = new EditableEventComponent(event);

    this._collapsedEventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
    });

    this._editableEventComponent.setSubmitHandler(() => {
      this._replaceEditToEvent();
    });

    this._editableEventComponent.setFavoritesButtonClickHandler(() => {
      this._pointObserver.syncData(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    if (oldCollapsedEventComponent && oldEditableEventComponent) {
      replace(this._collapsedEventComponent, oldCollapsedEventComponent);
      replace(this._editableEventComponent, oldEditableEventComponent);
    } else {
      render(this._container, this._collapsedEventComponent, InsertionPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._pointObserver.collapse();
    replace(this._editableEventComponent, this._collapsedEventComponent);
    this._mode = Mode.EDIT;
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._pointObserver.subscribe(this);
  }

  _replaceEditToEvent() {
    replace(this._collapsedEventComponent, this._editableEventComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointObserver.unsubscribe(this);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
