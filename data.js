let gapInAge = {
  data: {
    values: [
      { x: '1-10', y: 5000, table: [] },
      { x: '10-20', y: 15000, table: [] },
      { x: '20-30', y: 12000, table: [] },
      { x: '30-40', y: 18000, table: [] },
      { x: '40-50', y: 15603, table: [] },
      { x: '50-60', y: 12090, table: [] },
      { x: '65+', y: 9100, table: [] },
    ],
  },
  meta: {
    x_axis_label: 'Gap in Age',
    y_axis_label: 'Members',
    legends_name: [''],
    type: 'Members',
  },
  options: {},
};

let sacData = {
  data: {
    values: [
      {
        x: '2017',
        y: ['10204', '30204', '31204', '32204'],
        table: ['29204', '30204', '31204', '32204'],
      },
      {
        x: '2018',
        y: ['30498', '37498', '38498', '39498'],
        table: ['36498', '37498', '38498', '39498'],
      },
      {
        x: '2019',
        y: ['25998', '30204', '29204', '12204'],
        table: ['25998', '30204', '29204', '12204'],
      },
      {
        x: '2020',
        y: ['26000', '20204', '13204', '62204'],
        table: ['26000', '20204', '13204', '62204'],
      },
    ],
  },
  meta: {
    legends_name: 'Marriage Age',
    x_axis_label: 'Marriage Age Gap',
    y_axis_label: 'Members',
    type: 'Members',
  },
  options: {},
};
let multiLayerArea = {
  data: {
    values: [
      {
        x: '2017',
        y: [14156886.91, 4864423.95, 8023360.69, 8023360.69],
        table: [
          'Row Head',
          113990.02,
          273,
          57605.29,
          57,
          113995.02,
          280,
          57610.29,
          65,
        ],
      },
      {
        x: '2018',
        y: [28086451.49, 9623203.84, 14617167.38, 14617167.38],
        table: [
          'Row Head',
          161079.23,
          370,
          187565.88,
          65,
          161080.23,
          375,
          187565.88,
          70,
        ],
      },
      {
        x: '2019',
        y: [20227705.89, 19484033.04, 41475151.8, 19484033.04],
        table: [
          'Row Head',
          1003245.15,
          489,
          337986.71,
          78,
          1003246.15,
          490,
          437986.71,
          79,
        ],
      },
    ],
  },
  meta: {
    legends_name: [
      'JMPHOLDINGS MEMBERS WITH CARE GAPS MAIL ORDER PHARMACY USAGE',
      'JMPHOLDINGS EMERGING HIGH RISK V2',
      'JMPHOLDINGS MAILORDER DRUG USE',
      'JMPHOLDINGS PROMOTE MAIL ORDER PHARMACY USAGE',
    ],
    // "legends_name": [
    //   "JMPHOLDINGS MEMBERS",
    //   "PHARMACY ",
    //   "MAILORDER",
    //   "PROMOTE "
    // ],
    // "legends_name": [
    // "JMPHOLDINGS MEMBERS WITH CARE GAPS MAIL ORDER PHARMACY USAGE",
    // "JMPHOLDINGS EMERGING HIGH RISK V2",
    // "JMPHOLDINGS MAILORDER DRUG USE",
    //   "JMPHOLDINGS PROMOTE MAIL ORDER PHARMACY USAGE"
    // ],
    x_axis_label: [''],
    y_axis_label: ['Spend'],
    y_axis_unit: ['in thousand'],
    table_col_name: [
      'Head',
      'A Spend',
      'A Member Count',
      'B Spend',
      'B Member Count',
      'C Spend',
      'C Member Count',
      'D Spend',
      'D Member Count',
    ],
  },
  options: {
    show_tooltip: 'true',
    show_y_axis: 'true',
  },
};

let multiLayerArea2 = {
  data: {
    values: [
      {
        x: '2017',
        y: [1000, 2000, 3000, 4000],
      },
      {
        x: '2018',
        y: [1200, 2200, 3200, 4300],
      },
      {
        x: '2019',
        y: [1500, 2500, 3500, 4500],
      },
    ],
  },
  meta: {
    legends_name: [
      'JMPHOLDINGS_MEMBERS_WITH_CARE_GAPS',
      'JMPHOLDINGS_EMERGING_HIGH_RISK_V2',
      'JMPHOLDINGS_MAILORDER_DRUG_USE',
      'JMPHOLDINGS_PROMOTE_MAIL_ORDER_PHARMACY_USAGE',
    ],
    x_axis_label: [''],
    y_axis_label: ['Spend'],
    y_axis_unit: ['in thousand'],
  },
  options: {
    show_tooltip: 'true',
  },
};

let multiLayerArea1 = {
  data: {
    values: [
      {
        x: '2017',
        y: [14156886.91, 8023360.69, 8023360.69, 4864423.95],
      },
      {
        x: '2018',
        y: [28086451.49, 14617167.38, 14617167.38, 9623203.84],
      },
      {
        x: '2019',
        y: [41475151.8, 19484033.04, 19484033.04, 20227705.89],
      },
    ],
  },
  meta: {
    legends_name: [
      'JMPHOLDINGS_MEMBERS_WITH_CARE_GAPS',
      'JMPHOLDINGS_EMERGING_HIGH_RISK_V2',
      'JMPHOLDINGS_MAILORDER_DRUG_USE',
      'JMPHOLDINGS_PROMOTE_MAIL_ORDER_PHARMACY_USAGE',
    ],
    x_axis_label: [''],
    y_axis_label: ['Spend'],
    y_axis_unit: ['in thousand'],
  },
  options: {
    show_tooltip: 'false',
  },
};

let marriageData = {
  data: {
    values: [
      { x: '14-20', y: 40 },
      { x: '20-26', y: 20 },
      { x: '26-32', y: 30 },
      { x: '32-38', y: 10 },
      { x: '38-42', y: 40 },
      { x: '43+', y: 20 },
    ],
  },
  meta: {
    legends_name: 'Marriage Age',
    x_axis_label: 'Marriage Age Gap',
    y_axis_label: 'Members',
    type: 'Members',
  },
};

let typeOFHouse = {
  data: {
    values: [
      { x: 'Single Floor', y: 29204 },
      { x: 'Two Floor', y: 36498 },
      { x: 'Three Floor', y: 25998 },
      { x: 'Four Floor', y: 26000 },
    ],
  },
  meta: {
    legends_name: ['Single Floor', 'Two Floor', 'Three Floor', 'Four Floor'],
    x_axis_label: 'Type of House',
    y_axis_label: 'Count',
  },
  options: {},
};

let sourceOfWater = {
  data: {
    values: [
      { x: 'Tap Water', y: 29204 },
      { x: 'Pound Water', y: 36498 },
      { x: 'MUL Water', y: 25998 },
      { x: 'River Water', y: 26000 },
      { x: 'Eenar Water', y: 26000 },
      { x: 'Others', y: 2000 },
    ],
  },
  meta: {
    legends_name: [
      'Tap Water',
      'Pound Water',
      'MUL Water',
      'River Water',
      'Eenar Water',
      'Others',
    ],
    x_axis_label: 'Source Of Water',
    y_axis_label: 'Count',
    type: 'Count',
  },
  options: {},
};

let sourceOfFood = {
  data: {
    values: [
      { x: 'Kaath Daura', y: 29204 },
      { x: 'LP Gas', y: 36498 },
      { x: 'Gobar Gas', y: 25998 },
      { x: 'Electricity', y: 26000 },
      { x: 'Others', y: 2000 },
    ],
  },
  meta: {
    legends_name: [
      'Kaath Daura',
      'LP Gas',
      'MUL Water',
      'Electricity',
      'Others',
    ],
    x_axis_label: 'Source Of Food',
    y_axis_label: 'Count',
    type: 'Count',
  },
  options: {},
};

let zoomableLineArea = {
  data: {
    values: [
      {
        members: 240,
        x: '2017',
        y: 29204,
      },
      {
        members: 365,
        x: '2018',
        y: 36498,
      },
      {
        members: 350,
        x: '2019',
        y: 25998,
      },
      {
        members: 190,
        x: '2020',
        y: 26000,
      },
    ],
    name: '',
    table: [''],
  },
  meta: {
    legends_name: ['Benchmark', 'Actual Spend', 'Projected'],
    identifier: '',
    x_axis_label: [''],
    tooltips_name: ['Spend', 'Benchmark', 'Members'],
    y_axis_label: [''],
  },
  options: {
    x_axis_label: [''],
    table_col_name: [''],
    y_axis_label: [''],
    benchmark: 1200,
  },
};

let z5data = {
  data: {
    values: [
      {
        x: '2016-06',
        y: 317.94,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2016-07',
        y: 254.25,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2016-08',
        y: 319.61,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2016-09',
        y: 243.14,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2016-10',
        y: 200,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2016-11',
        y: 290.78,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2016-12',
        y: 264.17,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-01',
        y: 208.64,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-02',
        y: 238.21,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-03',
        y: 234.36,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-04',
        y: 260.79,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-05',
        y: 278.31,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-06',
        y: 317.04,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-07',
        y: 257.58,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-08',
        y: 320.39,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-09',
        y: 358.97,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-10',
        y: 316.74,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-11',
        y: 324.77,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2017-12',
        y: 375.05,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-01',
        y: 276.29,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-02',
        y: 385.18,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-03',
        y: 400.79,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-04',
        y: 283.53,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-05',
        y: 376.54,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-06',
        y: 396.56,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-07',
        y: 416.04,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-08',
        y: 474.99,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-09',
        y: 337.87,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-10',
        y: 421.68,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-11',
        y: 415.52,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2018-12',
        y: 346.08,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2019-01',
        y: 348.51,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2019-02',
        y: 316.06,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2019-03',
        y: 367.38,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2019-04',
        y: 381.93,
        table: ['54', '5332', '353', '535'],
      },
      {
        x: '2019-05',
        y: 414.58,
        table: ['54', '5332', '353', '535'],
      },
    ],
  },
  meta: {
    legends_name: ['Benchmark', 'Actual Cost'],
    identifier: '',
    x_axis_label: 'x_axis_label',
    color_field: ['#5a2f6d', '#ded5e2'],
    table_col_name: ['Age', 'Spend', 'Members', 'PMPM'],
    y_axis_label: ['Cost'],
    y_axis_unit: ['in thousand'],
    key: 'age_band',
  },
  options: {
    table_arrow_link: true,
    graph_vertical_line: true,
    benchmark: '301.02',
  },
};
