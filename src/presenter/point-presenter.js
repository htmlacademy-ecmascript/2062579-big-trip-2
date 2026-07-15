import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {
  #pointsList = null;
  #point = null;
  #destinations = [];
  #offers = [];
  #handleDataChange = null;

  constructor(point, destinations, offers, onDataChange, pointsList) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsList = pointsList;
    this.#handleDataChange = onDataChange;
  }

  #pointComponent = null;
  #pointEditComponent = null;

  /**
   * метод  для закрытия по esc
   */
  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPoint(); // замена формы на точку
      document.removeEventListener('keydown', this.#escKeyDownHandler); // удаление обработчика по esc
    }
  };

  /**
   * метод для открытия формы по кнопке-стрелке
   */
  #onEditClick = () => {
    this.#replacePointToEdit(); // замена точки на форму
    document.addEventListener('keydown', this.#escKeyDownHandler); // добавление обработчика по esc
  };

  /**
   * метод для закрытия формы по кнопке-стрелке
   */
  #onCloseClick = () => {
    this.#replaceEditToPoint(); // замена формы на точку
    document.removeEventListener('keydown', this.#escKeyDownHandler); // удаление обработчика по esc
  };

  /**
   * метод для закрытия формы по кнопке save (временно, потом заменю функционал на сабмит формы)
   */
  #onFormSubmit = () => {
    this.#replaceEditToPoint(); // замена формы на точку
    document.removeEventListener('keydown', this.#escKeyDownHandler); // удаление обработчика по esc
  };

  /**
   * метод для клика по кнопке избранного
   */
  #onFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  /**
   * метод замены точки на форму редактирования
   */
  #replacePointToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  /**
   * метод замены формы редактирования на точку
   */
  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  init(point) {
    this.#point = point;
    /**
     * создаем экземпляры предыдущих компонентов
     */
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    /**
     * инициализируем новые элементы
     */
    this.#pointComponent = new PointView(this.#point, this.#destinations, this.#offers, this.#onFavoriteClick, this.#onEditClick);

    this.#pointEditComponent = new EditPointView(this.#point, this.#destinations, this.#offers, this.#onCloseClick, this.#onFormSubmit);

    /**
     * проверка, были уже ранее созданы точки или нет (=== null)
     * если нет - рендерим точки
     */
    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsList.element);
      return;
    }

    /**
     * проверка наличия элементов в DOM
     * если есть - заменяем
     */
    if(this.#pointsList.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if(this.#pointsList.element.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    /**
     * удаляем экземпляры предыдущих элементов
     */
    remove(prevPointComponent);
    remove(prevPointEditComponent);

  }

  /**
   * метод удаления точки маршрута
   */
  #destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}

