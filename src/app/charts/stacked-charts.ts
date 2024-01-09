export class StackedCharts {
    chartOptions = {
        series: [
          {
            name: "Verified",
            data: [44, 55, 41, 67, 22, 43, 13, 23, 20, 8, 13, 27],
          },
          {
            name: "Pending",
            data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27],
          },
        ],
        colors: ["#364b84", "#b6bcd8"],
        dataLabels: {
          enabled: false,
        },
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "25%",
            borderRadius: 5,
          },
        },
        xaxis: {
          type: "category",
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      };
}
