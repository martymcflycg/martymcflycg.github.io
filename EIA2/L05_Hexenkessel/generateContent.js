var L05_Hexenkessel;
(function (L05_Hexenkessel) {
    function generateContent(_data) {
        console.log(_data);
        for (let category in _data) {
            console.log(category);
            let items = _data[category];
            createMultiple(items, category);
            console.log(items);
            let group = null;
            switch (category) {
                case "zutaten":
                    group = createMultiple(items, category);
                    let fieldset = document.querySelector("#ingredients");
                    if (fieldset && group) {
                        fieldset.appendChild(group);
                    }
                    break;
                default:
                    break;
            }
        }
    }
    L05_Hexenkessel.generateContent = generateContent;
    function createMultiple(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            let stepper = document.createElement("input");
            stepper.type = "number";
            stepper.name = _category;
            stepper.id = item.name + "_stepper";
            stepper.step = "1";
            stepper.min = "0";
            stepper.max = "100";
            stepper.value = "0";
            //let absatz: HTMLElement = document.createElement("<br>");
            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(stepper);
            //group.appendChild(absatz);
        }
        return group;
    }
})(L05_Hexenkessel || (L05_Hexenkessel = {}));
//# sourceMappingURL=generateContent.js.map