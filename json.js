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