var now_page = 1;
var max_page = 9999;
function UpdateRankPageData(year=2013, rank=0.0, country="", page_num=1) {
    let obj = document.getElementsByName("rank-radio");
    var t = "num"
    for(let i=0; i<obj.length; i ++){
        if(obj[i].checked){
            t = obj[i].value;
            if (t === 'num') {
                $('#rank-title').text("地震次数")
            } else {
                $('#rank-title').text("最大震级")
            }
            break
        }
    }
    $.ajax({
        url:'http://127.0.0.1:5000/api/page/'+ t +'?year='+year+'&rank='+rank+'&country='+country+'&page_num='+page_num,
        type:'get',
        dataType:'json',
        success: function(data){
            var trList = document.getElementsByClassName('area-table')[0].getElementsByTagName('TR')
            max_page = data.data.page_sum;
            $('.total-page-num').text('/' + max_page);
            $('.now-page-num').text(now_page);
            var digits = data.data.digits;
            var j = 0
            for(let i=0; i < trList.length; i ++){
                if (trList[i].getAttribute("class") === 'always_tr') {
                    continue
                }
                if (j < trList.length && digits[j]) {
                    trList[i].getElementsByTagName("DIV")[0].innerHTML=digits[j].area;
                    if (t === 'num') {
                        trList[i].getElementsByTagName("DIV")[1].innerHTML=digits[j].num + '次';
                    } else {
                        trList[i].getElementsByTagName("DIV")[1].innerHTML=digits[j].num;
                    }
                    j++
                } else {
                    trList[i].getElementsByTagName("DIV")[0].innerHTML="&nbsp";
                    trList[i].getElementsByTagName("DIV")[1].innerHTML="&nbsp";
                }
            }
            console.log(data)
        },
        error:function(){
            console.log('请求出错！');
        }
    });
}
$(document).ready(function(){
    $("#area-rank").ready(UpdateRankPageData(year, rank, country, now_page));
    $("#last-page").click(function () {
        now_page--;
        if (now_page < 1) {
            now_page = 1;
        }
        if (now_page > max_page) {
            now_page = max_page;
        }
        $('.now-page-num').text(now_page);
        UpdateRankPageData(year, rank, country, now_page);
    });
    $("#next-page").click(function () {
        now_page++;
        if (now_page < 1) {
            now_page = 1;
        }
        if (now_page > max_page) {
            now_page = max_page;
        }
        $('.now-page-num').text(now_page);
        UpdateRankPageData(year, rank, country, now_page);
    })
});