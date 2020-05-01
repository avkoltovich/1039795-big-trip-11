import {replace} from '../../helpers/render.js';
import DaysListComponent from './days/days-list.js';
import DayItemBlankComponent from './days/day-blank.js';
import EventEditComponent from './events/event-edit.js';
import EventsListComponent from './events/events-list.js';
import EventComponent from './events/event.js';

const renderEventItemElement = (eventsListElement, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
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

  eventComponent.setEditButtonClickHandler(onRollUpEventButtonClick);

  eventEditComponent.setSubmitHandler(onEditFormSubmit);

  eventComponent.render(eventsListElement);
};

const getTripWithoutDays = (sortedEvents) => {
  const daysListComponent = new DaysListComponent();
  const dayItemComponent = new DayItemBlankComponent();
  dayItemComponent.render(daysListComponent);

  const eventsListComponent = new EventsListComponent();
  eventsListComponent.render(dayItemComponent);

  for (let event of sortedEvents) {
    renderEventItemElement(eventsListComponent, event);
  }

  return daysListComponent;
};

export {getTripWithoutDays};
