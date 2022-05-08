var dom = document.getElementById('scatter-chart-container');
var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    var option;

option = {
  color: ["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#ee6666","#5470c6","#91cc75"],
  title: {
    //text: 'Weather Statistics',
    //subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: [{
    show : true,
    bottom: 30,
    orient: 'vertical',
    left: 'left',
    data : ['超微震(M<1)', '弱震(1≤M<3)','有感地震(3≤M<4.5)','中强震(4.5≤M<6)','强震(6≤M<7)','大地震(7≤M<8)','巨大地震(M≥8)'],
    textStyle:{
      color: "#FFFFFF"
    }
  },
  {
    show : true,
    bottom: 130,
    orient: 'vertical',
    right: 'right',
    data : ["浅源地震(D<60)","中源地震(60≤D<300)","深源地震(D≥300)"],
    textStyle:{
      color: "#FFFFFF"
    }
  }],
  series: [
    {
      type: 'pie',
      radius: '30%',
      center: ['25%', '50%'],
      selectedMode: 'single',
      data: [
        { value: 1548, name: '超微震(M<1)'},
        { value: 9000, name: '弱震(1≤M<3)' },
        { value: 510, name: '有感地震(3≤M<4.5)' },
        { value: 434, name: '中强震(4.5≤M<6)' },
        { value: 335, name: '强震(6≤M<7)' },
        { value: 335, name: '大地震(7≤M<8)' },
        { value: 335, name: '巨大地震(M≥8)' }
      ],
      label:{
        show : false,
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
      type: 'pie',
      radius: '30%',
      center: ['75%', '50%'],
      selectedMode: 'single',
      data: [
        { value: 1000, name: '浅源地震(D<60)'},
        { value: 600, name: '中源地震(60≤D<300)' },
        { value: 500, name: '深源地震(D≥300)' }
      ],
      label:{
        show : false,
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

    //window.addEventListener('resize', myChart.resize);