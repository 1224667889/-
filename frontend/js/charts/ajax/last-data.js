function GetLastData(year=2013, rank=0., country=""){
    var lastData
    $.ajax({
        url:'http://127.0.0.1:5000/api/last?year='+year+'&rank='+rank+'&country='+country,
        type:'get',
        dataType:'json',
        success:function(data){
            // console.log(data);
            lastData = data;
        },
        error:function(){
            console.log('请求出错！');
        }
    })
    return lastData;
}