import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';

export default class PointPresenter {
  #pointsList = null;
  #point = null;
  #destinations = [];
  #offers = [];

  constructor(point, destinations, offers, pointsList) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsList = pointsList;
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

  /**
   * метод рендеринга точки или формы редактирования этой точки
   */
  #renderPoint() {
    this.#pointComponent = new PointView(this.#point, this.#destinations, this.#offers, this.#onEditClick);

    this.#pointEditComponent = new EditPointView(this.#point, this.#destinations, this.#offers, this.#onCloseClick, this.#onFormSubmit);

    render(this.#pointComponent, this.#pointsList.element);
  }

  init() {
    this.#renderPoint();
  }
}

