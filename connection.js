//update: 11.05.20 15:13
//działa


//jak chcesz połączyc divy to connectElements



//funkcja do testowania; stwórz sobie 2 tabele i wywołaj w konsoli:
// test()
//to powinno zrobic strzałkę i nawet przy przesówaniu powinno działać
//wow
function test() {
   // var svg1 = document. createElementNS("http://www.w3.org/2000/svg", "path");
    //svg1.setAttribute("id", "newArrow2");
    //document.getElementById("gsvg").appendChild(svg1);

    var el1=document.getElementById("maindiv1");
    var el2=document.getElementById("maindiv2");
    connectElements(el1,el2);
}

// żeby dany div wiedział z kim jest połączony i jaką strzałką
//i tworzy strzałkę
function connectElements(el1,el2){
    let svgArrow = document. createElementNS("http://www.w3.org/2000/svg", "path");
    svgArrow.setAttribute("id",arrowid);
    arrowid=arrowid+1;
    document.getElementById("gsvg").appendChild(svgArrow);
    el1.setAttribute("connectedTo",el2.id);
    el1.setAttribute("arrow",svgArrow.id);
    el1.setAttribute("side",1)
    el2.setAttribute("connectedTo",el1.id);
    el2.setAttribute("arrow",svgArrow.id);
    el2.setAttribute("side",2)
    drawLine(el1,el2,svgArrow);

}

//kolejne do testowania; teraz już CHYBA można wyjebać
function c(){
    if(document.getElementById("maindiv1")==null){
        createMainDiv(1);
        createMainDiv(1);
        var svg1 = document. createElementNS("http://www.w3.org/2000/svg", "path");
        svg1.setAttribute("id", "newArrow2");
        document.getElementById("gsvg").appendChild(svg1);
    }
    var svg1=document.getElementById("newArrow2")
    var el1=document.getElementById("maindiv1");
    var el2=document.getElementById("maindiv2");
    drawLine(el1,el2,newArrow);
    drawLine(el2,el1,svg1);

    //
    el1.setAttribute("arrow",svg1);
    el2.setAttribute("arrow",svg1);
}


var arrowid=0;


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
}

//przerysowuje strzałkę 'arrow' od elementu 'el1' do elementu 'el2'
function drawLine(el1,el2,arrow){
//nowe drawline wykorzystuje getOffset
    let aw=el1.offsetWidth;
    let aw2=el2.offsetWidth;
    let ax=getOffset(el1).left;
    let ay=getOffset(el1).top;
    let bx=getOffset(el2).left;
    let by=getOffset(el2).top;
    let svgX=getOffset(document.getElementById("svgid")).left;
    let svgY=getOffset(document.getElementById("svgid")).top;
    var dStrLeft2 =
        "M" +
        (ax    +aw ) + "," + (ay-svgY+20) + " " +
        "C" +
        (ax +aw + 200) + "," + (ay+200-svgY ) + " " +
        (bx - 200) + "," + (by -200 - svgY) + " " +
        (bx  -15   ) + "," + (by -svgY);
    arrow.setAttribute("d", dStrLeft2);
}


function getOffset(el) {
    let rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}
