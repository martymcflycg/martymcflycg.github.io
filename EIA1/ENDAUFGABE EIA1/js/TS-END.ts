interface Card {                    //Interface für Karten erstellt
    id: string;
    color: number;
    value: number;
}

let stack: Card[] = [];
let player: Card[] = [];
let computer: Card[] = [];
let game: Card[] = [];

var work = false;
var played = false;
var ingame = false;

let isVisible = false;

function generateCards() {                                  //Karten werden generiert
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j < 10; j++) {
            var id = i + "-" + j
            stack.push({ id: id, color: i, value: j });
        }
    }
    stack = shuffle(stack);
}

function shuffle(array: any[] | Card[]) {                 //Durchmischen vor dem Start
    for (var i = array.length - 1; i > 0; i--) {
        var r = Math.random() * (i + 1);
        var ri = Math.floor(r);
        var tmp = array[i];
        array[i] = array[ri]
        array[ri] = tmp;
    }
    return array;
}

function isEmpty(array: Card[]) {
    if (array.length == 0) {
        return true;
    } else {
        return false;
    }
}

function cardToPlayer() {                       //Karten aufnehmen
    if (!isEmpty(stack)) {
        player.push(stack[0]);
        stack.splice(0, 1);
    } else {
        alert("Der Stapel ist leer");
    }
}

function cardToTable() {                    //Karten ablegen
    if (!isEmpty(stack)) {
        game.push(stack[0]);
        stack.splice(0, 1);
    } else {
        alert("Der Stapel ist leer");
    }
}

function cardToComputer() {             //Computer nimmt Karte auf
    if (!isEmpty(stack)) {
        computer.push(stack[0]);
        stack.splice(0, 1);
    } else {
        alert("Der Stapel ist leer");
    }
}

function dealCards() {                  //Karten austeilen
    cardToPlayer();
    cardToComputer();
    cardToPlayer();
    cardToComputer();
    cardToPlayer();
    cardToComputer();
    cardToPlayer();
    cardToComputer();
    cardToTable();
}

function start() {                  //Start-Funktion
    stack = [];
    player = [];
    computer = [];
    game = [];
    ingame = true;
    work = false;
    played = false;
    generateCards();
    dealCards();
    loadTable();
}

function getTopCard() {                     // ? Problem
    if (!isEmpty(game)) {
        return game[game.length - 1];
    }
}

function loadTable() {
    var playercards = "";
    if (player.length != 0) {
        player.forEach(function (card) {
            playercards = playercards + createCard(false, card, true);
        })
    }
    var computercards = "";
    if (computer.length != 0) {
        computer.forEach(function (card) {
            card.id = "";
            computercards = computercards + createCard(true, card, true);
        })
    }
    var stackcard = "";
    if (stack.length != 0) {
        stackcard = createCard(true, { id: "nc", color: 0, value: 0 }, false);
    }
    var gamecard = "";
    if (game.length != 0) {
        gamecard = createCard(false, getTopCard(), false);
    }
    document.getElementById("Karten").innerHTML = gamecard;                                  //Eigentlicher Spielvorgang
    document.getElementById("Hauptstapel").innerHTML = stackcard;
    document.getElementById("Spielerkarten").innerHTML = playercards;
    document.getElementById("Computerkarten").innerHTML = computercards;
}

function createCard(back: boolean, card: Card, createItemDiv: boolean) {                        //Werte und Farben
    var colorn = "none";
    var valuen = "X"
    switch (card.color) {
        case 1:
            colorn = "blue";
            break;
        case 2:
            colorn = "red";
            break;
        case 3:
            colorn = "yellow";
            break;
        case 4:
            colorn = "green";
            break;
    }

    if (card.value < 11) {
        valuen = card.value.toString();
    } else {
        switch (card.value) {
            case 11:
                valuen = "11";
                break;
            case 12:
                valuen = "12";
                break;
            case 13:
                valuen = "13";
                break;
        }
    }

    var carddiv = "";
    if (back) {
        if (createItemDiv) {
            carddiv = carddiv + `<div class="item">`
        }
        carddiv = carddiv +
            `
            <div onclick=clickCard("${card.id}") id="${card.id}" class="stackcard card back"></div>
            <div onclick=clickCard("${card.id}") id="${card.id}" class="stackcard card back cardRot"></div>
            `;
        if (createItemDiv) {
            carddiv = carddiv + `</div>`
        }
    } else {
        if (createItemDiv) {
            carddiv = carddiv + `<div class="item">`
        }
        carddiv = carddiv +
            `
            <div onclick=clickCard("${card.id}") id="${card.id}" class="stackcard card">
                <div class="value">${valuen}</div>
                <div class="${colorn}"></div>
            </div>
            <div onclick=clickCard("${card.id}") id="${card.id}" class="stackcard card cardRot">
                <div class="value">${valuen}</div>
                <div class="${colorn}"></div>
            </div>
            `;
        if (createItemDiv) {
            carddiv = carddiv + `</div>`
        }
    }
    return carddiv;
}

function hasPlayerCard(card: Card) {
    var ok = false;
    player.forEach(function (pcard) {
        if ((pcard.color == card.color) && (pcard.value == card.value)) {
            ok = true;
        }
    })
    return ok;
}

function getCardIndex(array: Card[] | { value: number; }[], card: Card) {
    var ind = -1;
    for (var i = 0; i < array.length; i++) {
        if ((array[i].color == card.color) && (array[i].value == card.value)) {
            ind = i;
        }
    }
    return ind;
}

function cardCanBePlayed(card: Card) {
    var ok = false;
    if (!isEmpty(game)) {
        var tc = getTopCard();
        if ((tc.color == card.color) || (tc.value == card.value)) {
            ok = true;
        }
    }
    return ok;
}

function playCardPlayer(card: Card) {
    if (!isEmpty(player)) {
        var ind = getCardIndex(player, card);
        game.push(player[ind]);
        player.splice(ind, 1);
        return card;
    }
}

function canPlayerPlay() {
    if (!isEmpty(player)) {
        var tc = getTopCard();
        var ok = false;
        for (var i = 0; i < player.length; i++) {
            if ((player[i].color == tc.color) || (player[i].value == tc.value)) {
                ok = true;
            }
        }
        return ok;
    } else {
        return false;
    }
}

function canComputerPlay() {
    if (!isEmpty(computer)) {
        var tc = getTopCard();
        var ok = false;
        for (var i = 0; i < computer.length; i++) {
            if ((computer[i].color == tc.color) || (computer[i].value == tc.value)) {
                ok = true;
            }
        }
        return ok;
    } else {

        return false;
    }
}

function playCardComputer() {
    if (!isEmpty(computer)) {
        var tc = getTopCard();
        var ok = false;
        console.log(tc);
        for (var i = 0; i < computer.length; i++) {
            if ((computer[i].color == tc.color) || (computer[i].value == tc.value)) {
                game.push(computer[i]);
                computer.splice(i, 1);
                ok = true;
                return;
            }
        }
        if (!ok) {
            cardToComputer();
        }
    } else {
        cardToComputer();
    }
}

function checkStack() {
    if (isEmpty(stack)) {
        if (game.length > 1) {
            var temp = getTopCard();
            stack = game;
            stack.slice(stack.length - 1, 1)
            game = [temp];
        } else {
            if (!isEmpty(game)) {
                if (!canPlayerPlay && !canComputerPlay) {
                    ingame = false;
                    alert("Unentschieden :/");                                  // \_(*_*)_/
                }
            }
        }
    }
}

function clickCard(id: string) {
    if (!ingame) {
        return;
    }
    var tc = getTopCard();
    if (work) {
        return;
    }
    played = false;
    work = true;
    if (id == "nc") {
        cardToPlayer();
        played = true;
    } else if (id == "") {
        work = false;
        return;
    }
    else {
        var spl = id.split("-", 2);
        var color = +spl[0];
        var value = +spl[1];
        let card: Card = { id: id, color: color, value: value };
        if (!hasPlayerCard(card)) {
            work = false;
            return;
        }
        if (!cardCanBePlayed(card)) {
            work = false;
            return;
        }
        playCardPlayer(card);
        played = true;
    }
    loadTable();
    if (isEmpty(player)) {
        ingame = false;
        alert("Glückwunsch! Du hast gewonnen!");                                //Sieg
        return;
    }
    setTimeout(() => {
        if (played) {
            playCardComputer();
            loadTable();
        }
        if (isEmpty(computer)) {
            ingame = false;
            alert("Du hast leider verloren!");                                //Niederlage
        }
        work = false;
    }, 1000);
    checkStack();
}
