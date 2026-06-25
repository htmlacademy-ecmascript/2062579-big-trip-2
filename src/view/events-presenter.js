import PointsListView from './points-list-view.js';
import AddNewPointView from './add-new-point-view.js';
import EditPointView from './edit-point-view.js';
import PointView from './point-view.js';
import { RenderPosition, render } from '../render.js';

export default class EventsPresenter {
  eventsPoint = new PointView(); // точка маршрута
  pointsList = new PointsListView(); // список для точек маршрута

  constructor({pointsListContainer}) {
    this.pointsListContainer = pointsListContainer; // получаем контейнер, в который будет вставлен список точек
  }

  init() {
    render(this.pointsList, this.pointsListContainer); // вставляем список в контейнер

    for(let i = 0; i < 3; i++) {
      render(new PointView(), this.pointsList.getElement()); // добавляем в список три точки
    }

    render(new EditPointView(), this.pointsList.getElement(), RenderPosition.AFTERBEGIN); // вставляем в начало списка форму редактирования точки
    render(new AddNewPointView(), this.pointsList.getElement()); // вставляем в список форму добавления новой точки
  }
}
