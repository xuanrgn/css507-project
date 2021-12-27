import { compactInteger } from "../DatePicker/FormaterNum";

export var chart_colors_OA_status = [
  "rgba(14,101,26,0.83)",
  "rgba(255,45,93,0.5)",
  "rgba(101,15,15,0.83)",
  "rgb(141,13,122)",
  "rgba(16,25,101,0.83)",
  "rgb(191,98,28)",
  "rgb(252,252,252)",
  "rgb(0,0,0)",
];

export const CrimeLineChart_Line_Dataset = {
  labels: ["10.10", "11.10", "12.10", "13.10", "14.10", "15.10", "16.10"],
  datasets: [
    {
      label: "Алатауский район",
      data: [1, 5, 7, 4, 2, 4, 7],
      lineTension: 0,
      fill: 0,
      borderColor: "rgba(101,15,15,0.5)",
      backgroundColor: "transparent",
      pointBackgroundColor: "rgba(101,15,15,1)",
      pointBorder: 3,
      pointBorderColor: "rgba(101,15,15,0.5)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
    {
      label: "Алмалинский район ",
      backgroundColor: "transparent",
      data: [2, 6, 8, 5, 3, 5, 8],
      lineTension: 0,
      fill: 0,
      borderColor: "rgba(16,25,101,0.83)",
      pointBackgroundColor: "rgba(16,25,101,0.83)",
      pointBorder: 3,
      pointBorderColor: "rgba(30,19,101,0.83)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
    {
      label: "Ауэзовский район ",
      backgroundColor: "transparent",
      data: [0, 4, 6, 3, 1, 2, 6],
      lineTension: 0,
      fill: 0,
      borderColor: "rgba(14,101,26,0.83)",
      pointBackgroundColor: "rgba(14,101,26,0.83)",
      pointBorder: 3,
      pointBorderColor: "rgba(21,101,13,0.83)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
    {
      label: "Бостандыкский район ",
      backgroundColor: "transparent",
      data: [0, 0, 1, 2, 2, 1, 0],
      lineTension: 0,
      fill: 0,
      borderColor: "rgba(255,45,93,0.5)",
      pointBackgroundColor: "rgba(255,45,93,0.5)",
      pointBorder: 3,
      pointBorderColor: "rgba(255,45,93,0.5)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
    {
      label: "Жетысуский район ",
      backgroundColor: "transparent",
      data: [1, 2, 3, 4, 5, 6, 7],
      lineTension: 0,
      fill: 0,
      borderColor: "rgb(0,0,0)",
      pointBackgroundColor: "rgb(0,0,0)",
      pointBorder: 3,
      pointBorderColor: "rgb(0,0,0)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
    {
      label: "Наурызбайский район ",
      backgroundColor: "transparent",
      data: [7, 6, 5, 4, 3, 2, 1],
      lineTension: 0,
      fill: 0,
      borderColor: "rgb(51,96,145)",
      pointBackgroundColor: "rgb(51,96,145)",
      pointBorder: 3,
      pointBorderColor: "rgb(51,96,145)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
    {
      label: "Турксибский район ",
      backgroundColor: "transparent",
      data: [8, 8, 7, 7, 6, 6, 5],
      lineTension: 0,
      fill: 0,
      borderColor: "rgb(141,16,135)",
      pointBackgroundColor: "rgb(141,16,135)",
      pointBorder: 3,
      pointBorderColor: "rgb(141,13,122)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
    {
      label: "Медеуский район ",
      backgroundColor: "transparent",
      data: [8, 2, 1, 1, 3, 4, 1],
      lineTension: 0,
      fill: 0,
      borderColor: "rgb(122,37,11)",
      pointBackgroundColor: "rgb(122,37,11)",
      pointBorder: 3,
      pointBorderColor: "rgb(122,37,11)",
      pointRadius: 5,
      pointHoverRadius: 5,
      pointHitRadius: 5,
    },
  ],
};
var chart_appeal_OA_status = [
  "Ауэзовский район",
  "Бостандыкский",
  "Алатауский",
  "Медеуский",
  "Алмалинский",
  "Турксибский",
  "Наурызбайский",
  "Жетысуский",
  "Не указан",
];
export var chart_appeal_OA_status = [
  "Ауэзовский район",
  "Бостандыкский район",
  "Алатауский район",
  "Медеуский район",
  "Алмалинский район",
  "Турксибский район",
  "Наурызбайский район",
  "Жетысуский район",
  "Не указан",
];

export const CrimeLineChart_Line_option = {
  title: {
    display: false,
    text: "Кол-во преступлений по районам",
    fontColor: "white",
    fontSize: "14",
  },
  legend: {
    display: true,
    position: "top",
    fullWidth: false,
    labels: {
      align: "start",
      boxWidth: 10,
      fontColor: "rgba(255,255,255,1)",
    },
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "rgba(255,255,255,0.5)", // this here
          fontSize: 10,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: "rgba(255,255,255,0.5)", // this here
          fontSize: 10,
          // max: total,
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
};

export const CrimeLineChart_Bar_Dataset = {
  labels: ["01.08.19", "01.09.19", "01.10.19", "01.11.19"],
  datasets: [
    {
      label: "Исполнение",
      backgroundColor: "#7ed321",
      data: [292516832500, 343247215700, 394123726600, 444726712800],
      /*fontSize: '22'*/
    },
    {
      label: "План по платежам",
      backgroundColor: "#4cbea9",
      data: [294371705400, 350197889200, 401174856500, 453950067600],
      /*fontSize: '22'*/
    },
  ],
};
export const CrimeLineChart_Bar_option = {
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var label =
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || "";
        return compactInteger(label, 2);
      },
    },
  },
  legend: {
    display: true,
    position: "top",
    labels: {
      boxWidth: 50,
      fontColor: "rgba(255,255,255,0.5)",
      fontSize: 14,
    },
    onClick: function (e, t) {
      var n = t.datasetIndex,
        r = this.chart,
        o = null !== r.getDatasetMeta(n).hidden && r.getDatasetMeta(n).hidden;
      r.data.datasets.forEach(function (e, t) {
        var a = r.getDatasetMeta(t);
        t !== n
          ? o
            ? null === a.hidden && (a.hidden = !0)
            : (a.hidden = null === a.hidden ? !a.hidden : null)
          : t === n && (a.hidden = null);
      });
      r.update();
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  responsive: true,
  maintainAspectRatio: true,
  /* layout: {
             padding: 20,
         },*/
  /*legend: {display: false},*/
  title: {
    display: false,
    fontColor: "white",
  },
  scales: {
    reverse: false,
    scaleLabel: {
      display: true,
      /* fontSize : 8,*/
      /* fontColor: "#4a4a4a"*/
    },
    xAxes: [
      {
        /* barPercentage: 0.5,*/
        ticks: {
          fontColor: "rgba(255,255,255,1)", // this here
          /*fontSize: 14,*/
          min: 0,
          stepSize: 100,
        },
        fontColor: "white",
        /* stacked: true,*/
      },
    ],
    yAxes: [
      {
        /*afterFit: function(scale) {
                                scale.height = 350  // уменьшает размер места под У метки
                            },*/
        /*  barPercentage: 0.5,// - задает ширину колонки ( в минус)
                              categoryPercentage: 1,// - задает ширину колонки ( в минус)*/
        ticks: {
          callback: function (label, index, labels) {
            return compactInteger(label);
          },
          /*suggestedMin: 50,
                                    suggestedMax: 100,*/
          fontColor: "rgba(255,255,255,1)", // цвет меток по ч или у
          /*      fontSize: 22,*/
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      formatter: function (value, ctx) {
        return compactInteger(value);
        /*return 'Всего:' + value + ' \nДетей:' + cvvt_b[ctx.dataIndex];*/
      },
      /* backgroundColor:'rgba(0,0,0,0.26)' ,*/
      align: "end",
      anchor: "start",
      rotation: -90,
      clamp: true,
      /* borderColor: 'rgb(255,255,255)',
                         borderRadius: 2,
                         borderWidth: 1,*/
      color: "rgb(255,255,255)",
      padding: 2,
      font: function (context) {
        let w = context.chart.width;
        let custom_size = [
          [810, 12],
          [710, 10],
          [550, 5],
          [500, 5],
        ];
        let default_size = 14;
        for (let i = 0; i < custom_size.length; i++) {
          if (w < custom_size[i][0]) {
            default_size = custom_size[i][1];
          }
        }
        return {
          size: default_size,
        };
      },
    },
  },
};

export const CrimeLineChart_Doughnut_Dataset = {
  labels: ["Дефицит", "Норма", "Профицит"],
  datasets: [
    {
      label: "# of Votes",
      data: [25, 25, 25],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 0,
    },
  ],
};
export const CrimeLineChart_Doughnut_option = {
  responsive: false,
  title: {
    display: true,
    text: "Заполненость  186",
    fontColor: "white",
    fontSize: "22",
  },
  /*  tooltips: {
              mode: false,
              callbacks: {
                  title: function() {},
                  label: function() {}
              }
          },*/
  legend: {
    position: "left",
    labels: {
      // переопределение цвета шрифта
      fontColor: "white",
    },
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          drawOnChartArea: false,
          display: false,
        },
        ticks: {
          display: false,
          beginAtZero: false,
        },
      },
    ],
    yAxes: [
      {
        display: false,
        gridLines: {
          drawOnChartArea: false,
          display: false,
        },
        ticks: {
          display: false,
          beginAtZero: false,
        },
      },
    ],
  },
};

export const CrimeLineChart_Pie_Dataset = {
  labels: ["Дефицит", "Норма", "Профицит"],
  datasets: [
    {
      label: "# of Votes",
      data: [25, 25, 25],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 0,
    },
  ],
};
export const CrimeLineChart_Pie_option = {
  responsive: false,
  title: {
    display: true,
    text: "Заполненость  186",
    fontColor: "white",
    fontSize: "22",
  },
  /*  tooltips: {
              mode: false,
              callbacks: {
                  title: function() {},
                  label: function() {}
              }
          },*/
  legend: {
    position: "left",
    labels: {
      // переопределение цвета шрифта
      fontColor: "white",
    },
  },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          drawOnChartArea: false,
          display: false,
        },
        ticks: {
          display: false,
          beginAtZero: false,
        },
      },
    ],
    yAxes: [
      {
        display: false,
        gridLines: {
          drawOnChartArea: false,
          display: false,
        },
        ticks: {
          display: false,
          beginAtZero: false,
        },
      },
    ],
  },
};


var chart_appeal_OA_data = [
  8932,
  8105,
  6755,
  5640,
  5457,
  4447,
  4197,
  1817,
  17783,
];

export const CrimeLineChart_HorizontalBar_Dataset = {
  labels: chart_appeal_OA_status,
  datasets: [
    {
      label: "Преступлений ",
      backgroundColor: "#e9c167ad",
      data: chart_appeal_OA_data,
    },
  ],
};
export const CrimeLineChart_HorizontalBar_option = {
  legend: {
    display: false,
  },
  layout: {},
  responsive: true,
  maintainAspectRatio: true,
  title: {
    display: false,
  },
  scales: {
    reverse: false,
    scaleLabel: {
      display: true,
      /* fontSize : 8,*/
      /* fontColor: "#4a4a4a"*/
    },
    xAxes: [
      {
        /* barPercentage: 0.5,*/
        ticks: {
          display: true,
          fontColor: "rgba(255,255,255,1)", // this here
          /*fontSize: 14,*/
        },
        fontColor: "white",
        /* stacked: true,*/
      },
    ],
    yAxes: [
      {
        ticks: {
          display: false,
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      align: "end",
      anchor: "start",
      clamp: true,
      color: "rgb(255,255,255)",
      padding: 5,
      formatter: function (value, ctx2) {
        return chart_appeal_OA_status[ctx2.dataIndex] + " - " + value;
      },
      font: function (context) {
        let w = context.chart.width;
        let custom_size = [
          /* [810, 12],
                       [710, 10],
                       [550, 5],
                       [500, 0]*/
        ];
        let default_size = 14;
        for (let i = 0; i < custom_size.length; i++) {
          if (w < custom_size[i][0]) {
            default_size = custom_size[i][1];
          }
        }
        return {
          size: default_size,
        };
      },
    },
  },
};
/*----------------------------------------------------*/
export const policeDepartment = [
  "Выбрать все",
  "Алмалинский район Прокуратура",
  "Ауэзовский район Прокуратура",
  "Бостандыкский район Прокуратура",
  "г.Алматы КНБ",
  "г.Алматы Прокуратура",
  "ДВД города Алматы",
  "Департамент АДГС и ПК по городу Алматы",
  "Департамент государственных доходов по г.Алматы",
];
export const articleCrimes = [
  "Выбрать все",
  "Вымогательство",
  " Грабеж",
  "Доведение до самоубийства",
  "Изнасилование",
  "Контрабанда изъятых из обращения предметов или предметов, обращение которых ограничено",
  "Кража",
  "Мелкое хищение",
  "Мошенничество",
];
export const categoryCrime = [
  "небольшой",
  "средней",
  " тяжкие",
  "особо тяжкие",
];

export const crimeTable = [
  {
    date: "10.10.10",
    district: "Алатауский район",
    street: "проспект Абая",
    building: "90",
    crime: "кража из холодильника в особо крупном размере",
    categoryCrime: "4",
    policeDepartment: "УПК Алатауского района",
  },
  {
    date: "15.10.10",
    district: "Алатауский район",
    street: "ул. Гагарина",
    building: "112",
    crime: "Переход в неположеном месте",
    categoryCrime: "1",
    policeDepartment: "УПК Алатауского района",
  },
  {
    date: "20.10.10",
    district: "Бостандыкский район",
    street: "ул. Кожмуханова",
    building: "22",
    crime: "Распространение наркотических веществ",
    categoryCrime: "2",
    policeDepartment: "УПК Бостандыкского района",
  },
  {
    date: "12.10.10",
    district: "Жетысуйский район",
    street: "ул. Фурмонова",
    building: "11",
    crime:
      "Организация или содержание притонов для занятия проституцией и сводничество",
    categoryCrime: "3",
    policeDepartment: "ДВД города Алматы",
  },
  {
    date: "10.10.10",
    district: "Алатауский район",
    street: "ул. Курмангазы",
    building: "89",
    crime: "кража",
    categoryCrime: "1",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
  {
    date: "10.10.10",
    district: "Медеуский район",
    street: "ул. Макатаева",
    building: "99",
    crime: "Мошенничество",
    categoryCrime: "2",
    policeDepartment: "РУВД Турксибского района",
  },
];

/*-------------------дорожные происшествия-------------*/
export const RoadAccidentDateTime = ["День", "Ночь", "Сумерки"];
export const RoadAccidentTransportType = ["Частный", "Общественный"];
export const RoadAccidentLocation = [
  "Перекресток регулируемый",
  "Перекресток нерегулируемый",
];
export const RoadAccidentCrime = [
  "превышение скорости, установленной ПДД или дорожными знакам",
  "перевозки людей",
  "несоблюдение очередности проезда нарушение правил проезда перекрестков",
  "несоблюдение дистанции",
  "проезда пешеходных переходов",
];
export const RoadAccidentDriverStatus = [
  "Трезвый",
  "Время непрерывного нахождения в пути",
  "алкогольное опьянение",
];
export const RoadAccidentDriverPerpetrator = [
  "скрывшийся с места ДТП",
  "имеющий водительские права, соответсвующей категории ТС",
  "иностранное лицо/лицо без гражданства",
];
export const RoadAccidentDriverCategory = ["A", "B", "C", "D", "E"];
export const RoadAccidentTableData = [
  {
    date: "10.10.10",
    district: "Алатауский район",
    spot: "Регулируемый перекресток",
    timeDay: "День",
    crime: "Маневрирования",
    driver: "трезвый",
    culprit: "скрывшийся с места ДТП",
    category: "B",
    transportType: "частный",
  },
  {
    date: "20.10.10",
    district: "Бостандыкский район",
    spot: "Регулируемый перекресток",
    timeDay: "Сумерки",
    crime: "Маневрирования",
    driver: "",
    culprit: "иностранное лицо/лицо без гражданства",
    category: "B, C",
    transportType: "Общественный",
  },
  {
    date: "30.10.10",
    district: "Медеуский район",
    spot: "Регулируемый перекресток",
    timeDay: "Ночь",
    crime: "Маневрирования",
    driver: "",
    culprit: "скрывшийся с места ДТП",
    category: "A1, B",
    transportType: "частный",
  },
  {
    date: "12.10.10",
    district: "Алатауский район",
    spot: "Регулируемый перекресток",
    timeDay: "Ночь",
    crime: "Маневрирования",
    driver: "трезвый",
    culprit: "иностранное лицо/лицо без гражданства",
    category: "B, B",
    transportType: "частный",
  },
  {
    date: "13.10.10",
    district: "Медеуский район",
    spot: "Регулируемый перекресток",
    timeDay: "День",
    crime: "Маневрирования",
    driver: "трезвый",
    culprit: "скрывшийся с места ДТП",
    category: "B, C",
    transportType: "Общественный",
  },
  {
    date: "14.10.10",
    district: "Жамбыльский район",
    spot: "Регулируемый перекресток",
    timeDay: "Сумерки",
    crime: "Маневрирования",
    driver: "алкогольное опьянение",
    culprit: "имеющий водительские права, соответсвующей категории ТС",
    category: "B, C",
    transportType: "частный",
  },
  {
    date: "15.10.10",
    district: "Турксибский район",
    spot: "Регулируемый перекресток",
    timeDay: "День",
    crime: "Маневрирования",
    driver: "Время непрерывного нахождения в пути",
    culprit: "имеющий водительские права, соответсвующей категории ТС",
    category: "B, C",
    transportType: "Общественный",
  },
];
