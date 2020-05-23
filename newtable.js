//tworzy tabele z podanych wartości
//jeśli ifsample==1 albo inputy są puste to tworzy przykładową
//todo wykrycie co zostalo zmienione (| +  gore i potem podmianka ( wszystkie zmiany zapisac)
function createMainDiv(ifsample) {
    let nextIndex = getNextIndex();
    let div = document.createElement("div");
    div.id = "maindiv" + nextIndex;
    let div1 = document.createElement("div");
    div1.id = "divheader" + nextIndex;
    let div2 = document.createElement("div");
    div2.id = "#datatable" + nextIndex;
    div.appendChild(div1);
    div.appendChild(div2);
    document.body.appendChild(div);
    if(!ifsample) {
        let name = document.getElementById("tabName").value;
        let cols = document.getElementById("colNames").value;
        let args = document.getElementById("argNames").value;
        let rows = document.getElementById("rowCount").value;
        let colsAndArgs = cols + ";|;" + args +";->";
        let colsarray = colsAndArgs.split(";");
        //let colsarray = cols.split(";");
        if(name==""){
            div1.textContent = "Click here to move (Table id = " + div2.id +" )";
        }
        else{
            div1.textContent = name+ " (Table id = " + div2.id +" )";
        }

        if ((!name && !cols && !rows)||ifsample) {
            createSampleTable(div2);
        } else {
            createTableWithParameters(div2, colsarray, rows);
        }
    }
    else{
        div1.textContent = "Click here to move" + " (Table id = " + div2.id +" )";
        createSampleTable(div2);
    }
    dragElement(div);
    //każda kolejny div jest tworzony 16px od końca poprzedniego
    div.style.top = (lastOffsetBottom   +"px");
    lastOffsetBottom= lastOffsetBottom+ div.offsetHeight+16;
    div.style.left = (div.offsetLeft +50) + "px";
    function changedTable(e){
        //alert("Changed " + e.target.value);
        let connectionsToMake = e.target.value.split(",");
        let tmpStr = "";
        for (let i in connectionsToMake) {
            tmpStr = connectionsToMake[i].split(" ").join("");
            if(tmpStr[0].localeCompare("#")===0) {
                connectElements(document.getElementById(div2.id), document.getElementById(tmpStr));
            }
        }

    }
    div2.addEventListener('change',changedTable);

}

var lastOffsetBottom=340;
var index = -1;
function getNextIndex(){
    index = index +1;
    return index;
}

//tworzy samą tabelę z przykładowymi danymi
function createSampleTable(div){
    return new DataTable(div, {
        columns: ['Name', '|', 'Salary','->'],
        data: [
            ['123', '|', '$1200',"   "],
            ['321', '|', '$1400',"   "],
        ]
    });
}
function getInnerText(e){
    return document.getElementById(e).innerText;
}
///tworzy samą tabelę z podanymi danymi
// (div w którym ma byc tabela; array z nazwami kolumn; liczba wierszy (domyślnie 3))
function createTableWithParameters(div,colsarray,rows=3){
    let rowsCount=parseInt(rows);
    if(!Number.isInteger(rowsCount)){
        rowsCount=3;
    }
    let rowsdata=[];
    let separateIndex = 0;
    let i=0;
    for (i in colsarray) {
        if (colsarray[i].localeCompare("|")===0) {
            separateIndex=i;
            break;
        }
    }
    for(let j=0;j<rowsCount;j++) {
        const newdata =new Array(colsarray.length);
        var newdata2=newdata.fill("   ");
        newdata2[separateIndex]="|";
        rowsdata.push(newdata2);
    }
    return new DataTable(div, {

        columns: colsarray,
        data: rowsdata
    });
}
document.getElementById("addtable").onclick = function () {
    createMainDiv(1);
}

