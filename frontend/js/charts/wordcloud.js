function UpdateWordCloud(year=2013, rank=0.0, country=""){
    let obj = document.getElementsByName("rank-radio");
    var t = "num"
    for(let i=0; i<obj.length; i ++){
        if(obj[i].checked){
            t = obj[i].value;
            break
        }
    }
    $.ajax({
        url:'http://127.0.0.1:5000/api/cloud/'+ t +'?year='+year+'&rank='+rank+'&country='+country,
        type:'get',
        dataType:'json',
        success: function(data){
            $('.word-cloud-img').attr('src', data.data.img);
        },
        error:function(){
            console.log('请求出错！');
        }
    });
}
$(document).ready(function(){
    UpdateWordCloud(year, rank, country);
});