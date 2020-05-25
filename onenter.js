//nacisniecie 'Enter' w dowolnym inpucie spowoduje utworzenie tabeli;
// nie trzeba używac przycisku 'Add table'

//var allInputs = document.getElementsByTagName("input");
var allinputscreate = document.querySelectorAll("form.formcreate input");

var allinputsconnect = document.querySelectorAll("form.formconnect input");
for(let i =0; i<allinputscreate.length; i++) {
    allinputscreate[i].addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            createMainDiv();
        }
    });
}
for(let i =0; i<allinputsconnect.length; i++) {
    allinputsconnect[i].addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            testbutton();
        }
    });
}
