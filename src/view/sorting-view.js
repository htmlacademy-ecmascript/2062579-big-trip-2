import AbstractView from '../framework/view/abstract-view.js';
import { SortingTypes } from '../utils/utils.js';

const createSortingItemTemplate = (type) => `<div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"
    data-sort-type="${type}"
    ${type === 'day' ? 'checked' : ''}
    ${type === 'event' || type === 'offer' ? 'disabled' : ''}
    >
    <label class="trip-sort__btn" for="sort-${type}">${type}${type === 'offer' ? 's' : ''}</label>
  </div>`;

const createSortingTemplate = () => {
  const sortingItemTemplate = Object.values(SortingTypes).map((type) => createSortingItemTemplate(type)).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingItemTemplate}
    </form>`;
};

export default class SortingView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.classList.contains('trip-sort__input')) { // проверка, что кликнули именно по чекбоксу
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };

  get template() {
    return createSortingTemplate();
  }
}
