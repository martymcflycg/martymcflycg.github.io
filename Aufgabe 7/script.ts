//Konsolenausgabe//
console.log("Website geladen");
window.onload = function() {
window.alert("OK klicken, um die Seite zu betreten");
document.getElementById("b1").addEventListener("click", ChangeText1);
let number4: number = 4;
console.log(number4 = 5);

let number1: number = 1;
let number2: number = 2;
console.log(number1 + number2);

let variable1: string = "Speedy";
let variable2: string = "Gonzalez";
console.log(variable1 + variable2);

let MyName: string= "Samuel, ";
let MyAge: number = 21;
console.log(MyName + MyAge);
}
document.write("Dieser Text ist in TypeScript erstellt"); // Ein richtiges Element herzustellen hat nicht richtig funktioniert :/ //

//Enttäuschung//
function ChangeText1(){
    console.log ("b1 wurde gedrückt");
    document.getElementById("b1").innerHTML = "Enttäuschung mach sich breit";
}
function ChangeStuff (){
    document.getElementById ("b2").className = "class2";
console.log("Klasse geändert")
document.getElementById("b2").innerHTML="Soeben habe ich meine Klasse gewechselt";
document.getElementById("b2").className="class2";
}
window.onclick = function classchange() //Klasse ändern
{
  console.log("Klasse geändert")
  document.getElementById("b2").innerHTML="Na toll";
  document.getElementById("b2").className="class2";
}

