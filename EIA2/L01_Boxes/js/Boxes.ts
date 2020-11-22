var Boxes;
(function (Boxes) {
    var n = 5;
    var color;
    var x = 0;
    var y = 0;
    debugger;
    for (var i = 0; i < n; i++) {
        y += (i == 2) ? 20 : 50;
        x = (x + 170) % 400;
        switch (i) {
            case 0:
                color = "#ff0000";
                break;
            case 1:
            case 4:
                color = "#00ff00";
                break;
            case 3:
                continue;
            default:
                color = "#0000ff";
        }
        for (var _i = 0, _a = ["big", "medium", "small"]; _i < _a.length; _i++) {
            var size = _a[_i];
            createBox(color, x, y, size);
            if (i == 4)
                break;
        }
    }
    function createBox(_color: string, _x: string | number, _y: string | number, _size: string) {
        var div = document.createElement("div");
        document.body.appendChild(div);
        div.classList.add(_size);
        div.style.backgroundColor = _color;
        div.style.left = _x + "px";
        div.style.top = _y + "px";
    }
})(Boxes || (Boxes = {}));
