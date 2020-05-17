import {render, replace, InsertionPosition} from '../helpers/render.js';
import CollapsedEventComponent from '../components/trip/points/collapsed-point.js';
import EditableEventComponent from '../components/trip/points/editable-point.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, pointsObserver) {
    this._container = container;
    this._pointsObserver = pointsObserver;
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

    this._editableEventComponent.setCollapseHandler(() => {
      this._replaceEditToEvent();
    });

    this._editableEventComponent.setFavoritesButtonClickHandler(() => {
      this._pointsObserver.syncData(this, event, Object.assign({}, event, {
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
    this._pointsObserver.collapse();
    replace(this._editableEventComponent, this._collapsedEventComponent);
    this._mode = Mode.EDIT;
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._pointsObserver.subscribe(this);
  }

  _replaceEditToEvent() {
    replace(this._collapsedEventComponent, this._editableEventComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointsObserver.unsubscribe(this);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
