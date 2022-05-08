var rank = 0.0

function update_rank() {
    let obj = document.getElementsByName("level-radio");
    for(let i=0; i<obj.length; i ++){
        if(obj[i].checked){
            rank = obj[i].value;
            break
        }
    }
}
$(document).ready(function(){
    $(".level-radio").children('label').click(function(){
        update_rank();
        // 触发全部刷新
        UpdateAllData();
    });
});

