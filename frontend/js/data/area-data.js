var country = "中国"
$(function(){
    //鼠标滑动，行色变化
    $('.now-choose').mouseover(function(){
        $(this).children('div').eq(1).css('border', '1px solid #68d8fe');
    }).mouseout(function(){
        $(this).children('div').eq(1).css('border', '1px solid white');
    });
    $('.del').mouseover(function(){
        $(this).css('border', '1px solid #61a8ff');
    }).mouseout(function(){
        $(this).css('border', '1px solid white');
    }).click(function () {
        country = "";
        UpdateAllData();
        $('.choose-area').text("世界");
        $('.map-del').hide();
        $('.del').hide();
    });
    $('.map-del').click(function () {
        country = "";
        UpdateAllData();
        $('.choose-area').text("世界");
        $('.map-del').hide();
        $('.del').hide();
    });
});

function update_country(area) {
    country = area;
    if (area !== "") {
        $('.choose-area').text(country);
        $('.map-del').show();
        $('.del').show();
    } else {
        $('.choose-area').text("世界");
        $('.map-del').hide();
        $('.del').hide();
    }
}