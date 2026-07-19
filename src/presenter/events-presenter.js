import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortingView from '../view/sorting-view.js';
import { RenderPosition, render } from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import { updateItem, SortingTypes, sortPrice, sortDay, sortTime } from '../utils/utils.js';

export default class EventsPresenter {
  #pointsList = new PointsListView(); // список для точек маршрута

  #pointsListContainer = null;
  #pointsModel = null;
  #eventsPoints = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map(); // коллекция с точками маршрута
  #sortComponent = null;
  #currentSortType = SortingTypes.DAY;
  // #sourcedEventsPoints = [];

  constructor({pointsListContainer, pointsModel}) {
    this.#pointsListContainer = pointsListContainer; // получаем контейнер, в который будет вставлен список точек
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    /**
     * сохраненный исходный массив точек
     */
    // this.#sourcedEventsPoints = [...this.#pointsModel.points];

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
   * ИЗМЕНИТЬ !!!
   * @param {*} sortType
   */
  #sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortingTypes.DAY:
        this.#eventsPoints.sort(sortDay);
        break;
      case SortingTypes.TIME:
        this.#eventsPoints.sort(sortTime);
        break;
      case SortingTypes.PRICE:
        this.#eventsPoints.sort(sortPrice);
        break;
      default:
        // this.#eventsPoints = [...this.#sourcedEventsPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    // - Очищаем список
    this.#clearPointsList();
    // - Рендерим список заново
    for(let i = 0; i < this.#eventsPoints.length; i++) { // вставляем в список точки маршрута
      const pointPresenter = new PointPresenter(this.#eventsPoints[i], this.#destinations, this.#offers, this.#handlePointChange, this.#handleModeChange, this.#pointsList);
      pointPresenter.init(this.#eventsPoints[i]);
      this.#pointPresenters.set(this.#eventsPoints[i].id, pointPresenter); // заполняем коллекцию точек маршрута
    }
  };

  /**
   * метод очистки списка точек
   */
  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  /**
   * метод рендеринга сортировки
   */
  #renderSorting() {
    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
  }

  /**
   * метод обновления данных при ручном изменении пользователем
   */
  #handlePointChange = (changedPoint) => {
    this.#eventsPoints = updateItem(this.#eventsPoints, changedPoint);
    // this.#sourcedEventsPoints = updateItem(this.#eventsPoints, changedPoint); // сохраненный тоже обновляем
    this.#pointPresenters.get(changedPoint.id).init(changedPoint);
  };

  /**
   *
   */
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * метод рендеринга списка точек
   */
  #renderEventsList() { // метод отрисовки списка точек маршрута и сортировки
    this.#renderPointList(); // вставляем список в контейнер

    for(let i = 0; i < this.#eventsPoints.length; i++) { // вставляем в список точки маршрута
      const pointPresenter = new PointPresenter(this.#eventsPoints[i], this.#destinations, this.#offers, this.#handlePointChange, this.#handleModeChange, this.#pointsList);
      pointPresenter.init(this.#eventsPoints[i]);
      this.#pointPresenters.set(this.#eventsPoints[i].id, pointPresenter); // заполняем коллекцию точек маршрута
    }

    if(this.#pointsList.element.children.length === 0) { // проверка наличия точек маршрута
      this.#renderNoPoint(); // если их нет, рендерим заглушку
    } else {
      this.#renderSorting(); // если точки есть, добавляем сортировку
    }
  }
}
