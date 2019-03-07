import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  info = [
    // {
    //   destination: 1,
    //   value: '1890700',
    //   display: 'AB Alojamientos Puerto Madryn',
    //   key: '1890700',
    //   location: {
    //     country: 'AR',
    //     city: 'Puerto Madryn',
    //     __typename: 'Location'
    //   },
    //   disp:
    //     'AB Alojamientos Puerto Madryn - [hotel in Puerto Madryn - (AR) - (1890700)]',
    //   focused: false
    // },
    // {
    //   destination: 2,
    //   value: '3307084',
    //   display: 'Ac Hotel By Marriott Madison Downtown',
    //   key: '3307084',
    //   location: { country: 'US', city: 'Madison - Wi', __typename: 'Location' },
    //   disp:
    //     'Ac Hotel By Marriott Madison Downtown - [hotel in Madison - Wi - (US) - (3307084)]',
    //   focused: false
    // },
    {
      destination: 3,
      value: '81925',
      display: 'Ac Hotel Madrid Feria By Marriott',
      key: '81925',
      location: { country: 'ES', city: 'Madrid', __typename: 'Location' },
      disp:
        'Ac Hotel Madrid Feria By Marriott - [hotel in Madrid - (ES) - (81925)]',
      focused: false
    },
    {
      destination: false,
      value: '2456195',
      display: 'Acta Madfor Hotel',
      key: '2456195',
      location: { country: 'ES', city: 'Madrid', __typename: 'Location' },
      disp: 'Acta Madfor Hotel - [hotel in Madrid - (ES) - (2456195)]',
      focused: false
    },
    {
      destination: false,
      value: '3302389',
      display: "Agriturismo Masseria Madonna Dell'arco",
      key: '3302389',
      location: {
        country: 'IT',
        city: 'Martina Franca Taranto',
        __typename: 'Location'
      },
      disp:
        "Agriturismo Masseria Madonna Dell'arco - [hotel in Martina Franca Taranto - (IT) - (3302389)]",
      focused: false
    },
    {
      destination: 5,
      value: '3692073',
      display: 'Airy Ahmad Yani Km 7,6 Banjarmasin',
      key: '3692073',
      location: { country: 'ID', city: 'Banjarmasin', __typename: 'Location' },
      disp:
        'Airy Ahmad Yani Km 7,6 Banjarmasin - [hotel in Banjarmasin - (ID) - (3692073)]',
      focused: false
    },
    {
      destination: 'HOLA',
      value: '3692263',
      display: 'Airy Bandara Ahmad Yani Semarang',
      key: '3692263',
      location: { country: 'ID', city: 'Semarang', __typename: 'Location' },
      disp:
        'Airy Bandara Ahmad Yani Semarang - [hotel in Semarang - (ID) - (3692263)]',
      focused: false
    },
    {
      destination: 1,
      value: '3692092',
      display: 'Airy Grage City Ahmad Yani 39 Cirebon',
      key: '3692092',
      location: { country: 'ID', city: 'Cirebon', __typename: 'Location' },
      disp:
        'Airy Grage City Ahmad Yani 39 Cirebon - [hotel in Cirebon - (ID) - (3692092)]',
      focused: false
    },
    {
      destination: '',
      value: '3322276',
      display: 'EMPTY DEST 1',
      key: '3322276',
      location: {
        country: 'ID',
        city: 'Palangka Raya',
        __typename: 'Location'
      },
      disp:
        'Airy Langkai Ahmad Yani 51 Palangkaraya - [hotel in Palangka Raya - (ID) - (3322276)]',
      focused: false
    },
    {
      destination: '',
      value: '3323212',
      display: 'EMPTY DEST 2',
      key: '3323212',
      location: { country: 'ID', city: 'Singkawang', __typename: 'Location' },
      disp:
        'Airy Singkawang Barat Ahmad Yani Graha Wahana - [hotel in Singkawang - (ID) - (3323212)]',
      focused: false
    },
    {
      destination: false,
      value: '3694023',
      display: 'Al Eairy Furnished Apts Al Madinah 6',
      key: '3694023',
      location: {
        country: 'SA',
        city: 'Al Madinah Al Munawwarah',
        __typename: 'Location'
      },
      disp:
        'Al Eairy Furnished Apts Al Madinah 6 - [hotel in Al Madinah Al Munawwarah - (SA) - (3694023)]',
      focused: false
    },
    {
      destination: false,
      value: '1326352',
      display: 'Al Madinah Harmony Hotel',
      key: '1326352',
      location: {
        country: 'SA',
        city: 'Al Madinah Al Munawwarah',
        __typename: 'Location'
      },
      disp:
        'Al Madinah Harmony Hotel - [hotel in Al Madinah Al Munawwarah - (SA) - (1326352)]',
      focused: false
    },
    {
      destination: false,
      value: '2069373',
      display: 'Al Madinah Harmony Hotel',
      key: '2069373',
      location: {
        country: 'SA',
        city: 'Al Madinah Al Munawwarah',
        __typename: 'Location'
      },
      disp:
        'Al Madinah Harmony Hotel - [hotel in Al Madinah Al Munawwarah - (SA) - (2069373)]',
      focused: false
    },
    {
      destination: false,
      value: '3140180',
      display: 'Al Madrigale',
      key: '3140180',
      location: {
        country: 'IT',
        city: 'Galatone Lecce',
        __typename: 'Location'
      },
      disp: 'Al Madrigale - [hotel in Galatone Lecce - (IT) - (3140180)]',
      focused: true
    }
  ];

  groupConfig = new Map([
    [
      <any>1,
      {
        title: 'Hotels',
        display: function(item) {
          return `${item.display} - [hotel in ${item.location.city} - (${
            item.location.country
          }) - (${item.value})]`;
        },
        limit: 2
      }
    ],
    [
      2,
      {
        title: 'Destinations',
        display: function(item) {
          return `${item.display} - (${item.value})`;
        },
        limit: 2
      }
    ],
    [
      3,
      {
        title: 'Prueba',
        display: function(item) {
          return `${item.display} - (${item.value})`;
        },
        limit: 2
      }
    ],
    [
      false,
      {
        title: false,
        display: function(item) {
          return `${item.display} - (${item.value})`;
        },
        limit: 2
      }
    ],
    [
      '',
      {
        title: 'Empty',
        display: function(item) {
          return `${item.display} - (${item.value})`;
        },
        limit: 2
      }
    ]
  ]);

  onKeyUpEvent(e) {
    console.log(e);
  }
  onItemSelected(e) {
    console.log(e);
  }
}
