// let nodes = [];
// let connectors = [];
// let selectedNode = null;
// let isDragging = false;

// function createNode(x, y) {
//     const node = document.createElement('div');
//     node.className = 'node';
//     node.style.left = x + 'px';
//     node.style.top = y + 'px';
//     node.innerHTML = 'Node';
//     document.getElementById('diagram-container').appendChild(node);

//     node.addEventListener('mousedown', (e) => {
//         selectedNode = node;
//         isDragging = true;
//     });

//     return node;
// }

// function drawConnector(startNode, endNode) {
//     const connector = document.createElement('div');
//     connector.className = 'connector';
//     const startRect = startNode.getBoundingClientRect();
//     const endRect = endNode.getBoundingClientRect();
//     connector.style.left = (startRect.left + startRect.width / 2 - 1) + 'px';
//     connector.style.top = (startRect.top + startRect.height) + 'px';
//     connector.style.height = (endRect.top - startRect.bottom) + 'px';
//     document.getElementById('diagram-container').appendChild(connector);
//     return connector;
// }   

// function connectNodes(startNode, endNode) {
//     if (startNode !== endNode) {
//         const connector = drawConnector(startNode, endNode);
//         connectors.push(connector);
//     }
// }

// document.getElementById('add-node').addEventListener('click', () => {
//     const x = Math.random() * 700;
//     const y = Math.random() * 500;
//     const node = createNode(x, y);
//     nodes.push(node);

//     if (selectedNode) {
//         connectNodes(selectedNode, node);
//     }
// });

// document.addEventListener('mousemove', (e) => {
//     if (isDragging) {let diagramContainer = document.getElementById('diagram-container');
//     let addNodeButton = document.getElementById('add-node');
//     let nodeCount = 0;
    
//     addNodeButton.addEventListener('click', () => {
//         const newNode = document.createElement('div');
//         newNode.className = 'node';
//         newNode.innerText = `Node ${++nodeCount}`;
//         newNode.style.left = '10px';
//         newNode.style.top = '10px';
    
//         // Tornar o nó arrastável
//         newNode.draggable = true;
//         newNode.addEventListener('dragstart', (event) => {
//             event.dataTransfer.setData('text/plain', event.target.id);
//         });
    
//         diagramContainer.appendChild(newNode);
    
//         // Adicionar manipuladores de eventos para mover o nó
//         newNode.addEventListener('dragover', (event) => {
//             event.preventDefault();
//         });
    
//         newNode.addEventListener('drop', (event) => {
//             event.preventDefault();
//             const data = event.dataTransfer.getData('text/plain');
//             const draggedNode = document.getElementById(data);
    
//             const offsetX = event.clientX - diagramContainer.getBoundingClientRect().left;
//             const offsetY = event.clientY - diagramContainer.getBoundingClientRect().top;
    
//             draggedNode.style.left = offsetX - newNode.offsetWidth / 2 + 'px';
//             draggedNode.style.top = offsetY - newNode.offsetHeight / 2 + 'px';
//         });
//     });
    
//         selectedNode.style.left = e.clientX - selectedNode.offsetWidth / 2 + 'px';
//         selectedNode.style.top = e.clientY - selectedNode.offsetHeight / 2 + 'px';
//         connectors.forEach(connector => {
//             document.getElementById('diagram-container').removeChild(connector);
//         });
//         connectors = [];
//         nodes.forEach(node => {
//             if (node !== selectedNode) {
//                 const startRect = selectedNode.getBoundingClientRect();
//                 const endRect = node.getBoundingClientRect();
//                 if (startRect.right > endRect.left && startRect.left < endRect.right &&
//                     startRect.bottom < endRect.top && startRect.bottom + 10 > endRect.top) {
//                     connectNodes(selectedNode, node);
//                 }
//             }
//         });
//     }
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
// });


// Novo Código

let nodes = [];
let connectors = [];
let selectedNode = null;
let isDragging = false;

function createNode(x, y) {
    const node = document.createElement('div');
    node.className = 'node';
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.innerHTML = 'Node';
    document.getElementById('diagram-container').appendChild(node);

    // Adicione conectores nas bordas superior, inferior, esquerda e direita do nó
    const connectors = ['top', 'bottom', 'left', 'right'];
    connectors.forEach((position) => {
        const connector = document.createElement('div');
        connector.className = 'connector';
        connector.classList.add(position);
        node.appendChild(connector);
    });

    node.addEventListener('mousedown', (e) => {
        selectedNode = node;
        isDragging = true;
    });

    return node;
}

function drawConnector(startNode, endNode) {
    const connector = document.createElement('div');
    connector.className = 'connector';
    const startRect = startNode.getBoundingClientRect();
    const endRect = endNode.getBoundingClientRect();
    connector.style.left = (startRect.left + startRect.width / 2 - 1) + 'px';
    connector.style.top = (startRect.top + startRect.height) + 'px';
    connector.style.height = (endRect.top - startRect.bottom) + 'px';
    document.getElementById('diagram-container').appendChild(connector);
    return connector;
}

function connectNodes(startNode, endNode) {
    if (startNode !== endNode) {
        const connector = drawConnector(startNode, endNode);
        connectors.push(connector);
    }
}

document.getElementById('add-node').addEventListener('click', () => {
    const x = Math.random() * 700;
    const y = Math.random() * 500;
    const node = createNode(x, y);
    nodes.push(node);

    if (selectedNode) {
        connectNodes(selectedNode, node);
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
});
