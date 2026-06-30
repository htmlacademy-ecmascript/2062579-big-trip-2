const mockOffers = [
  {
    type: 'taxi', // допустимый список: taxi┃bus┃train┃ship┃drive┃flight┃check-in┃sightseeing┃restaurant
    offers: [
      {
        id: 'dfg-123',
        title: 'Повысить до бизнес-класса',
        price: 20
      },
      {
        id: 'ase-654',
        title: 'Детское сиденье',
        price: 10
      },
      {
        id: 'kjb-987',
        title: 'Музыка на выбор',
        price: 50
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'dwq-632',
        title: 'Подушка на шею',
        price: 10
      },
      {
        id: 'okj-655',
        title: 'Место у окна',
        price: 15
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'weqd-95',
        title: 'Место у окна',
        price: 25
      },
      {
        id: 'asdd-87',
        title: 'Верхняя полка',
        price: 30
      },
      {
        id: 'erer-79',
        title: 'Нижняя полка',
        price: 50
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'qwds-22',
        title: 'Средство от укачивания',
        price: 100
      },
      {
        id: 'qazz-65',
        title: 'Страховка от потопления',
        price: 300
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 'jklj-97',
        title: 'Спортивное авто',
        price: 40
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'das-981',
        title: 'Дополнительный объем багажа',
        price: 100
      },
      {
        id: 'nvb-235',
        title: 'Возвратный билет',
        price: 200
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'hjkh-32',
        title: 'Без очереди',
        price: 15
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'erwr-63',
        title: 'Бинокль',
        price: 20
      },
      {
        id: 'retr-14',
        title: 'Зонтик',
        price: 10
      },
      {
        id: 'kyuk-82',
        title: 'Экскурсия"',
        price: 15
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'iuouio-625',
        title: 'Заказать музыку',
        price: 10
      },
      {
        id: 'wwqewe-147',
        title: 'Особое меню',
        price: 50
      },
      {
        id: 'yuiyui-951',
        title: 'Забронировать столик',
        price: 100
      }
    ]
  },
];

export { mockOffers };
