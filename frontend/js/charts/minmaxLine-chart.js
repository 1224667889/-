function UpdateMinMaxLineChart(year=2013, rank=0.0, country="") {
    var dom = document.getElementById('scatter-chart-container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    var option;
    var data = [
        {"depth":0.0,"minRank":1.4,"maxRank":3.6,"value":3},
{"depth":4.0,"minRank":2.0,"maxRank":4.7,"value":3},
{"depth":5.0,"minRank":2.4,"maxRank":4.8,"value":3},
{"depth":6.0,"minRank":2.0,"maxRank":5.1,"value":3},
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
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'cross',
      //     animation: false,
      //     label: {
      //       backgroundColor: '#ccc',
      //       borderColor: '#aaa',
      //       borderWidth: 1,
      //       shadowBlur: 0,
      //       shadowOffsetX: 0,
      //       shadowOffsetY: 0,
      //       color: '#222'
      //     }
      //   },
        // formatter: function (params) {
        //   return (
        //     params[2].name +
        //     '<br />' +
        //     ((params[2].value - base) * 100).toFixed(1) +
        //     '%'
        //   );
        // }
      // },
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
            verticalAlign:"bottom",
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
        {
          type: 'line',
          data: data.map(function (item) {
            return item.value;
          }),
          itemStyle: {
            color: '#333'
          },
          showSymbol: false
        }
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
    UpdateMinMaxLineChart(year, rank, country);
});