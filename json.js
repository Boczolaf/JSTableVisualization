
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

//uzupełnia document.body według pliku
function allFromJson(){
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();

    fr.onload = function(e) {
        var result = JSON.parse(e.target.result);
        var parser = new DOMParser();
        var htmlDoc2 = parser.parseFromString(result.Content, "text/html");
        jsonResult = result;

        let tablenames = Object.keys(jsonResult);
        for (let i = 0; i < Object.keys(jsonResult).length; i++) {
            let data = [[],[],[]]

            for (let j = 0; j < Object.keys(jsonResult[tablenames[i]]['data']).length; j++) {

                let rowdataobject = jsonResult[tablenames[i]]['data'][j];
                let rowdataarray = [];
                for (let k = 0; k < Object.keys(rowdataobject).length; k++) {

                    rowdataarray[k] = rowdataobject[Object.keys(rowdataobject)[k]]
                }
                data[j] = (rowdataarray);
            }



        let name = tablenames[i];
        let cols = jsonResult[tablenames[i]]['columns'];


            let maindiv = createMainDivJ(name, cols, data);
            for (let j = 0; j < Object.keys(jsonResult[tablenames[i]]['maindiv']).length; j++) {
                let attname=Object.keys(jsonResult[tablenames[i]]['maindiv'])[j];
                let attval=jsonResult[tablenames[i]]['maindiv'][attname];
                attname=attname.substr(1,attname.length-2);
                maindiv.setAttribute(attname,attval)

            }
            maindiv.removeAttribute("connections");

        }

        var maindivs = document.querySelectorAll("div.maindiv");
        for (i = 0; i < maindivs.length; i++) {
            dragElement(maindivs[i]);
            let el1arr=maindivs[i].querySelectorAll("td[data-col-index='"+maindivs[i].getAttribute("lastcolindex")+"']");
            for(let k =0;k<el1arr.length;k++){
                let contentellipsis=el1arr[k].querySelector(".content.ellipsis");
                if(contentellipsis!=0){
                    let el2=document.querySelector("div[name='"+contentellipsis.innerHTML.replace(/\s+/g, "")+"']");
                    if(el2) {
                        connectElements(el1arr[k], el2);
                    }

                }
            }

        }


    }
    ummyes();


    fr.readAsText(files.item(0));

}

function newjsonwrite(){
    let allMainDivs= document.querySelectorAll(".maindiv")
    let json={};

    for(let i=0;i<allMainDivs.length;i++){
        let maindivs=[];
        let colnames=[];
        let rows=[];

        let tmp={};
        let attnames = allMainDivs[i].getAttributeNames()
        for(j=0;j<attnames.length;j++){
            let tmp2="'"+attnames[j]+"'";
            tmp[tmp2]=allMainDivs[i].getAttribute(attnames[j])
        }
        maindivs[i]=tmp;
        let coldivs = allMainDivs[i].querySelector(".data-table-header").querySelectorAll(".content.ellipsis")
        for(let j=1;j<coldivs.length;j++){
            //outerText czy innerHtml: możeliwe że outerTExt psuje, usuwa content.ellipsis
            colnames[j-1]=coldivs[j].innerHTML;
        }

        let rowdivs=allMainDivs[i].querySelector(".data-table-body").querySelectorAll(".data-table-row");
        for(let j=0;j<rowdivs.length;j++){
            let singlerow=rowdivs[j].querySelectorAll(".content.ellipsis")
            let singlerowdata=[];
            //k=1 bo pierwsz kolumna dodawana jest automatycznie i żeby jej nie kopiowac
            for(let k=1;k<singlerow.length;k++){
                singlerowdata[k-1]=singlerow[k].innerHTML;

            }
            rows[j]=singlerowdata;
        }
        let jsontmp={}
        jsontmp['maindiv']=tmp;
        jsontmp['columns']=colnames;
        jsontmp['data']=rows;
        json[allMainDivs[i].getAttribute("name")]=jsontmp;
    }

    console.log(json);
    downloadObjectAsJson(json, "data");
}


function allToJson() {
    var body = [].slice.call(document.getElementsByTagName('body'))[0];
    var json= body.innerHTML;
    downloadObjectAsJson(json, "data");

}
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

//uzupełnia document.body według pliku
function allFromJson(){
        var files = document.getElementById('selectFiles').files;
        console.log(files);
        if (files.length <= 0) {
            return false;
        }

        var fr = new FileReader();

        fr.onload = function(e) {
            console.log(e);
            var result = JSON.parse(e.target.result);
            var parser = new DOMParser();
            var htmlDoc2 = parser.parseFromString(result.Content, "text/html");
            document.body.innerHTML=result;

            //ustawanie dragelement od nowa dla kazdego maindiva
            var maindivs= document.querySelectorAll("div.maindiv");
            for(i=0;i<maindivs.length;i++){
                dragElement(maindivs[i]);

            }
            //ustawianie indexów maindivów i strzałek żeby uwzględniało te z jsona
            index=maindivs.length;
            arrindex=document.querySelectorAll("[arrow='true']").length;
            ummyes();

        }

        fr.readAsText(files.item(0));

}

