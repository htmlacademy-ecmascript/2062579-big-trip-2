import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';
import EventsPresenter from './view/events-presenter.js';
import { RenderPosition, render } from './render.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter({pointsListContainer: tripEventsContainer}); // создаем презентер с указанием контейнера, в который он добавится

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN); // добавляем информацию о маршруте
render(new FilterView(), filterContainer); // добавляем фильтры
render(new SortingView(), tripEventsContainer); // добавляем сортировку

eventsPresenter.init(); // добавляем презентер с маршрутом
