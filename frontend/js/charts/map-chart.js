var mapChart = echarts.init(document.getElementById('map-chart-container'));
var equipData = [

  {name: '海门', value: [121.15, 31.89, 3]},
  {name: '鄂尔多斯', value: [109.781327, 39.608266, 6]},
  {name: '招远', value: [120.38, 37.35, 9]},
  {name: '舟山', value: [122.207216, 29.985295, 1]},
]
// mapChart的配置
var option = {
  geo: {
    map: 'china',

    itemStyle: {
      normal: {					// 普通状态下的样式
        areaColor: '#404a59',
        borderColor: '#111'
      },
      emphasis: {					// 高亮状态下的样式
        areaColor: '#2a333d'
      }
    }
  },
  // backgroundColor: '#404a59',  		// 背景

  // 设置散点
  series: [
    {
      name: '地震', // series名称
      type: 'scatter', // series图表类型
      coordinateSystem: 'geo', // series坐标系类型
      data: equipData
    }
  ],
  visualMap: {
    type: 'continuous', // 连续型
    min: 0,       		// 值域最小值，必须参数
    max: 10,			// 值域最大值，必须参数
    calculable: false,	// 是否启用值域漫游
    inRange: {
      symbolSize: [5, 30],
      color: ['#FF3333','#CC0033','#990033']
      // 指定数值从低到高时的颜色变化
    },
    textStyle: {
      color: '#fff'	// 值域控件的文本颜色
    }
  },
};
mapChart.setOption(option);