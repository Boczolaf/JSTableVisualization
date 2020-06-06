function addListeners(){
    //narazie tworzy we wszystkich tabelkach
    //można tylko do podanej ograniczyć bo i tak chyba tylko przy tworzeniu to wywołujesz
    //chyba że przy odczycie z jasona też

    let tables = document.querySelectorAll(".maindiv");
    for(let i=0;i<tables.length;i++){
        let ind="td[data-col-index='"+tables[i].getAttribute("lastcolindex")+"']";
        let column = tables[i].querySelectorAll(ind);
        for(let j =1;j<column.length;j++){
            column[j].id="lastcol"+"|"+(j-1)+"|"+tables[i].id;
            column[j].addEventListener('change', (event) =>{

                if(lastchangeCell!=event.composedPath()[0] && lastchangeString !=event.composedPath()[0].value) {


                    lastchangeString = event.composedPath()[0].value;
                    lastchangeCell = event.composedPath()[0];
                    if (event.composedPath()[2].hasAttribute("connectedto")) {
                        disconnect(event.composedPath()[2])

                    }

                    let connections = event.composedPath()[0].value.split(",");
                    for(let g=0; g<connections.length;g++) {
                        let el2name = "div[name='" + connections[g] + "']";
                        let el2 = document.querySelector(el2name.replace(/\s+/g, ""));
                        let el1 = event.composedPath()[2]
                        if (el2) {
                            if (el1.id == el2.id) {
                            } else {
                                connectElements(el1, el2);
                            }

                        }
                    }
                }
            })
        }
    }
}
var lastchangeCell=null;
var lastchangeString="";
var lastcolindex = 0
function getNextLastColIndex(){
    lastcolindex = lastcolindex +1;
    return lastcolindex;

}
