import PointsListView from '../view/points-list-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { RenderPosition, render } from '../render.js';

export default class EventsPresenter {
  pointsList = new PointsListView(); // список для точек маршрута

  constructor({pointsListContainer, pointsModel}) {
    this.pointsListContainer = pointsListContainer; // получаем контейнер, в который будет вставлен список точек
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventsPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(this.pointsList, this.pointsListContainer); // вставляем список в контейнер

    for(let i = 1; i < this.eventsPoints.length; i++) {
      render(new PointView({point: this.eventsPoints[i]}, this.destinations, this.offers), this.pointsList.getElement()); // добавляем в список точки, начиная со второй - индекс [1]
    }

    render(new EditPointView({point: this.eventsPoints[0]}, this.destinations, this.offers), this.pointsList.getElement(), RenderPosition.AFTERBEGIN); // вставляем в начало списка форму редактирования точки
    render(new AddNewPointView(), this.pointsList.getElement()); // вставляем в список форму добавления новой точки
  }
}
