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
      itemStyle: {
        normal: {
        color: function(params) {
                //自定义颜色
                var colorList = [
                  'rgba(30,144,255,0.4)', 'rgba(30,144,255,0.5)', 'rgba(30,144,255,0.6)','rgba(30,144,255,0.7)','rgba(30,144,255,0.8)'
                ];
                return colorList[params.dataIndex]
            }
        },
        
      },
      label: {
        color: '#F0F8FF',
        fontSize: '14px',
        position: 'outer',
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
        { value: 500, name: '深源地震(D≥300)' },
      ],
      itemStyle: {
        normal: {
        color: function(params) {
                //自定义颜色
                var colorList = [
                  'rgba(30,144,255,0.8)', 'rgba(30,144,255,0.5)', 'rgba(30,144,255,0.3)'
                ];
                return colorList[params.dataIndex]
            }
        },
        
      },
      label: {
        color: '#F0F8FF',
        fontSize: '14px',
        position: 'outer',
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