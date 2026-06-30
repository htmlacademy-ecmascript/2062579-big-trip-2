import { getRandomArrayElement } from '../utils.js';

const mockPrices = [5, 10, 20, 30, 40, 45, 50, 75, 90, 95, 100, 105, 115, 120, 150, 175, 200, 250, 300];

const mockPoints = [
  {
    id: 'sadsdf-6516',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-05-09T11:22:33.444Z',
    dateTo: '2026-05-09T11:52:35.666Z',
    destination: 'ljuccr-6492', // связать с набором mockDestinations по ключу
    isFavorite: false,
    offers: [
      'dfg-123',
      'ase-654',
      'kjb-987'
    ], // связать с набором mockOffers по ключу
    type: 'taxi' // допустимый список: taxi┃bus┃train┃ship┃drive┃flight┃check-in┃sightseeing┃restaurant
  },
  {
    id: 'jhklkl-5552',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-05-10T09:00:33.444Z',
    dateTo: '2026-05-10T10:15:35.666Z',
    destination: 'ljuccr-6492',
    isFavorite: true,
    offers: [
      'erwr-63',
      'retr-14',
      'kyuk-82'
    ],
    type: 'sightseeing'
  },
  {
    id: 'dlgfjo-6482',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-05-21T23:00:33.444Z',
    dateTo: '2026-05-22T08:00:35.666Z',
    destination: 'asasdd-2591',
    isFavorite: true,
    offers: [
      'weqd-95',
      'asdd-87',
      'erer-79'
    ],
    type: 'train'
  },
  {
    id: 'leryhn-7965',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-06-30T10:30:33.444Z',
    dateTo: '2026-06-30T11:05:35.555Z',
    destination: 'egaflk-6797',
    isFavorite: false,
    offers: [
      'dwq-632',
      'okj-655'
    ],
    type: 'bus'
  },
  {
    id: 'weweff-4682',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-07-10T15:00:33.444Z',
    dateTo: '2026-07-10T18:00:35.555Z',
    destination: 'egaflk-6797',
    isFavorite: true,
    offers: [
      'iuouio-625',
      'wwqewe-147',
      'yuiyui-951'
    ],
    type: 'restaurant'
  },
  {
    id: 'sdlkvb-4655',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-07-21T22:00:33.444Z',
    dateTo: '2026-07-22T04:00:35.555Z',
    destination: 'rhtfgd-3213',
    isFavorite: false,
    offers: [
      'das-981',
      'nvb-235'
    ],
    type: 'flight'
  },
  {
    id: 'eszesz-0987',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-09-01T09:00:33.444Z',
    dateTo: '2026-09-01T10:00:35.666Z',
    destination: 'rhtfgd-3213',
    isFavorite: true,
    offers: [
      'hjkh-32'
    ],
    type: 'check-in'
  },
  {
    id: 'woinok-9475',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-09-30T10:30:33.444Z',
    dateTo: '2026-09-30T11:35:35.555Z',
    destination: 'ojnojn-9519',
    isFavorite: false,
    offers: [
      'dwq-632',
      'okj-655'
    ],
    type: 'bus'
  },
  {
    id: 'sdfrgs-4578',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-10-05T18:00:33.444Z',
    dateTo: '2026-10-05T21:00:35.555Z',
    destination: 'werrer-5464',
    isFavorite: true,
    offers: [
      'iuouio-625',
      'wwqewe-147',
      'yuiyui-951'
    ],
    type: 'restaurant'
  },
  {
    id: 'hygfsd-5265',
    basePrice: getRandomArrayElement(mockPrices),
    dateFrom: '2026-12-25T12:13:33.444Z',
    dateTo: '2026-12-25T15:41:35.555Z',
    destination: 'werrer-5464',
    isFavorite: true,
    offers: [
      'das-981',
      'nvb-235'
    ],
    type: 'flight'
  },
];

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint };
