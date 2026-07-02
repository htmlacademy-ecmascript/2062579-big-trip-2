import TripInfoView from './presenter/trip-info-presenter.js';
import FilterView from './view/filter-view.js';
import SortingView from './view/sorting-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({ // создаем презентер с указанием контейнера, в который он добавится, + добавляем в него модель
  pointsListContainer: tripEventsContainer,
  pointsModel: pointsModel
});
const tripInfo = new TripInfoView({tripInfoContainer: tripInfoContainer});

render(new FilterView(), filterContainer); // добавляем фильтры
render(new SortingView(), tripEventsContainer); // добавляем сортировку

eventsPresenter.init(); // добавляем презентер с маршрутом
tripInfo.init(); // добавляем информацию о маршруте
