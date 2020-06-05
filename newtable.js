
//tworzy tabele z podanych wartości
//jeśli ifsample==1 albo inputy są puste to tworzy przykładową
function createMainDiv(ifsample) {
    let nextIndex = getNextIndex();
    let div = document.createElement("div");
    div.id = "maindiv" + nextIndex;
    div.className="maindiv";
    let div1 = document.createElement("div");
    div1.id = "divheader" + nextIndex;
    let div2 = document.createElement("div");
    div2.id = "datatable" + nextIndex;
    div.appendChild(div1);
    div.appendChild(div2);
    div2.id = "#datatable" + nextIndex;
    let div3 = document.createElement("button");
    div3.id = "xButton"+ nextIndex;
    div3.innerHTML= "X";
    div3.addEventListener("click", function() {
        //usuwa wychodzące strzałki
        let lastcolindex = div.getAttribute("lastcolindex");
        if(div.hasAttribute("connectedcells")) {
            let rowindexes = div.getAttribute("connectedcells").split(";");
            for (let i = 0; i < rowindexes.length; i++) {
                disconnect(document.getElementById(rowindexes[i]))
            }
        }
        //usuwa przychodzące strzałki
        if(div.hasAttribute("connections")) {
            let connections = div.getAttribute("connections").split(";");
            for (let i = 0; i < connections.length; i++) {
                disconnect(document.getElementById(connections[i].split(",")[0]))
            }
        }
        this.parentElement.remove();});
    div.appendChild(div1);
    div.appendChild(div3);
    div.appendChild(div2);

    document.body.appendChild(div);

    if(!ifsample) {
        let name = document.getElementById("tabName").value;
        let cols = document.getElementById("colNames").value;
        let args = document.getElementById("argNames").value;
        let rows = document.getElementById("rowCount").value;
        let colsAndArgs = cols + ";__;" + args +";   --->  ";
        let colsarray = colsAndArgs.split(";");
        //let colsarray = cols.split(";");
        if(name==""){
            div1.textContent = "Click here to move";
        }
        else{
            div1.textContent = name;
            div.setAttribute("name",name);

        }
        if ((!name && !cols && !rows)||ifsample) {
            div.setAttribute("lastcolindex","4");
            createSampleTable(div2);
        } else {
            div.setAttribute("lastcolindex",colsarray.length);
            console.log("cols"+colsarray.length);
            createTableWithParameters(div2, colsarray, rows);
        }
    }
    else{
        div1.textContent = "Click here to move";
        createSampleTable(div2);
    }

    addListeners();
    dragElement(div);

    lastOffsetBottom=280;
    foundparking=true;
    getParkingLot(div);
    //każda kolejny div jest tworzony 16px od końca poprzedniego
    div.style.top = (lastOffsetBottom   +"px");
    //lastOffsetBottom= lastOffsetBottom+ div.offsetHeight+16;
    div.style.left = (div.offsetLeft +50) + "px";



}

var lastOffsetBottom=280;
var index = 0;
var foundparking=true;
function getNextIndex(){
    index = index +1;
    return index;
}
function getParkingLot(div){
    let allmaindivs= document.getElementsByClassName("maindiv");
    foundparking=true;
    for(let i=0;i<allmaindivs.length;i++){
        let maindiv=allmaindivs[i];
        if(maindiv.id!=div.id) {
            if ((maindiv.offsetTop + maindiv.offsetHeight) < lastOffsetBottom) {
            } else {
                if(div.offsetHeight+lastOffsetBottom>maindiv.offsetTop) {
                    foundparking = false;
                }
            }
            if (!foundparking) {
                lastOffsetBottom = lastOffsetBottom + 50;
                getParkingLot(div);
            }
        }
    }
}

//tworzy samą tabelę z przykładowymi danymi
function createSampleTable(div){
    return new DataTable(div, {
        checkboxColumn: true,
        columns: ['Name', 'Position','', 'Salary',' ->'],
        data: [
            ['123', 'Software Developer','', '$1200',''],
            ['321', 'Software Engineer','', '$1400',''],
        ]
    });
}

///tworzy samą tabelę z podanymi danymi
// (div w którym ma byc tabela; array z nazwami kolumn; liczba wierszy (domyślnie 3))
function createTableWithParameters(div,colsarray,rows=3){
    let rowscount=parseInt(rows);
    if(!Number.isInteger(rowscount)){
        rowscount=3;
    }
    let rowsdata=[];
    for(let j=0;j<rowscount;j++) {
        const newdata =new Array(colsarray.length);
        var newdata2=newdata.fill("   ");
        rowsdata.push(newdata2);
    }
    var ret= new DataTable(div, {

        columns: colsarray,
        data: rowsdata
    });
    tabletable["'"+div.id+"'"]=ret;
    return ret;
}


// J like json
function createMainDivJ(name,cols,data) {
    let nextIndex = getNextIndex();
    let div = document.createElement("div");
    div.id = "maindiv" + nextIndex;
    div.className="maindiv";
    let div1 = document.createElement("div");
    div1.id = "divheader" + nextIndex;
    let div2 = document.createElement("div");
    div2.id = "datatable" + nextIndex;
    div.appendChild(div1);
    div.appendChild(div2);
    document.body.appendChild(div);
    div1.textContent = name;
    div.setAttribute("name",name);
    div.setAttribute("lastcolindex",cols.length);
    createTableWithParametersJ(div2, cols, data);
    console.log("##############################################")
    addListeners();
    dragElement(div);
    //każda kolejny div jest tworzony 16px od końca poprzedniego
    div.style.top = (lastOffsetBottom   +"px");
    lastOffsetBottom= lastOffsetBottom+ div.offsetHeight+16;
    div.style.left = (div.offsetLeft +50) + "px";
    return div

}
function createTableWithParametersJ(div,cols,data){
    var ret= new DataTable(div, {

        columns: cols,
        data: data
    });
    tabletable["'"+div.id+"'"]=ret;
    return ret;
}