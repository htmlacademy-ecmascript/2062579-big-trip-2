import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortingView from '../view/sorting-view.js';
import { RenderPosition, render } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class EventsPresenter {
  #pointsList = new PointsListView(); // список для точек маршрута

  #pointsListContainer = null;
  #pointsModel = null;
  #eventsPoints = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map(); // коллекция с точками маршрута

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

  /**
   * метод рендеринга пустого списка для точек
   */
  #renderPointList() {
    render(this.#pointsList, this.#pointsListContainer);
  }

  /**
   * метод рендеринга заглушки
   */
  #renderNoPoint() {
    render(new NoPointView(), this.#pointsListContainer);
  }

  /**
   * метод рендеринга сортировки
   */
  #renderSorting() {
    render(new SortingView(), this.#pointsListContainer, RenderPosition.AFTERBEGIN);
  }

  /**
   * метод рендеринга списка точек
   */
  #renderEventsList() { // метод отрисовки списка точек маршрута и сортировки
    this.#renderPointList(); // вставляем список в контейнер

    for(let i = 0; i < this.#eventsPoints.length; i++) { // вставляем в список точки маршрута
      const pointPresenter = new PointPresenter(this.#eventsPoints[i], this.#destinations, this.#offers, this.#handlePointChange, this.#pointsList);
      pointPresenter.init(this.#eventsPoints[i]);
      this.#pointPresenters.set(this.#eventsPoints[i].id, pointPresenter); // заполняем коллекцию точек маршрута
    }

    if(this.#pointsList.element.children.length === 0) { // проверка наличия точек маршрута
      this.#renderNoPoint(); // если их нет, рендерим заглушку
    } else {
      this.#renderSorting(); // если точки есть, добавляем сортировку
    }
  }

  /**
   * метод обновления данных при ручном изменении пользователем
   */
  #handlePointChange = (changedPoint) => {
    this.#eventsPoints = updateItem(this.#eventsPoints, changedPoint);
    this.#pointPresenters.get(changedPoint.id).init(changedPoint);
  };
}
