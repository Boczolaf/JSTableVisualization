let history = [];
let historyCount = 0;
let maxCount =0;
var observer = new MutationObserver(pushToHistory);


observer.observe(document.body, { childList: true, subtree: true });

window.onload=function () {
    history = [newjsonwritehistory()];
    historyCount = 0;
    maxCount =0;
}
/*
document.body.addEventListener('change', function () {
    console.log("History change");
    newjsonwritehistory();
    pushToHistory();
});*/

function pushToHistory() {
    if (historyCount < maxCount) {
        history.splice(historyCount+1);
    }
    let alter = newjsonwritehistory();
    if(document.getElementsByClassName("editing").length==0){
        console.log("save");
        history.push(alter);
        historyCount = historyCount + 1;
        maxCount = historyCount;

    }
}

function undo(){
    observer.disconnect();
    if(historyCount<1){
        console.log("Cannot undo, start of history");
    }else {
        console.log("Undoing");
        historyCount = historyCount - 1;
        let allDivsPast = document.querySelectorAll(".maindiv");
        for(let i=0;i<allDivsPast.length;i++){
            let lastcolindex = allDivsPast[i].getAttribute("lastcolindex");
            if (allDivsPast[i].hasAttribute("connectedcells")) {
                let rowindexes = allDivsPast[i].getAttribute("connectedcells").split(";");
                for (let i = 0; i < rowindexes.length; i++) {
                    disconnect(document.getElementById(rowindexes[i]))
                }
            }
            if (allDivsPast[i].hasAttribute("connections")) {
                let connections = allDivsPast[i].getAttribute("connections").split(";");
                for (let i = 0; i < connections.length; i++) {
                    disconnect(document.getElementById(connections[i].split(",")[0]))
                }
            }
        }
        for(let i=0;i<allDivsPast.length;i++) {
            allDivsPast[i].remove();
        }
        allFromJsonHistory(history[historyCount]);
        let allDivs = document.getElementsByClassName("maindiv");
        for(let i=0;i<allDivs.length;i++){
            dragElement(allDivs[i]);
        }
    }
    index = 0;
    observer.observe(document.body, { childList: true, subtree: true });
}

function redo(){
    observer.disconnect();
    if(historyCount==maxCount){
        console.log("Cannot redo, end of history");
    }else {
        historyCount = historyCount + 1;
        let allDivsPast = document.querySelectorAll(".maindiv");
        for(let i=0;i<allDivsPast.length;i++){
            let lastcolindex = allDivsPast[i].getAttribute("lastcolindex");
            if (allDivsPast[i].hasAttribute("connectedcells")) {
                let rowindexes = allDivsPast[i].getAttribute("connectedcells").split(";");
                for (let i = 0; i < rowindexes.length; i++) {
                    disconnect(document.getElementById(rowindexes[i]))
                }
            }
            //usuwa przychodzące strzałki
            if (allDivsPast[i].hasAttribute("connections")) {
                let connections = allDivsPast[i].getAttribute("connections").split(";");
                for (let i = 0; i < connections.length; i++) {
                    disconnect(document.getElementById(connections[i].split(",")[0]))
                }
            }

        }
        for(let i=0;i<allDivsPast.length;i++) {
            allDivsPast[i].remove();
        }
        allFromJsonHistory(history[historyCount]);
        let allDivs = document.getElementsByClassName("maindiv");
        for(let i=0;i<allDivs.length;i++){
            dragElement(allDivs[i]);
        }
    }
    index = 0;
    observer.observe(document.body, { childList: true, subtree: true });
}

