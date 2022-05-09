var dom = document.getElementById('line-chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  title: {
    text: 'Total',
    left: '2%',
    textStyle: {
      color: '#A9A9A9'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  // legend: {
  //   //data: ['当前', '世界'],
  //   data: ['当前'],
  //   textStyle: {
  //     color: '#ADD8E6'
  //   }
  // },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisLine:{
      lineStyle:{
          color: "#fff",
      },
     },
    data: ['Jan', 'Feb', 'Mar', 'Api', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    type: 'value',
    axisLine:{
      lineStyle:{
          color: "#fff",
      },
    },
  },
  series: [
    {
      name: '弱震',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [12, 13, 5, 11, 6, 8, 18, 11, 15,16, 21, 18],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.4)'
        },
      },
    },
    {
      name: '有感地震',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [2, 18, 19, 3, 2, 3, 10, 12, 3, 8, 9, 3],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.6)'
        },
      },
    },
    {
      name: '中强震',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [0, 12, 13, 0, 11, 2, 2, 8, 6, 20, 0, 5],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.8)'
        },
      },
    },
    {
      name: '强震',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [1, 1, 13, 8, 1,0, 5, 8, 6, 20, 0, 5],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.9)'
        },
      },
    },
    {
      name: '大地震',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,1.0)'
        },
      },
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);