var last_year = year

// 更新所有数据
function UpdateAllData() {
    // 更新上一条数据
    UpdateLastData(year, rank, country);
    // 更新排名数据
    now_page = 1;
    UpdateRankPageData(year, rank, country, now_page);
    // Todo: 更多数据
}