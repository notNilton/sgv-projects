let nodes = [];
let lines = [];
let isDrawingLine = false;
let startNode = null;

function createNode(x, y) {
    const node = document.createElement('div');
    node.className = 'node';
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.innerHTML = 'Node';
    document.getElementById('diagram-container').appendChild(node);

    const leftConnector = document.createElement('div');
    leftConnector.className = 'connector';
    leftConnector.style.left = '-5px';
    leftConnector.style.top = '50%';
    node.appendChild(leftConnector);

    const rightConnector = document.createElement('div');
    rightConnector.className = 'connector';
    rightConnector.style.right = '-5px';
    rightConnector.style.top = '50%';
    node.appendChild(rightConnector);

    return node;
}

document.getElementById('add-node').addEventListener('click', () => {
    const x = Math.random() * 700;
    const y = Math.random() * 500;
    const node = createNode(x, y);
    nodes.push(node);

    if (isDrawingLine) {
        isDrawingLine = false;
        startNode = null;
    }
});

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('connector')) {
        if (!isDrawingLine) {
            isDrawingLine = true;
            startNode = e.target.parentNode;
        } else {
            if (startNode && startNode !== e.target.parentNode) {
                createLine(startNode, e.target.parentNode);
                isDrawingLine = false;
                startNode = null;
            }
        }
    }
});

function createLine(startNode, endNode) {
    const line = document.createElement('div');
    line.className = 'line';
    const startRect = startNode.getBoundingClientRect();
    const endRect = endNode.getBoundingClientRect();
    line.style.left = (startRect.left + startRect.width / 2) + 'px';
    line.style.top = (startRect.top + startRect.height / 2) + 'px';
    line.style.height = (endRect.top + endRect.height / 2 - startRect.top - startRect.height / 2) + 'px';
    document.getElementById('diagram-container').appendChild(line);
    lines.push(line);
}
