const mockOffers = [
  {
    type: 'taxi', // допустимый список: taxi┃bus┃train┃ship┃drive┃flight┃check-in┃sightseeing┃restaurant
    offers: [
      {
        id: 'dfg-123',
        title: 'Upgrade to business class',
        price: 20
      },
      {
        id: 'ase-654',
        title: 'Baby seat',
        price: 10
      },
      {
        id: 'kjb-987',
        title: 'Choice of music',
        price: 50
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'dwq-632',
        title: 'Neck pillow',
        price: 10
      },
      {
        id: 'okj-655',
        title: 'Window seat',
        price: 15
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'weqd-95',
        title: 'Window seat',
        price: 25
      },
      {
        id: 'asdd-87',
        title: 'Upper berth',
        price: 30
      },
      {
        id: 'erer-79',
        title: 'Lower berth',
        price: 50
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'qwds-22',
        title: 'Motion sickness remedy',
        price: 100
      },
      {
        id: 'qazz-65',
        title: 'Insurance against drowning',
        price: 300
      },
    ]
  },
  {
    type: 'drive',
    offers: []
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'das-981',
        title: 'Additional baggage volume',
        price: 100
      },
      {
        id: 'nvb-235',
        title: 'Return ticket',
        price: 200
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'hjkh-32',
        title: 'No queue',
        price: 15
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'erwr-63',
        title: 'Binoculars',
        price: 20
      },
      {
        id: 'retr-14',
        title: 'Umbrella',
        price: 10
      },
      {
        id: 'kyuk-82',
        title: 'Excursion',
        price: 15
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'iuouio-625',
        title: 'Order music',
        price: 10
      },
      {
        id: 'wwqewe-147',
        title: 'Special menu',
        price: 50
      },
      {
        id: 'yuiyui-951',
        title: 'Book a table',
        price: 100
      }
    ]
  },
];

export { mockOffers };
