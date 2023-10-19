let nodes = [];
let connectors = [];
let selectedNode = null;
let isDragging = false;
let isSearching = false;
let isDrawingConnector = false;
let startConnector = null;
let nodeConnection = [];
let isClicked = false;
let currentNode;
let secondNode = null;
let lineNodes = [];

function createNode(x, y) {
    const node = document.createElement('div');
    node.className = 'node';
    node.id = 'node' + nodes.length;
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.innerHTML = 'Node';
    node.nodeConnection = null;
    node.clickState = null;
    document.getElementById('diagram-container').appendChild(node);

    // Adicione conectores à esquerda e à direita do nó
    // const leftConnector = createConnector(-5, '50%', node);
    // const rightConnector = createConnector('100%', '50%', node);

    node.addEventListener('mousedown', (e) => {
        selectedNode = node;
        isDragging = true;
    });

    // work heeeere
    $(node).dblclick(function(){
        if(node.clickState == true){
            node.clickState = false;
        }else{
            lineNodes.push(node);
            node.clickState = true;
            console.log(lineNodes);
        }
    });

    node.addEventListener('click', (e) =>{
        if(isDragging == false){
            if(!isClicked){
                isClicked = true;
                currentNode = node
            }else if(currentNode !== node){
                currentNode.nodeConnection = new LeaderLine(currentNode, node, {color: 'red', size: 3})
                node.nodeConnection = currentNode.nodeConnection;
                console.log('test');
                isClicked = false;
            }
        }
    });

    node.nodeConnection;
    return node;
}

document.getElementById('add-node').addEventListener('click', () => {
    const x = Math.random() * 700;
    const y = Math.random() * 500;
    const node = createNode(x, y);

    // node.appendChild()
    // node.nodeConnection = new LeaderLine(document.getElementById('element-1'), node, {color: 'red', size: 3})
    
    console.log(node);
    nodes.push(node);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        selectedNode.style.left = e.clientX - selectedNode.offsetWidth / 2 + 'px';
        selectedNode.style.top = e.clientY - selectedNode.offsetHeight / 2 + 'px';
        selectedNode.nodeConnection.position();
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

var startElement = document.getElementById('element-1');


