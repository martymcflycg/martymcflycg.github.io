namespace L05_Hexenkessel {

    export interface Item {
        name: string;
        price: number;
        stepper: boolean;
    }

    export interface Data {
        [category: string]: Item[];
    }

    export function generateContent(_data: Data): void {
        console.log(_data);

        for (let category in _data) {
            console.log(category);


            let items: Item[] = _data[category];
            createMultiple(items, category);

            
            console.log(items);
            let group: HTMLElement | null = null;

            switch (category) {
                case "zutaten":
                    group = createMultiple(items, category);

                    
                    let fieldset: HTMLFieldSetElement = document.querySelector("#ingredients");
                    if (fieldset && group) {
                        fieldset.appendChild(group);

                    }
                    break;
                default:
                    break;


            }
        }

    }
    function createMultiple(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;


            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            let stepper: HTMLInputElement = document.createElement("input");
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
}