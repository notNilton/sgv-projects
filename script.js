let nodes = [];
let connectors = [];
let selectedNode = null;
let isDragging = false;
let isDrawingConnector = false;
let startConnector = null;

function createNode(x, y) {
    const node = document.createElement('div');
    node.className = 'node';
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.innerHTML = 'Node';
    document.getElementById('diagram-container').appendChild(node);

    // Adicione conectores à esquerda e à direita do nó
    const leftConnector = createConnector(-5, '50%', node);
    const rightConnector = createConnector('100%', '50%', node);

    node.addEventListener('mousedown', (e) => {
        selectedNode = node;
        isDragging = true;
    });

    return node;
}

// document.getElementsByClassName('node').addEventListener('mousedown', (e) =>{
//     selectedNode = node;
//     isDragging = true;
// });

function createConnector(left, top, node) {
    const connector = document.createElement('div');
    connector.className = 'connector';
    connector.style.left = left;
    connector.style.top = top;
    node.appendChild(connector);
    return connector;
}

document.getElementById('add-node').addEventListener('click', () => {
    const x = Math.random() * 700;
    const y = Math.random() * 500;
    const node = createNode(x, y);
    nodes.push(node);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        selectedNode.style.left = e.clientX - selectedNode.offsetWidth / 2 + 'px';
        selectedNode.style.top = e.clientY - selectedNode.offsetHeight / 2 + 'px';
        // path start and ending on svg
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
                    " H" + (endX - delta*signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                    " V" + endY );
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer = $("#svgContainer");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);

}

function connectAll() {
    // connect all the paths you want!
    // connectElements($("#svg1"), $("#path1"), $("#node"),   $("#node"));
}

createNode(200, 200);
createNode(400, 400);
connectAll();
