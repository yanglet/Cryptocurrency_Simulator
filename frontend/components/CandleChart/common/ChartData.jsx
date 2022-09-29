export var chart = {
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "rgb(210, 79, 69)",
            downward: "rgb(16, 93, 188)",
          },
        },
      },
    },
  };