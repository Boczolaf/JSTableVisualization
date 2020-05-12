//nacisniecie 'Enter' w dowolnym inpucie spowoduje utworzenie tabeli;
// nie trzeba używac przycisku 'Add table'

var allInputs = document.getElementsByTagName("input");


for(let i =0; i<allInputs.length; i++) {
    allInputs[i].addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            createMainDiv();
        }
    });
}
