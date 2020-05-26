import {BAR_HEIGHT, ChartValues, TRANSFER_TYPE, tripPointIconMap} from '../../../helpers/const.js';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const transportChart = (ctx, events) => {
  const parseData = events
    .filter((event) => TRANSFER_TYPE.includes(event.type))
    .reduce((count, event) => {
      count[event.type] = (count[event.type] || 0) + 1;
      return count;
    }, {});

  const sortedData = Object.entries(parseData).sort((a, b) => b[1] - a[1]);
  const data = Object.fromEntries(sortedData);

  ctx.height = BAR_HEIGHT * sortedData.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(data).map((label) => `${tripPointIconMap[label]} ${label.toUpperCase()}`),
      datasets: [{
        data: Object.values(data),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: ChartValues.BAR_THICKNESS,
        minBarLength: ChartValues.MIN_BAR_LENGTH,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          fontSize: ChartValues.LABELS_FONT_SIZE,
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: ChartValues.TITLE_FONT_SIZE,
        position: `left`
      },
      layout: {
        padding: {
          left: ChartValues.LAYOUT_PADDING_LEFT,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: ChartValues.SCALES_Y_PADDING,
            fontSize: ChartValues.SCALES_Y_FONTSIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};
