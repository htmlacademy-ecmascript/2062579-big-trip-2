import { RenderPosition, render } from '../framework/render.js';
import TripInfoSectionView from '../view/trip-info-container-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';

export default class TripInfoView {
  #infoSection = new TripInfoSectionView();
  #tripInfoContainer = null;
  #tripCosts = null;
  #tripInfoDestinationeNames = null;

  constructor({tripInfoContainer, tripCosts, tripInfoDestinationeNames}) {
    this.#tripInfoContainer = tripInfoContainer; // получаем контейнер, в который будет вставлен блок Инфо
    this.#tripCosts = tripCosts; // получаем общую стоимость
    this.#tripInfoDestinationeNames = tripInfoDestinationeNames;
  }

  init() {
    render(this.#infoSection, this.#tripInfoContainer, RenderPosition.AFTERBEGIN); // создаем секцию для Инфо в контейнере

    render(new TripInfoMainView(this.#tripInfoDestinationeNames), this.#infoSection.element, RenderPosition.AFTERBEGIN); // вставляем основные данные из инфо в начало секции

    render(new TripInfoCostView(this.#tripCosts), this.#infoSection.element); // вставляем стоимость из инфо
  }
}
