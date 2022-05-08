function UpdatePieChart() {
  var dom = document.getElementById('pie-chart-container');
var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    var option;

option = {
  color: ["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#ee6666"],
  title: {
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a}：<br/>{b}:<br/>\t{c}次 - {d}%'
  },
  series: [
    {
      name: '地震强度',
      type: 'pie',
      radius: '80%',
      center: ['25%', '50%'],
      selectedMode: 'single',
      data: [
        { value: 900, name: '弱震(M<3)' },
        { value: 510, name: '有感地震(3≤M<4.5)'},
        { value: 434, name: '中强震(4.5≤M<6)' },
        { value: 335, name: '强震(6≤M<7)' },
        { value: 35, name: '大地震(M≥7)' }
      ],
      label: {
        color: '#000',
        fontSize: '10px',
        position: 'inner',
        overflow: 'truncate',
        bleedMargin: 5
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    {
      name: '震源深度',
      type: 'pie',
      radius: '80%',
      center: ['75%', '50%'],
      selectedMode: 'single',
      data: [
        { value: 1000, name: '浅源地震(D<60)'},
        { value: 600, name: '中源地震(60≤D<300)' },
        { value: 500, name: '深源地震(D≥300)' }
      ],
      label: {
        color: '#000',
        fontSize: '10px',
        position: 'inner',
        alignTo: 'none',
        bleedMargin: 10
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
if (option && typeof option === 'object') {
  myChart.setOption(option);
}
}


$(document).ready(function(){
  UpdatePieChart();
});