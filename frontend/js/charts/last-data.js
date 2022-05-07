function UpdateLastData(year=2013, rank=0.0, country="") {
    $.ajax({
        url:'http://127.0.0.1:5000/api/last?year='+year+'&rank='+rank+'&country='+country,
        type:'get',
        dataType:'json',
        success: function(data){
            $('#last-one-date').text('日期：' + data.data.last.time);
            $('#last-one-rank').text(data.data.last.rank);
            site = data.data.last.site;
            console.log(site.length)
            if (site.length >= 20) {
                site = site.substring(0, 14) + "..."
            }
            if (site.length >= 15) {
                $('#last-one-site').css("fontSize", 'smaller')
            }
            $('#last-one-site').text(site);
        },
        error:function(){
            console.log('请求出错！');
        }
    });
}
$(document).ready(function(){
    $("#last-one").ready(UpdateLastData());
});