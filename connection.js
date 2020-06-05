
function testbutton(){
    let el1name="'"+document.getElementById("connect1").value+"'";
    let el2name="'"+ document.getElementById("connect2").value+"'";
    let el1=document.querySelector("div[name="+el1name+"]");
    let el2=document.querySelector("div[name="+el2name+"]");
    connectElements(el1,el2);
}
// żeby dany div wiedział z kim jest połączony i jaką strzałką
//i tworzy strzałkę
function connectElements(el1,el2) {
    let svgArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgArrow.setAttribute("id", "arrow"+getNextArrIndex());
    svgArrow.setAttribute("arrow",'true');
    document.getElementById("gsvg").appendChild(svgArrow);
    if(el1.hasAttribute("tabindex")){
        let el1ccells="";
        if(el1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.hasAttribute("connectedcells")) {
            el1ccells = el1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("connectedcells")+";";
        }
        el1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute("connectedcells",el1ccells+el1.id);
    }
    if(el2.hasAttribute("tabindex")){
        let el2ccells="";
        if(el2.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.hasAttribute("connectedcells")) {
            el2ccells = el2.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("connectedcells")+";";
        }
        el2.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute("connectedcells",el2ccells+el2.id);
    }
    el1.setAttribute("connectedTo", el2.id);
    el1.setAttribute("arrow", svgArrow.id);
    el1.setAttribute("side", 1)
<<<<<<< Updated upstream
    drawLine(el1, el2, svgArrow);
    /*

     */
=======
    /*
    el2.setAttribute("connectedTo", el1.id);
    el2.setAttribute("arrow", svgArrow.id);
    el2.setAttribute("side", 2)
     */
    drawLine(el1, el2, svgArrow);
>>>>>>> Stashed changes

    if(el1.getAttribute("connections")!=null){
        let prevel1conn=el1.getAttribute("connections");
        let el1conn=prevel1conn+";"+el2.id+","+svgArrow.id+","+"1";
        el1.setAttribute("connections",el1conn);
    }else{
        let el1conn=el2.id+","+svgArrow.id+","+"1";
        el1.setAttribute("connections",el1conn);
    }
<<<<<<< Updated upstream

    if(el2.getAttribute("connections")!=null){
        let prevel2conn = el2.getAttribute("connections");
        let el2conn = prevel2conn + ";" + el1.id + "," + svgArrow.id + "," + "2";
        el2.setAttribute("connections",el2conn);
    }else{
        let el2conn = el1.id + "," + svgArrow.id + "," + "2";
        el2.setAttribute("connections",el2conn);
    }
=======
>>>>>>> Stashed changes

    if(el2.getAttribute("connections")!=null){
        let prevel2conn = el2.getAttribute("connections");
        let el2conn = prevel2conn + ";" + el1.id + "," + svgArrow.id + "," + "2";
        el2.setAttribute("connections",el2conn);
    }else{
        let el2conn = el1.id + "," + svgArrow.id + "," + "2";
        el2.setAttribute("connections",el2conn);
    }
}

function disconnect(el1) {
    document.getElementById(el1.getAttribute("arrow")).remove();
    let el2 = document.getElementById(el1.getAttribute("connectedto"));
    el1.removeAttribute("connectedto");
    el1.removeAttribute("arrow");
    el1.removeAttribute("side");
    el1.removeAttribute("connections");
    let el2connectionsarray=el2.getAttribute("connections").split(";")
    let ret="";
    for(let i =0;i<el2connectionsarray.length;i++){
        let tmp = el2connectionsarray[i].split(",")
        if(tmp[0]!=el1.id){
            ret+=tmp[0]+","+tmp[1]+","+tmp[2]+";";
        }
    }
    if(ret){
        ret=ret.substring(0, ret.length - 1);
        el2.setAttribute("connections",ret);
    }else{
        el2.removeAttribute("connections");
    }

    let parentconnectedcells=el1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("connectedcells").split(";")
    let ret2="";
    for(let j=0;j<parentconnectedcells.length;j++){
        if(parentconnectedcells[j]!=el1.id){
            ret2+=parentconnectedcells[j]+";"
        }
    }
    if(ret2){
        ret2=ret2.substring(0, ret2.length - 1);
        el1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.setAttribute("connectedcells",ret2);
    }else{
        el1.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.removeAttribute("connectedcells");
    }


}





//arr jak arrow nie jak array
<<<<<<< Updated upstream
function getNextArrIndex(){
    arrindex = arrindex +1;
    console.log("NEWARROW: ",arrindex);
=======
var arrindex = 0
function getNextArrIndex(){
    arrindex = arrindex +1;
>>>>>>> Stashed changes
    return arrindex;
}
// "connTo1,arrid1,side1;connTo2,arrid2,side2"
// [[connTo1, arrid1, side1], [connTo2,arrid2,side2]]
function stringToArray(s){
    let arr1=s.split(";");
    let arr2=new Array(arr1.length)
    for(i=0;i<arr1.length;i++){
        arr2[i]=arr1[i].split(",")
    }
    return arr2;
}
function arrayToString(array){
    s="";
    for(i=0;i<array.length;i++){
        if(i>0){
            s=s+";";
        }
        s=s+array[i][0]+","+array[i][1]+","+array[i][2];
    }
    return s;
}


//el1--->el2
function dragArrow(el1){
    if(el1.hasAttribute("arrow")&&0) {
        let arrow = document.getElementById(el1.getAttribute("arrow"));
        let el2 = document.getElementById(el1.getAttribute("connectedTo"));
        if(el2.hasAttribute("tabindex")){
            el2=el2.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        }
        if(el1.getAttribute("side")==1) {
            drawLine(el1, el2, arrow);
        }else{
            drawLine(el2,el1,arrow);
        }
    }
    if(el1.hasAttribute("connections")){
        let s=el1.getAttribute("connections");
        let arr=stringToArray(s);
        for(i=0;i<arr.length;i++){
            tmp=arr[i];
            if(tmp[2]=="1"){
                let el2 = document.getElementById(tmp[0]);
                let arrow=document.getElementById(tmp[1]);
                drawLine(el1,el2,arrow);
            }
            else{
                let el2 = document.getElementById(tmp[0]);
                let arrow=document.getElementById(tmp[1]);
<<<<<<< Updated upstream
                console.log("157:",el2,el1,arrow)
=======
>>>>>>> Stashed changes
                drawLine(el2,el1,arrow);
            }
        }
    }
}

//przerysowuje strzałkę 'arrow' od elementu 'el1' do elementu 'el2'
function drawLine(el1,el2,arrow,rowindex=-2){

    let aw=el1.offsetWidth;
    let aw2=el2.offsetWidth;
    let ax=getOffset(el1).left;
    let ay=getOffset(el1).top;
    let bx=getOffset(el2).left;
    let by=getOffset(el2).top;
    let svgX=getOffset(document.getElementById("svgid")).left;
    let svgY=getOffset(document.getElementById("svgid")).top;
    let curve1=""+(ax +aw + 100) + "," + (ay+100-svgY+rowindex*40+100 ) + " ";
    let curve2=""+(bx - 100) + "," + (by -100 - svgY) + " ";
    var dStrLeft2 =
        "M" +
        (ax    +aw -12 ) + "," + (ay-svgY+rowindex*40+100) + " " +
        "C" +
        curve1 +
        curve2 +
        (bx  -15   ) + "," + (by -svgY+20);
    arrow.setAttribute("d", dStrLeft2);
}


function getOffset(el) {
    let rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}


var all= document.querySelectorAll(".at");
for(let i=0;i<all.length;i++){
    console.log(i);
    all[i].bindEvents();
}
