function firstStepCreateDiv(){
    document.getElementById("addtable").style.backgroundColor = "red";
    let nextIndex = getNextIndex();
    let div = document.createElement("div");
    div.id = "maindiv" +nextIndex;
    let div1 = document.createElement("div");
    div1.id = "divheader" +nextIndex;
    div1.textContent = "Click here to move"
    let div2 = document.createElement("div");
    div2.id="#datatable"+nextIndex;
    div.appendChild(div1);
    div.appendChild(div2);
    document.body.appendChild(div);
    createTable(div2);
    dragElement(div);
}
function firstStepCreateDiv3(){
    let name = document.getElementById("tabName").value;
    let cols=document.getElementById("colNames").value;
    let rows=document.getElementById("rowCount").value;
    let colsarray=cols.split(";");
    let nextIndex = getNextIndex();
    let div = document.createElement("div");
    div.id = "maindiv" +nextIndex;
    let div1 = document.createElement("div");
    div1.id = "divheader" +nextIndex;
    div1.textContent = name
    let div2 = document.createElement("div");
    div2.id="#datatable"+nextIndex;
    div.appendChild(div1);
    div.appendChild(div2);
    document.body.appendChild(div);
    createTable3(div2,colsarray,rows);
    dragElement(div);
}
var index = 0;
function getNextIndex(){
    index = index +1;
    return index;
}
function createTable(div){
    return new DataTable(div, {
        columns: ['Name', 'Position', 'Salary'],
        data: [
            ['123', 'Software Developer', '$1200'],
            ['321', 'Software Engineer', '$1400'],
        ]
    });
}
function createTable3(div,colsarray,rows=3){
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
    return new DataTable(div, {

        columns: colsarray,
        data: rowsdata
    });
}
document.getElementById("addtable").onclick = function () {
    firstStepCreateDiv();
}

