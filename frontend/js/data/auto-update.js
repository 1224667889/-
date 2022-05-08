var last_year = year;
var $handle;

// 更新所有数据
function UpdateAllData() {
    // 更新上一条数据
    UpdateLastData(year, rank, country);
    // 更新排名数据
    now_page = 1;
    UpdateRankPageData(year, rank, country, now_page);
    // 更新地图数据
    UpdateMapData(year, rank, country);
    // 更新词云数据
    UpdateWordCloud(year, rank, country);
    // Todo: 更多数据
}

function AutoUpdate(dif=false) {
    window.clearInterval($handle);
    if (dif) {
        if (last_year !== year) {
            // 距离上次更新后又更新了
            last_year = year;
            $handle = window.setInterval("AutoUpdate(true)",250);
        } else {
            // 稳定下来则刷新数据 并重新进入计时
            UpdateAllData();
            $handle = window.setInterval("AutoUpdate(false)",500);
        }
    } else {
        if (last_year !== year) {
            last_year = year;
            $handle = window.setInterval("AutoUpdate(true)",250);
        } else {
            $handle = window.setInterval("AutoUpdate(false)",500);
        }
    }
}

$(document).ready(function(){
    $handle = window.setInterval("AutoUpdate(false)",500);
})