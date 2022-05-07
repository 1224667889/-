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
