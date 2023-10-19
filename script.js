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

function createConnector(left, top, node) {
    const connector = document.createElement('div');
    connector.className = 'connector';
    connector.style.left = left;
    connector.style.top = top;
    node.appendChild(connector);
    return connector;
}

function connectNodes(startNode, endNode) {
    if (startNode !== endNode) {
        drawConnector(startNode, endNode);
    }
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

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('left-connector') || e.target.classList.contains('right-connector')) {
        if (!isDrawingConnector) {
            isDrawingConnector = true;
            startConnector = e.target;
        } else {
            if (startConnector && startConnector !== e.target) {
                connectNodes(startConnector.parentNode, e.target.parentNode);
                isDrawingConnector = false;
                startConnector = null;
            }
        }
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        selectedNode.style.left = e.clientX - selectedNode.offsetWidth / 2 + 'px';
        selectedNode.style.top = e.clientY - selectedNode.offsetHeight / 2 + 'px';
        connectors.forEach(connector => {
            document.getElementById('diagram-container').removeChild(connector);
        });
        connectors = [];
        nodes.forEach(node => {
            if (node !== selectedNode) {
                const startRect = selectedNode.getBoundingClientRect();
                const endRect = node.getBoundingClientRect();
                if (startRect.right > endRect.left && startRect.left < endRect.right &&
                    startRect.bottom < endRect.top && startRect.bottom + 10 > endRect.top) {
                    connectNodes(selectedNode, node);
                }
            }
        });
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    isDrawingConnector = false;
    startConnector = null;
});
