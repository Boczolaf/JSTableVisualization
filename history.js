let history = [newjsonwritehistory()];
let historyCount = 0;
let maxCount =0;
/*const observer = new MutationObserver(pushToHistory);
let whole = document.body.childNodes;
observer.observe(document.querySelectorAll(".maindiv"),{attributes:true,
    characterData: true,
    childList: true,
    attributeFilter : true,
    attributeOldValue : true,
    characterDataOldValue : true,
    subtree : true});*/

function pushToHistory(){
    if(historyCount<maxCount){
        history.splice(historyCount+1);
    }
    let alter =newjsonwritehistory()
    if(history[historyCount]!=(alter)) {
        history.push(alter);
        historyCount = historyCount + 1;
        maxCount = historyCount;
    }
}

function undo(){
    if(historyCount<1){
        console.log("Cannot undo, start of history");
    }else {
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
}

function redo(){
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
}

