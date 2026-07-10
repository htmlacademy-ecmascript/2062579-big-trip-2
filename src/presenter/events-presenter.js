import PointsListView from '../view/points-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import SortingView from '../view/sorting-view.js';
import { RenderPosition, render, replace } from '../framework/render.js';

export default class EventsPresenter {
  #pointsList = new PointsListView(); // список для точек маршрута

  #pointsListContainer = null;
  #pointsModel = null;
  #eventsPoints = [];
  #destinations = [];
  #offers = [];

  constructor({pointsListContainer, pointsModel}) {
    this.#pointsListContainer = pointsListContainer; // получаем контейнер, в который будет вставлен список точек
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderEventsList();
  }

  #renderPoint(point, destinations, offers) { // метод отрисовки точки маршрута или формы редактирования этой точки
    const escKeyDownHandler = (evt) => { // обработчик для закрытия по esc
      if(evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint(); // замена формы на точку
        document.removeEventListener('keydown', escKeyDownHandler); // удаление обработчика по esc
      }
    };

    const onEditClick = () => { // обработчик для открытия формы по кнопке-стрелке
      replacePointToEdit(); // замена точки на форму
      document.addEventListener('keydown', escKeyDownHandler); // добавление обработчика по esc
    };

    const onCloseClick = () => { // обработчик для закрытия формы по кнопке-стрелке
      replaceEditToPoint(); // замена формы на точку
      document.removeEventListener('keydown', escKeyDownHandler); // удаление обработчика по esc
    };

    const onFormSubmit = () => { // обработчик для закрытия формы по кнопке save (временно, потом заменю функционал на сабмит формы)
      replaceEditToPoint(); // замена формы на точку
      document.removeEventListener('keydown', escKeyDownHandler); // удаление обработчика по esc
    };

    const pointComponent = new PointView({point}, destinations, offers, onEditClick);

    const pointEditComponent = new EditPointView({point}, destinations, offers, onCloseClick, onFormSubmit);

    function replacePointToEdit() { // функция замены точки на форму редактирования
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditToPoint() { // функция замены формы редактирования на точку
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsList.element);
  }

  #renderEventsList() { // метод отрисовки списка точек маршрута и сортировки
    render(this.#pointsList, this.#pointsListContainer); // вставляем список в контейнер
    for(let i = 0; i < this.#eventsPoints.length; i++) { // вставляем в список точки маршрута
      this.#renderPoint(this.#eventsPoints[i], this.#destinations, this.#offers);
    }
    if(this.#pointsList.element.children.length === 0) { // проверка наличия точек маршрута
      render(new NoPointView(), this.#pointsListContainer); // если их нет, рендерим заглушку
    } else {
      render(new SortingView(), this.#pointsListContainer, RenderPosition.AFTERBEGIN); // если тояки есть, добавляем сортировку
    }
  }
}
