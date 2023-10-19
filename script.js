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

    if (selectedNode) {
        if (isDrawingConnector) {
            connectNodes(selectedNode, node);
            isDrawingConnector = false;
            startConnector = null;
        }
    }
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
