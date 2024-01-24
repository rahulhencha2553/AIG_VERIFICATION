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
        colors:["#FFC107"],
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
            "13 Nov ",
            "14 Nov ",
            "15 Nov ",
            "16 Nov ",
            "17 Nov ",
            "20 Nov ",
            "21 Nov ",
            "22 Nov ",
            "23 Nov ",
            "24 Nov ",
            "27 Nov ",
            "28 Nov ",
            "29 Nov ",
            "30 Nov ",
          ],
        xaxis: {
          type: "category",
        //  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: "left"
        }
      };
}
