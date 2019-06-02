// BEISPIEL UND AUFGABE:
// Dieses Skript soll als Beispiel dazu dienen, wie Interfaces und Arrays genutzt werden können.
// Hier wird ein ungefährer Aufbau eines simplen Klick-Spiels gezeigt. Der Nutzer kann dabei durch Button ein neues Monster erstellen.
// Zu beginn werden hier zuerst Interfaces, danach Variablen deklariert.
// Weiter unten kommen dann die Funktionen.
// ------- Variablen -------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Variablen: I (1 / einer)
let saveImageSrc;
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let playerName = "Spielername"; // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP = 0; //Fehler 1 gefunden: Anfangswert wurde auf 0 festgelegt                                                   // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel = 500;
let PlayerItems = "Dolch"; // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix = ["Wald-", "Seuchen-", "Uralte(s) ", "Gift-", "Brennende(s) ", "Kniescheibenzertrümmernde(s)", "blutrünstige(s)", "furchtlose(s)", "Feuer-", "böse(s)", "sagenumwogene(s)"]; // length = 6, da 6 Einträge. Von 0-5.
let monsterName = ["Ratte", "Nagetier", "Ungeziefer", "Nessie", "Ritter", "Spinne", "Wolf", "Waschbär"];
let suffix = [" des Verderbens", " aus der Hölle", " der Lethalität", " mit Rheuma", " der Redundanz", " der Zerberstung", "des Todes", "der Verwirrung", "aus der Pfalz", "der Vernunft", "aus dem Osten"]; // length = 6, da hier 6 Einträge sind. Von 0-5.
let Item = ["Stock", "Flammenschwert", "Blumenvase", "Feuerzeug", "Murmel", "Säbel", "Revolver", "Mittelfinger"];
let monsterModifers = ["Ist nervig", "Linkshänder", "Bier-Connoisseur", "Verfehlt häufig", "Prokrastiniert", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.
let monsterIcon = ["Ratte.png", "Nagetier.png", "Ungeziefer.jpg", "Nessie.jpg", "Ritter.jpg"];
let PushArray = [];
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.
// ----------- Funktionen ----------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Funktionen: IIIII (5 / fünf)
// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel("nichts"); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    console.log("" + document.getElementById("monsterSpawner").innerHTML); ///////////////////MONSTERSPAWNER BUTTONINHALT KANN NICHT AUSGEGEBEN WERDEN WENN DAS ELEMENT NOCH NICHT ERSTELLT WURDE\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    document.getElementById("Arraypusher").addEventListener("click", pusher);
};
//Fehler 1 gefunden: Konsolenausgabe gelöscht
// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster() {
    let newMonsterName = generateMonsterName(); // Eigens-gebaute Funktion, welche einen string zurück gibt.
    let newMonsterHP = generateMonsterHitPoints(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
    let newMonsterItem = generateMonsterItem(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterIcon = generateMonsterIcon();
    let newMonster = {
        monsterName: newMonsterName,
        monsterHealthPoints: newMonsterHP,
        monsterExperience: newMonsterXP,
        monsterModifier: newMonsterModifier,
        monsterIcon: newMonsterIcon,
        Item: newMonsterItem
        //Fehler 2 gefunden: Geldmechanik auskommentiert
    };
    monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
    console.log(monsterArray[monsterArray.length - 1].monsterExperience); //Fehler 3: um von 0 aus zu zählen muss 1 von arrayname.length abgezogen werden               // Man kann nur auf Array-Teile zugreifen, welche definiert sind. -1 ist nicht definitiert (und wird es auch nie sein).
    monsterGenerateHTML(monsterArray.length); // Triggere die Generierung von HTML
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(count) {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + monsterArray.length); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterArray.length - 1].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[monsterArray.length - 1].monsterModifier[0] + ", " + monsterArray[monsterArray.length - 1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", "imgs/pinguin.png"); // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    let monsterCount = monsterArray.length; // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    console.log("Aktuelle Anzahl an Monstern: " + monsterCount);
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(monsterCount); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
}
// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [x] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber) {
    // let rngNumber : number = Math.random();                             // Macht folgendes: Generiere eine zufällige Komma-Zahl zwischen 0 - 1.
    // rngNumber = rngNumber * _maxNumber;                                 // Multipliziere diese Zahl mit der Länge des entsprechenden Array (hier: _maxNumber, ein Parameter, siehe in der runden Klammer der Funktion).
    //  rngNumber = Math.floor(rngNumber);                                  // Floore diese Zahl, damit diese nun Ganzzahlig ist.            //(Hier war Fehler 4)                                        
    //  return rngNumber; 
    return Math.floor(Math.random() * _maxNumber); // Gebe diese Zahl zurück, Funktion kann ähnlich einer Variable in Rechnungen genutzt werden.
}
// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für das Monster
    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber = getRNGNumber(prefix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Fehler 5: Wert 0 wurde als Monstername genommen
    // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP = 1 + getRNGNumber(10);
    return tempMonsterHP;
}
// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 350) + 100 zurück.
    let tempMonsterXP = 100 + getRNGNumber(350);
    return tempMonsterXP;
}
// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
function generateMonsterItem() {
    let tempMonsterItem;
    tempMonsterItem = Item[getRNGNumber(Item.length)];
    return tempMonsterItem;
}
function generateNewImageSource(MonsterName) {
    if (monsterIcon.length >= monsterName.length) {
        saveImageSrc = "imgs/" + monsterIcon[MonsterName];
    }
    else {
        saveImageSrc = "imgs/error.png";
    }
    // Aufgerufen, wenn man auf den Button klickt.
    // Der Spieler kämpft gegen das entsprechende Monster. Er erhält dann Erfahrungspunkte.
    function fightMonster(_index) {
        console.log("Spieler kämpft gegen Monster und gewinnt!"); // Ohne Logik mit if/else ist so etwas wie ein Kampf nicht leicht umzusetzen.
        console.log("Das Monster weigert sich zu verschwinden."); // Wird nächste Stunde erweitert.
        console.log("Du bekommst des Monsters ITEM! -> " + monsterArray[_index - 1].Item);
        playerXP += monsterArray[_index - 1].monsterExperience; // _index ist in diesem Fall die Länge des Arrays - allerdings zählt der Computer beginnend von null, nicht eins! Deshalb _index-1.
        updatePlayerItems(monsterArray[_index - 1].Item);
        updatePlayerLevel(monsterArray[_index - 1].Item);
        removeMonsters(_index);
    }
    // Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
    function updatePlayerLevel(neuesItem) {
        let tempLevel = Math.floor(playerXP / playerXPperLevel); // Spieler-Level = XP / XPproLevel
        document.getElementById("xpCounter").innerHTML = "Player-Level: " + tempLevel + " (XP: " + playerXP + " / " + playerXPperLevel + ")"; // Baue den String für die Spieler-Info zusammen
        console.log("Spieler " + playerName + " hat nun Level " + tempLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.
    }
    //fügt demn Spieler neue Items hinzu
    function updatePlayerItems(neuesItem) {
        PlayerItems += ", " + neuesItem;
    }
    //löscht Eliminierten Gegner aus... alle anderen rücken vor
    function removeMonsters(_index) {
        //let tempMonsterArray: Monster[] = [];
        //document.getElementById(monsterHolder).innerHTML = "";
        //monsterArray = tempMonsterArray;
        //console.log("so viel is noch im array" + monsterArray.length);
        document.getElementById(monsterHolder).innerHTML = "";
        let tempMonsterArray = [];
        let count = 0;
        while (count < _index - 1) {
            tempMonsterArray[count] = monsterArray[count];
            console.log("das Temporäre Array ist  " + tempMonsterArray[count].monsterName);
            count++;
        }
        while (count < monsterArray.length - 1) {
            tempMonsterArray[count] = monsterArray[count + 1];
            console.log("das Temporäre Array ist  " + tempMonsterArray[count].monsterName);
            count++;
        }
        count = 1;
        monsterArray = [];
        monsterArray = tempMonsterArray;
        while (count <= monsterArray.length) {
            monsterGenerateHTML(count);
            count++;
        }
        function pusher() {
            PushArray.push(Math.random());
            console.log(PushArray);
        }
    }
}
//# sourceMappingURL=script.js.map