function updateMinMaxLineChart() {
    var dom = document.getElementById('scatter-chart-container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    var option;
    var data = [
        {"depth":0.0,"minRank":1.4,"maxRank":3.6,},
{"depth":4.0,"minRank":2.0,"maxRank":4.7,},
{"depth":5.0,"minRank":2.4,"maxRank":4.8,},
{"depth":6.0,"minRank":2.0,"maxRank":5.1,},
{"depth":7.0,"minRank":2.6,"maxRank":5.5,},
{"depth":8.0,"minRank":2.2,"maxRank":5.8,},
{"depth":9.0,"minRank":2.0,"maxRank":5.3,},
{"depth":10.0,"minRank":1.9,"maxRank":8.0,},
{"depth":11.0,"minRank":2.0,"maxRank":6.5,},
{"depth":12.0,"minRank":2.0,"maxRank":6.5,},
{"depth":13.0,"minRank":2.1,"maxRank":5.7,},
{"depth":14.0,"minRank":2.1,"maxRank":5.1,},
{"depth":15.0,"minRank":2.1,"maxRank":6.3,},
{"depth":16.0,"minRank":2.8,"maxRank":4.4,},
{"depth":17.0,"minRank":2.4,"maxRank":5.0,},
{"depth":18.0,"minRank":2.3,"maxRank":4.8,},
{"depth":19.0,"minRank":2.5,"maxRank":5.1,},
{"depth":20.0,"minRank":2.9,"maxRank":7.5,},
{"depth":21.0,"minRank":3.0,"maxRank":4.8,},
{"depth":22.0,"minRank":3.0,"maxRank":5.1,},
{"depth":23.0,"minRank":2.8,"maxRank":4.0,},
{"depth":24.0,"minRank":2.5,"maxRank":4.8,},
{"depth":25.0,"minRank":3.4,"maxRank":4.2,},
{"depth":26.0,"minRank":2.3,"maxRank":5.2,},
{"depth":27.0,"minRank":3.3,"maxRank":4.2,},
{"depth":28.0,"minRank":2.6,"maxRank":2.6,},
{"depth":29.0,"minRank":2.5,"maxRank":2.5,},
{"depth":30.0,"minRank":3.0,"maxRank":6.2,},
{"depth":32.0,"minRank":2.0,"maxRank":2.0,},
{"depth":33.0,"minRank":5.7,"maxRank":5.7,},
{"depth":34.0,"minRank":3.0,"maxRank":3.0,},
{"depth":38.0,"minRank":3.0,"maxRank":3.0,},
{"depth":39.0,"minRank":3.8,"maxRank":3.8,},
{"depth":40.0,"minRank":6.0,"maxRank":7.2,},
{"depth":44.0,"minRank":4.2,"maxRank":4.2,},
{"depth":50.0,"minRank":4.6,"maxRank":6.9,},
{"depth":56.0,"minRank":3.1,"maxRank":3.1,},
{"depth":57.0,"minRank":3.2,"maxRank":3.2,},
{"depth":59.0,"minRank":4.9,"maxRank":4.9,},
{"depth":60.0,"minRank":5.2,"maxRank":6.0,},
{"depth":66.0,"minRank":3.9,"maxRank":3.9,},
{"depth":79.0,"minRank":4.1,"maxRank":4.1,},
{"depth":80.0,"minRank":6.0,"maxRank":6.2,},
{"depth":90.0,"minRank":5.6,"maxRank":6.1,},
{"depth":100.0,"minRank":5.7,"maxRank":6.5,},
{"depth":102.0,"minRank":3.2,"maxRank":3.2,},
{"depth":110.0,"minRank":6.3,"maxRank":7.3,},
{"depth":120.0,"minRank":5.1,"maxRank":7.0,},
{"depth":127.0,"minRank":3.9,"maxRank":3.9,},
{"depth":129.0,"minRank":3.2,"maxRank":4.1,},
{"depth":130.0,"minRank":4.8,"maxRank":4.8,},
{"depth":131.0,"minRank":3.0,"maxRank":3.0,},
{"depth":132.0,"minRank":4.5,"maxRank":4.5,},
{"depth":137.0,"minRank":3.4,"maxRank":3.4,},
{"depth":139.0,"minRank":3.2,"maxRank":3.2,},
{"depth":140.0,"minRank":5.7,"maxRank":6.3,},
{"depth":150.0,"minRank":5.5,"maxRank":7.0,},
{"depth":160.0,"minRank":5.1,"maxRank":5.1,},
{"depth":164.0,"minRank":3.9,"maxRank":3.9,},
{"depth":168.0,"minRank":3.1,"maxRank":3.1,},
{"depth":170.0,"minRank":6.3,"maxRank":6.5,},
{"depth":172.0,"minRank":4.0,"maxRank":4.0,},
{"depth":180.0,"minRank":6.2,"maxRank":6.2,},
{"depth":270.0,"minRank":5.9,"maxRank":5.9,},
{"depth":380.0,"minRank":5.0,"maxRank":5.0,},
{"depth":390.0,"minRank":5.9,"maxRank":5.9,},
{"depth":430.0,"minRank":6.0,"maxRank":6.8,},
{"depth":470.0,"minRank":6.6,"maxRank":6.6,},
{"depth":500.0,"minRank":5.9,"maxRank":5.9,},
{"depth":530.0,"minRank":5.8,"maxRank":6.9,},
{"depth":540.0,"minRank":6.4,"maxRank":6.4,},
{"depth":550.0,"minRank":5.9,"maxRank":6.8,},
{"depth":570.0,"minRank":6.0,"maxRank":8.1,},
{"depth":580.0,"minRank":5.6,"maxRank":6.0,},
{"depth":590.0,"minRank":5.6,"maxRank":6.0,},
{"depth":600.0,"minRank":5.9,"maxRank":7.1,},
{"depth":620.0,"minRank":6.0,"maxRank":6.0,},
{"depth":640.0,"minRank":7.8,"maxRank":7.8,},
    ];
    myChart.showLoading();
//$.get(, function (data) {
  myChart.hideLoading();
  var base = -data.reduce(function (min, val) {
    return Math.floor(Math.min(min, val.minRank));
  }, Infinity);
  myChart.setOption(
    (option = {
      title: {
        //text: 'Confidence Band',
        //subtext: 'Example in MetricsGraphics.js',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#ccc',
            borderColor: '#aaa',
            borderWidth: 1,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            color: '#222'
          }
        },
        // formatter: function (params) {
        //   return (
        //     params[2].name +
        //     '<br />' +
        //     ((params[2].value - base) * 100).toFixed(1) +
        //     '%'
        //   );
        // }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
          name: '深度',
          nameTextStyle:{
            align:"right",
            verticalAlign:"top",
        },
          type: 'category',
          data: data.map(function (item) {
           return item.depth;
        }),
          axisLine:{
              lineStyle:{
                  color: "#fff",
              },
          },
      },
      yAxis: {
            name : '震级',
            nameTextStyle:{
                align:"right",
            },
            axisLine:{
              lineStyle:{
                  color: "#fff",
              },
          },
      },
      series: [
        {
          name: 'minRank',
          type: 'line',
          smooth: 1,
          data: data.map(function (item) {
            return item.minRank;
          }),
          lineStyle: {
            opacity: 0
          },
          stack: 'confidence-band',
          symbol: 'none'
        },
        {
          name: 'maxRank',
          type: 'line',
          smooth: 1,
          data: data.map(function (item) {
            return item.maxRank;
          }),
          lineStyle: {
            opacity: 0
          },
          areaStyle: {
            color: '#38B0DE'
          },
          stack: 'confidence-band',
          symbol: 'none'
        },
        // {
        //   type: 'line',
        //   data: data.map(function (item) {
        //     return item.value + base;
        //   }),
        //   itemStyle: {
        //     color: '#333'
        //   },
        //   showSymbol: false
        // }
      ]
    })
  );
//});

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
}

$(document).ready(function(){
    updateMinMaxLineChart();
});