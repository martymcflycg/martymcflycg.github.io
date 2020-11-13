var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var L05_Hexenkessel;
(function (L05_Hexenkessel) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start");
            let response = yield fetch("Data5.json");
            let offer = yield response.text();
            let data = JSON.parse(offer);
            L05_Hexenkessel.generateContent(data);
            //let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
            document.querySelector("#infos").addEventListener("click", handleInfos);
            document.querySelector("#zutaten").addEventListener("click", handleZutaten);
            document.querySelector("#abbruchbutton").addEventListener("click", handleAbbruch);
            document.querySelector("#submit").addEventListener("click", submitToServer);
        });
    }
    function handleInfos(_event) {
        // console.log(_event);
        let kessel = document.querySelector("#kessel");
        // console.log(kessel.value + kessel);
        let inputs = document.querySelectorAll("input");
        console.log(inputs);
        let info = document.querySelector("div#info");
        info.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) { // solange Einträge im Formular
            //debugger;
            let item = document.querySelector("[value='" + entry[1] + "']"); //item mitsamt Infos wird aufgegriffen bzw selektiert
            if (entry[1] != null && entry[0] == "Name" && entry[1] != "") {
                info.innerHTML += "Name: " + entry[1] + "<br>";
            }
            if (item != null && entry[0] == "Datalist") {
                info.innerHTML += "Wirkung: " + entry[1] + "<br>";
            }
            if (entry[0] == "Kessel" && item != null) {
                let price = parseInt(item.getAttribute("price"));
                info.innerHTML += "Gefäß: " + entry[1] + " (" + price + "  Galleonen) " + "<br>" + "______________________" + "<br>";
            }
        }
    }
    function handleZutaten(_event) {
        let inputs = document.querySelectorAll("input");
        console.log(inputs);
        let anweisung = document.querySelector("div#anweisung");
        // anweisung.innerHTML = "";
        let formData2 = new FormData(document.forms[1]); //Formular (<form> - Tag) -> 0 ist falls es mehrere gibt, dass es 1. Formular wählt, alle Inhalte aus Formular werden ausgewählt
        for (let entry of formData2) { // solange Einträge im Formular
            //debugger;
            let item = document.querySelector("[value='" + entry[1] + "']"); //item mitsamt Infos wird aufgegriffen bzw selektiert
            //let stepper: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[0] + "']");
            if (item != null && item.type == "checkbox") {
                // let mengenangabe: string = document.getElementById(item.name + "_anzahl").getAttribute("mengenangabe")!; //Attribut mengenangabe vom elemnet mit id _anzahl wird aufgegriffen
                let price = parseInt(item.getAttribute("price")); //string zu number geparsed, Attribute price wird rausgegriffen         price * parseInt(item.getElementById(item.name + "_anzahl").getAttribute("value")!)   geht nicht
                console.log(document.getElementById(item.id + "_stepper").value);
                anweisung.innerHTML += "Füge " + document.getElementById(item.id + "_stepper").value + document.getElementById(item.name).value + " " + item.value + " hinzu" + " (" + price + "Galleonen)" + "<br>"; // schreibt in Rezept den Wert des Attributs mit id anzahl + mengenangabe + preis 
                /* console.log((<HTMLInputElement>document.getElementById(item.getAttribute("id") + "_anzahl")).value);
                console.log(document.getElementById(item.name + "_anzahl")); */
            }
        }
    }
    function handleAbbruch(_event) {
        let inputs = document.querySelectorAll("input");
        console.log(inputs);
        let anweisung = document.querySelector("div#anweisung");
        //anweisung.innerHTML = "";
        let formData2 = new FormData(document.forms[1]); //Formular (<form> - Tag) -> 0 ist falls es mehrere gibt, dass es 1. Formular wählt, alle Inhalte aus Formular werden ausgewählt
        for (let entry of formData2) { // solange Einträge im Formular
            //debugger;
            let item = document.querySelector("[value='" + entry[1] + "']"); //item mitsamt Infos wird aufgegriffen bzw selektiert
            if (item != null && item.type == "radio") {
                if (item.className == "temp") {
                    anweisung.innerHTML += "Den Trank auf " + document.getElementById("temperatur").value + " °C " + document.getElementById(item.value).value + "<br>";
                }
                if (item.className == "rühren") {
                    anweisung.innerHTML += "Den Trank " + document.getElementById(item.id).id + "<br>";
                }
            }
            if (item != null && item.type == "color") {
                anweisung.innerHTML += " bis er die Farbe " + document.getElementById(item.name).value + " annimmt" + "<br>";
            }
            if (item != null && item.name == "konsistenz1") {
                anweisung.innerHTML += " bis er " + document.getElementById(item.name).value + " ist" + "<br>";
            }
        }
    }
})(L05_Hexenkessel || (L05_Hexenkessel = {}));
function submitToServer(_event) {
    return __awaiter(this, void 0, void 0, function* () {
        // let formData: FormData = new FormData(form);
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        let formData2 = new FormData(document.forms[1]);
        let query2 = new URLSearchParams(formData2);
        let url = "potion.html?" + query.toString() + "&" + query2.toString();
        console.log(url);
        let response = yield fetch(url);
        console.log(response);
        alert("Dein Rezept wurde versendet.");
        /*  await fetch("index.html?" + query.toString());
         alert("Rezept gesendet"); */
        //let rezept: HTMLDivElement = <HTMLDivElement>document.querySelector("div#f3");
    });
}
//# sourceMappingURL=recipe.js.map