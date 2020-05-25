//update: 11.05.20 15:13
//działa

//update 24.05.20 6:37 -- zmieniłem testbutton(); działa też gdy nazwy tebel to cyfry

//jak chcesz połączyc divy to connectElements



//funkcja do testowania; stwórz sobie 2 tabele i wywołaj w konsoli:
// test()
//to powinno zrobic strzałkę i nawet przy przesówaniu powinno działać

function test() {
    var el1=document.getElementById("maindiv1");
    var el2=document.getElementById("maindiv2");
    connectElements(el1,el2);
}
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
    el1.setAttribute("connectedTo", el2.id);
    el1.setAttribute("arrow", svgArrow.id);
    el1.setAttribute("side", 1)
    el2.setAttribute("connectedTo", el1.id);
    el2.setAttribute("arrow", svgArrow.id);
    el2.setAttribute("side", 2)
    drawLine(el1, el2, svgArrow);

    if(el1.getAttribute("connections")!=null){
        let prevel1conn=el1.getAttribute("connections");
        let el1conn=prevel1conn+";"+el2.id+","+svgArrow.id+","+"1";
        el1.setAttribute("connections",el1conn);
    }else{
        let el1conn=el2.id+","+svgArrow.id+","+"1";
        el1.setAttribute("connections",el1conn);
    }

    if(el2.getAttribute("connections")!=null){
        let prevel2conn = el2.getAttribute("connections");
        let el2conn = prevel2conn + ";" + el1.id + "," + svgArrow.id + "," + "2";
        el2.setAttribute("connections",el2conn);
    }else{
        let el2conn = el1.id + "," + svgArrow.id + "," + "2";
        el2.setAttribute("connections",el2conn);
    }


}
//arr jak arrow nie jak array
var arrindex = 0
function getNextArrIndex(){
    arrindex = arrindex +1;
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


//rysuje strałkę tylko el1 musi miec atrybuty ustawione/musi być na nim wcześniej użyte connectElements
function dragArrow(el1){
    if(el1.hasAttribute("arrow")) {
        let arrow = document.getElementById(el1.getAttribute("arrow"));
        let el2 = document.getElementById(el1.getAttribute("connectedTo"));
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
                drawLine(el2,el1,arrow);
            }
        }
    }
}

//przerysowuje strzałkę 'arrow' od elementu 'el1' do elementu 'el2'
function drawLine(el1,el2,arrow,rowindex=-2){
    //dla rowindex=-2 łączy z headerem
    // wysokośc jednego wiersza to 40p
// wiersze indexowane od 0
//pathing strzałek; możliwe pozycje el2 względem el1
//A |  B  | C
//D | el1 | E
//F |  G  | H

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
    /*
    if((by-ay<100)&&(ay-by<100)&&(bx>ax)){
        curve2=""+bx + "," + (by - svgY+10) + " "
        curve1=""+(ax +aw) + "," + (ay-svgY+rowindex*40+100 ) + " ";
    }
    */
    var dStrLeft2 =
        // el1.x el1.y  beziercurve1.x beziercurve1.y
        // beziercurve2.x beziercurve2.y el2.x el2.y
        "M" +
        (ax    +aw ) + "," + (ay-svgY+rowindex*40+100) + " " +
        "C" +
        curve1 +
        curve2 +
        (bx  -15   ) + "," + (by -svgY+20);
    //console.log("strz:  "+dStrLeft2)
    //console.log(curve1);
    //console.log(curve2);
    arrow.setAttribute("d", dStrLeft2);
}


function getOffset(el) {
    let rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}
