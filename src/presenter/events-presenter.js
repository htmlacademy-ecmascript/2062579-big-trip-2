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
  // #sourcedEventsPoints = []; // копия изначального набора данных. Нужна?

  constructor({pointsListContainer, pointsModel}) {
    this.#pointsListContainer = pointsListContainer; // получаем контейнер, в который будет вставлен список точек
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventsPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    /**
     * сохраненный исходный массив точек. Нужен?
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
   * метод сортировки точек
   * @param {*} sortType
   */
  #sortPoints(sortType) {
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
      // default: // нужно ли значение по-умолчанию?
        // this.#eventsPoints = [...this.#sourcedEventsPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) { // проверяем какой тип сортировки выбран сейчас, если совпадает с выбранным - не перерисовываем список
      return;
    }
    this.#sortPoints(sortType); // сортируем задачи
    this.#clearPointsList(); // очищаем список
    this.#renderPoints(); // отрисовываем точки
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
   * метод закрытия карточек в режиме редактирования (чтобы была открыта только одна)
   */
  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /**
   * метод отрисовки точек маршрута
   */
  #renderPoints() {
    for(let i = 0; i < this.#eventsPoints.length; i++) { // вставляем в список точки маршрута
      const pointPresenter = new PointPresenter(this.#eventsPoints[i], this.#destinations, this.#offers, this.#handlePointChange, this.#handleModeChange, this.#pointsList);
      pointPresenter.init(this.#eventsPoints[i]);
      this.#pointPresenters.set(this.#eventsPoints[i].id, pointPresenter); // заполняем коллекцию точек маршрута
    }
  }

  /**
   * метод рендеринга списка точек
   */
  #renderEventsList() { // метод отрисовки списка точек маршрута и сортировки
    this.#renderPointList(); // вставляем список в контейнер

    this.#sortPoints(SortingTypes.DAY); // сортируем задачи по датам
    this.#renderPoints();

    if(this.#pointsList.element.children.length === 0) { // проверка наличия точек маршрута
      this.#renderNoPoint(); // если их нет, рендерим заглушку
    } else {
      this.#renderSorting(); // если точки есть, добавляем сортировку
    }
  }
}
