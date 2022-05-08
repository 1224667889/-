function UpdateMapData(year=2013, rank=0.0, country="") {
  $.ajax({
    url:'http://127.0.0.1:5000/api/map?year='+year+'&rank='+rank+'&country='+country,
    type:'get',
    dataType:'json',
    success: function(data){
      var equipData = data.data.digits;
      var mapChart = echarts.init(document.getElementById('map-chart-container'));

      // mapChart的配置
      var option = {
        geo: {
          map: 'china',
          itemStyle: {
            normal: {					// 普通状态下的样式
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {					// 高亮状态下的样式
              areaColor: '#2a333d'
            },
          }
        },
        // backgroundColor: '#404a59',  		// 背景
        tooltip: {
          trigger:'item',
          formatter:(params) => {
            return `地点:${params.name}</br>经度:${params.value[0]}</br>纬度:${params.value[1]}</br>震级:${params.value[2]}`
          }
        },
        // 设置散点
        series: [
          {
            name: '地震', // series名称
            type: 'effectScatter', // series图表类型
            coordinateSystem: 'geo', // series坐标系类型
            itemStyle: {
              color: 'rgba(255,0,0,0.3)'
            },
            rippleEffect:{
              scale : 5 //控制涟漪大小
            },
            emphasis: {
              focus: 'self',
            },
            showEffectOn :  'emphasis', // 鼠标移动到点上才有涟漪效果
            data: equipData
          }
        ],
        visualMap: [
          {
            type: 'continuous',
            min: 1,
            max: 366,
            calculable: false,
            dimension: 3,
            show: false,
            inRange: {
              opacity: [0.3, 1]
            }
          },
          {
            type: 'continuous',
            min: 0,
            max: 10,
            calculable: false,
            dimension: 2,
            inRange: {
              symbolSize: [1, 40],
              color: ['#CC0033','#770022'],
            },
            textStyle: {
              color: '#fff'
            }
          },
        ]
      };
      mapChart.setOption(option);
    },
    error:function(){
      console.log('请求出错！');
    }
  });
}

$(document).ready(function(){
  UpdateMapData(year, rank, country);
});