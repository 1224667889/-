var dom = document.getElementById('line-chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  // title: {
  //   text: 'Sum',
  //   left: '2%',
  //   textStyle: {
  //     color: '#A9A9A9'
  //   }
  // },
  tooltip: {
    trigger: 'axis',
    //formatter:"{a1},{b1},{c2}"
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
    name : '频次',
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
      name: '大地震(M≥7)',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,1)'
        },
      },
    },
    {
      name: '强震(6≤M<7)',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.9)'
        },
      },
    },
    {
      name: '中强震(4.5≤M<6)',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [2, 4, 2, 3, 4, 1, 1, 6, 7, 4, 3, 6],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.7)'
        },
      },
    },
    {
      name: '有感地震(3≤M<4.5)',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [23, 42, 25, 21, 42, 15, 22, 31, 29, 39, 37, 24],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.5)'
        },
      },
    },
    {
      name: '弱震(M<3)',
      type: 'bar',
      stack: 'Total',
      emphasis: {
        focus: 'series'
      },
      data: [12, 3, 12, 16, 8, 4, 7, 18, 4, 7, 7, 11],
      itemStyle: {
        normal: {
        color:'rgba(30,144,255,0.3)'
        },
      },
    },

  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);