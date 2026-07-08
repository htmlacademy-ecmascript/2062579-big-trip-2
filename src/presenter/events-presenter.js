import PointsListView from '../view/points-list-view.js';
// import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';

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

    render(this.#pointsList, this.#pointsListContainer); // вставляем список в контейнер

    for(let i = 1; i < this.#eventsPoints.length; i++) {
      this.#renderPoint(this.#eventsPoints[i], this.#destinations, this.#offers);
    }
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onEditClick = () => {
      replacePointToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const onCloseClick = () => {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const pointComponent = new PointView({point}, destinations, offers, onEditClick);

    const pointEditComponent = new EditPointView({point}, destinations, offers, onCloseClick);

    function replacePointToEdit() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsList.element);
  }
}
