// ------- Variablen -------- //
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let playerName = "Spielername"; // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP = 0; // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel = 1000;
let playerLevel = 10; // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix = ["todesmutige/r", "ängstliche/r", "fürchterliche/r", "giftige/r", "grüne/r", "baumgroße/r", "blinde/r", "große/r"];
let monsterName = [" Pikachu", " Nessie", " Waldschrat", " Spinne", " Kobold", " Löwe", " Pinguin", " Elefant", " Ungeziefer", " Riese",];
let suffix = [" mit Menschenhass", " der im dunkeln Leuchtet", " mit Holzbein", " mit Spinnenphobie", " mit Toupet", " des Königs", " aus der Unterwelt", " mit neuer Hüfte", " ohne Beine", " mit Hawaiihemd ", " mit Penthouse-Wohnung", " mit Nussallergie"];
let monsterModifers = ["wasserfest", "Analphabet", "schwach", "stinkt", "stubenrein", "spielsüchtig", "aggressiv", "elegant", "rassistisch", "menschenscheu", "Verläuft sich oft"];
let monsterLebensraum = ["Loch Ness", "Mordor", "Zauberwald", "Westeros", "Gotham City", "Pfalz", "Schwarzwald"];
let monsterBild = ["imgs/Pika.png", "imgs/Nessie.png", "imgs/elefant.png", "imgs/loewe.png", "imgs/pinguin.png", "imgs/Waldschrat.png", "imgs/Kobold.png", "imgs/Riese.png", "imgs/Spinne.png", "imgs/Ungeziefer.png",];
let monsterArray = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.
// ----------- Funktionen ----------- //
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel();
    console.log("" + document.getElementById("monsterSpawner").innerHTML);
    document.getElementById("fightAllMonsters").addEventListener("click", fightAllMonsters, false);
    document.getElementById("fightAllWeakMonsters").addEventListener("click", fightAllWeakMonsters, false);
    document.getElementById("fightWeakestMonster").addEventListener("click", fightWeakestMonster, false);
};
// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster() {
    let newNr = getRNGNumber(4);
    for (let i = 0; i < newNr; i++) {
        let newMonsterName = generateMonsterName();
        let newMonsterLebensraum = generateMonsterLebensraum();
        let newMonsterBild = generateMonsterBild();
        let newMonsterHP = generateMonsterHitPoints();
        let newMonsterXP = generateMonsterXP();
        let newMonsterModifier = generateMonsterModifer();
        let newMonsterLevel = generateMonsterLevel();
        let newMonster = {
            monsterName: newMonsterName,
            monsterHealthPoints: newMonsterHP,
            monsterExperience: newMonsterXP,
            monsterModifier: newMonsterModifier,
            monsterBild: newMonsterBild,
            monsterLebensraum: newMonsterLebensraum,
            monsterLevel: newMonsterLevel,
        };
        monsterArray.push(newMonster);
        updateHTML();
        console.log(monsterArray[0].monsterExperience);
    }
}
function getMonsterCount() {
    return monsterArray.length;
}
function updateHTML() {
    clearMonsterCell();
    monsterGenerateHTMLAll();
    console.log(getMonsterCount() + " Monster sind Momentan im Spiel");
}
function monsterGenerateHTMLAll() {
    for (let i = 0; i < getMonsterCount(); i++) {
        monsterGenerateHTML(i);
    }
}
function clearMonsterCell() {
    let monsterChild = document.getElementById(monsterHolder);
    while (monsterChild.firstChild) {
        monsterChild.removeChild(monsterChild.firstChild);
    }
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(i) {
    let monsterZähler = i;
    console.log("Momentan gibt es: " + monsterZähler + "Monster");
    let holdingDiv = document.createElement("div");
    holdingDiv.setAttribute("class", "monster");
    holdingDiv.setAttribute("id", "monster" + i);
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[i].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterLeb = document.createElement("p"); // Generiere einen <p>
    monsterLeb.innerHTML = monsterArray[i].monsterLebensraum;
    holdingDiv.appendChild(monsterLeb);
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[i].monsterModifier[0] + ", " + monsterArray[i].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[i].monsterBild);
    let HP = document.createElement("p");
    HP.innerHTML = "Health Points:" + monsterArray[i].monsterHealthPoints;
    holdingDiv.appendChild(HP);
    let XP = document.createElement("p");
    XP.innerHTML = "Experience:" + monsterArray[i].monsterExperience;
    holdingDiv.appendChild(XP);
    let monsterLvl = document.createElement("p"); // Generiere einen <p>
    monsterLvl.innerHTML = "Level: " + monsterArray[i].monsterLevel; // Inhalt des <p>: Monster-Item des letzten Monsters im Array.
    holdingDiv.appendChild(monsterLvl);
    // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monsterBtn = document.createElement("BUTTON");
    // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn);
    // Füge den Button zu dem holding-div hinzu.
    let monsterCount = i; // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    console.log("Aktuelle Anzahl an Monstern: " + monsterCount);
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(monsterCount); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
}
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber);
}
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für das Monster
    let rngNumber = getRNGNumber(prefix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
function generateMonsterBild() {
    let bildErstellen;
    bildErstellen = monsterBild[getRNGNumber(monsterBild.length)];
    return bildErstellen;
}
function generateMonsterLebensraum() {
    let lebensraumErstellen;
    lebensraumErstellen = monsterLebensraum[getRNGNumber(monsterLebensraum.length)];
    return lebensraumErstellen;
}
// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP = 1 + getRNGNumber(10);
    return tempMonsterHP;
}
function generateMonsterXP() {
    let tempMonsterXP = 300 + getRNGNumber(500);
    return tempMonsterXP;
}
function generateMonsterModifer() {
    let tempMonsterMod = [];
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)];
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)];
    return tempMonsterMod;
}
function fightMonster(_index) {
    console.log("Spieler kämpft gegen Monster und gewinnt!");
    if (playerLevel > monsterArray[_index].monsterLevel) {
        playerXP += monsterArray[_index].monsterExperience;
        monsterArray.splice(_index, 1);
    }
    else if (playerLevel < monsterArray[_index].monsterLevel) {
        playerXP -= monsterArray[_index].monsterExperience;
    }
    updatePlayerLevel();
    updateHTML();
}
function fightAllMonsters() {
    for (let i = monsterArray.length - 1; i >= 0; i--) {
        fightMonster(i);
    }
}
function fightAllWeakMonsters() {
    for (let i = monsterArray.length - 1; i >= 0; i--) {
        if (monsterArray[i].monsterLevel <= playerLevel)
            fightMonster(i);
    }
}
function fightWeakestMonster() {
    let tempWeakestMonsterNr = 0;
    for (let i = 0; i < monsterArray.length; i++) {
        if (monsterArray[i].monsterLevel < monsterArray[tempWeakestMonsterNr].monsterLevel)
            tempWeakestMonsterNr = i;
    }
    fightMonster(tempWeakestMonsterNr);
}
function updatePlayerLevel() {
    playerLevel = Math.floor(playerXP / playerXPperLevel); // Spieler-Level = XP / XPproLevel
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLevel + " (XP: " + playerXP + " / " + playerXPperLevel * /*multiplizieren statt addieren*/ (playerLevel + 1) + ")"; // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + playerLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.
    if (playerLevel == 20) {
        alert("Du hast gewonnen!");
    }
    if (playerLevel < 0) {
        alert("Du hast verloren!");
    }
}
function lebensraumErweitern() {
    console.log("gleich wird der lebensraum der Monster erweitert werden");
    monsterLebensraum.push("Verbotener Wald");
    monsterLebensraum.push("dunkle Höhle");
    monsterLebensraum.push("Sonne");
    monsterLebensraum.push("Traumland");
    monsterLebensraum.push("indischer Ozean");
    monsterLebensraum.push("Wunderland");
    console.log("Nun befinden sich die Monster in ihrem natürlichen Lebensraum.");
}
lebensraumErweitern();
console.log(monsterLebensraum);
//# sourceMappingURL=62-TS-Example.js.map