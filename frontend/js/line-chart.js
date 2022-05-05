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
  legend: {
    data: ['China', 'Japan', 'Russia'],
    textStyle: {
      color: '#ADD8E6'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jan', 'Feb', 'Mar', 'Api', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'China',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210, 231, 432, 123, 231, 298],
      areaStyle: {}
    },
    {
      name: 'Japan',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310, 372, 483, 348, 129, 323],
      areaStyle: {}
    },
    {
      name: 'Russia',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410, 182, 191, 234, 290, 330],
      areaStyle: {}
    },
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);