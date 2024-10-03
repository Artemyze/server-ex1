import template from './tasksChart.template';

const tasksChart = {
  template: template(),
  bindings: {
    report: '<',
  },
  controller: [
    function() {
      this.$onInit = function() {
        this.chartParams = {
          type: 'bar',
          data: {
            datasets: [
              {
                label: 'Выполненные',
                data: this.report.complete,
                backgroundColor: this.report.complete.map(function() {
                  return '#0000ff';
                }),
              },
              {
                label: 'Невыполненные',
                data: this.report.notComplete,
                backgroundColor: this.report.notComplete.map(function() {
                  return '#ff0000';
                }),
              },
            ],

            labels: this.report.labels,
          },
          options: {
            responsive: true,
            legend: {
              display: false,
              position: 'left',
            },
            scales: {
              x: {
                stacked: false,
                beginAtZero: true,
              },
              y: {
                stacked: false,
                min: 0,
              },
            },
          },

        };
      };
    }],
};

export {tasksChart};
