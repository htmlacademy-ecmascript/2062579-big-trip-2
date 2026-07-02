import { RenderPosition, render } from '../render.js';
import TripInfoSectionView from '../view/trip-info-container-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';

export default class TripInfoView {
  infoSection = new TripInfoSectionView();

  constructor({tripInfoContainer}) {
    this.tripInfoContainer = tripInfoContainer; // получаем контейнер, в который будет вставлен блок Инфо
  }

  init() {
    render(this.infoSection, this.tripInfoContainer, RenderPosition.AFTERBEGIN); // создаем секцию для Инфо в контейнере

    render(new TripInfoMainView(), this.infoSection.getElement(), RenderPosition.AFTERBEGIN); // вставляем основные данные из инфо в начало секции

    render(new TripInfoCostView(), this.infoSection.getElement()); // вставляем стоимость из инфо
  }
}
