export class AreaCharts {
    chartOptions = {
        series: [
          {
            name: "STOCK ABC",
            data: [
                8107.85,
                8128.0,
                8122.9,
                8165.5,
                8340.7,
                8423.7,
                8423.5,
                8514.3,
                8481.85,
                8487.7,
                8506.9,
                8626.2,
                8668.95,
                8602.3,
              ],
          }
        ],
        colors:["#2b417d"],
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },

        labels: [
            "13 Nov 2017",
            "14 Nov 2017",
            "15 Nov 2017",
            "16 Nov 2017",
            "17 Nov 2017",
            "20 Nov 2017",
            "21 Nov 2017",
            "22 Nov 2017",
            "23 Nov 2017",
            "24 Nov 2017",
            "27 Nov 2017",
            "28 Nov 2017",
            "29 Nov 2017",
            "30 Nov 2017",
          ],
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: "left"
        }
      };
}
