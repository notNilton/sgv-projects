$(document).ready(function() {
    var $element1 = $("#element1");
    var $element2 = $("#element2");
    var $line = $("#line");

    $element1.draggable();
    $element2.draggable();

    function updateLine() {
        var pos1 = $element1.position();
        var pos2 = $element2.position();

        var x1 = pos1.left + $element1.width() / 2;
        var y1 = pos1.top + $element1.height() / 2;

        var x2 = pos2.left + $element2.width() / 2;
        var y2 = pos2.top + $element2.height() / 2;

        var length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        $line.css({
            width: length,
            top: y1,
            left: x1,
            transform: "rotate(" + angle + "deg)"
        });
    }

    $element1.on("drag", updateLine);
    $element2.on("drag", updateLine);

    // Initial line update
    updateLine();
});
