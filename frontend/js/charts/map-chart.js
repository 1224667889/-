var mapChart = echarts.init(document.getElementById('map-chart-container'));
var geoItemStyle = {
  normal: {
    areaColor: '#323c48',
    borderColor: '#111'
  },
  emphasis: {
    areaColor: '#2a333d'
  }
};
// 悬停展示框格式化配置
var series = [
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
  }
];
var visualMap = [
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
];
var tooltip = {
  trigger:'item',
  formatter:(params) => {
    var name = params.name
    if (name.length >= 18) {
      name = name.substring(0, 15) + "..."
    }
    return `地点:${name}</br>经纬度：${params.value[0]}°, ${params.value[1]}°</br>震源深度：${params.data.depth}km</br>震级：${params.value[2]}`
  }
};

function switchMap(param){
  var area;
  if (param.data != null) {
    area = param.data.country;
  } else {
    area = param.name;
    if (area === "China") {
      area = "中国";
    }
  }
  update_country(area);
  UpdateAllData();
  mapChart.off('click', switchMap);
}

function ChinaMap(equipData) {
  // mapChart的配置
  var option = {
    geo: {
      map: 'china',
      itemStyle: geoItemStyle
    },
    tooltip: tooltip,
    // 设置散点
    series: series,
    visualMap: visualMap
  };
  option.series[0].data = equipData;
  option.visualMap[1].inRange.symbolSize = [1, 40];
  mapChart.setOption(option);
}
function WorldMap(equipData) {
  // mapChart的配置
  var option = {
    geo: {
      map: 'world',
      itemStyle: geoItemStyle
    },
    tooltip: tooltip,
    // 设置散点
    series: series,
    visualMap: visualMap
  };
  option.series[0].data = equipData;
  option.visualMap[1].inRange.symbolSize = [1, 15];
  mapChart.setOption(option);
  mapChart.on('click', switchMap);
}
function UpdateMapData(year=2013, rank=0.0, country="") {
  // if (country !== "中国") {
  //   // 不是中国的都拉全量数据 填充地图
  //   country = "";
  // }
  $.ajax({
    url:'http://127.0.0.1:5000/api/map?year='+year+'&rank='+rank+'&country='+country,
    type:'get',
    dataType:'json',
    success: function(data){
      if (country === "中国") {
        ChinaMap(data.data.digits);
      } else {
        WorldMap(data.data.digits);
      }
    },
    error:function(){
      console.log('请求出错！');
    }
  });
}

$(document).ready(function(){
  UpdateMapData(year, rank, country);
});