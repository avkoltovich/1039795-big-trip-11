import {render, replace, InsertionPosition} from '../../../helpers/render.js';
import CollapsedEventComponent from './collapsed-event.js';
import EditableEventComponent from './editable-event.js';

export default class EventItemElement {
  constructor(container) {
    this._container = container;
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
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editableEventComponent.setSubmitHandler(() => {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    if (oldCollapsedEventComponent && oldEditableEventComponent) {
      replace(this._collapsedEventComponent, oldCollapsedEventComponent);
      replace(this._editableEventComponent, oldEditableEventComponent);
    } else {
      render(this._container, this._collapsedEventComponent, InsertionPosition.BEFOREEND);
    }
  }

  _replaceEventToEdit() {
    replace(this._editableEventComponent, this._collapsedEventComponent);
  }

  _replaceEditToEvent() {
    replace(this._collapsedEventComponent, this._editableEventComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
