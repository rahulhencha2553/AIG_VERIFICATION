export class PieCharts {
    chartOptions = {
        series: [44, 55, 13],
        chart: {
          type: "donut",
        },
        stroke: {
            show: false // Set this to false to remove the borders between the series
          },
        labels: ["Verified","Pending","Rejected"],
        colors:["#5174d1","#2b417d","#fd9292"],
        legend: {
            position: "bottom"
          },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
}
