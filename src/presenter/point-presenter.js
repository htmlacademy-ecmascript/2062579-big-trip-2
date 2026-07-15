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

  /**
   * метод рендеринга точки
   */
  #renderPoint() { // метод отрисовки точки маршрута или формы редактирования этой точки
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

    const pointComponent = new PointView(this.#point, this.#destinations, this.#offers, onEditClick);

    const pointEditComponent = new EditPointView(this.#point, this.#destinations, this.#offers, onCloseClick, onFormSubmit);

    function replacePointToEdit() { // функция замены точки на форму редактирования
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditToPoint() { // функция замены формы редактирования на точку
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsList.element);
  }

  init() {
    this.#renderPoint();
  }
}

