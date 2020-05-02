import {replace} from '../../../helpers/render.js';
import CollapsedEventComponent from './collapsed-event.js';
import EditableEventComponent from './editable-event.js';

const getEventItemElement = (event) => {
  const collapsedEventComponent = new CollapsedEventComponent(event);
  const editableEventComponent = new EditableEventComponent(event);

  const replaceEventToEdit = () => {
    replace(editableEventComponent, collapsedEventComponent);
  };

  const replaceEditToEvent = () => {
    replace(collapsedEventComponent, editableEventComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onRollUpEventButtonClick = () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEditFormSubmit = () => {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  collapsedEventComponent.setEditButtonClickHandler(onRollUpEventButtonClick);

  editableEventComponent.setSubmitHandler(onEditFormSubmit);

  return collapsedEventComponent;
};

export default class EventItemElement {
  constructor(event) {
    this._event = event;
    this._element = getEventItemElement(this._event);

    return this._element;
  }
}