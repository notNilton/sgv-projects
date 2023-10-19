let nodes = [];
let connectors = [];
let selectedNode = null;
let isDragging = false;
let isDrawingConnector = false;
let startConnector = null;
let nodeConnection = [];

function createNode(x, y) {
    const node = document.createElement('div');
    node.className = 'node';
    node.id = 'node' + nodes.length;
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.innerHTML = 'Node';
    node.nodeConnection = null;
    document.getElementById('diagram-container').appendChild(node);

    // Adicione conectores à esquerda e à direita do nó
    // const leftConnector = createConnector(-5, '50%', node);
    // const rightConnector = createConnector('100%', '50%', node);

    node.addEventListener('mousedown', (e) => {
        selectedNode = node;
        isDragging = true;
    });

    node.addEventListener('click', (e) =>{
        if(isDragging == false){
            console.log('test');
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
    node.nodeConnection = new LeaderLine(document.getElementById('element-1'), node, {color: 'red', size: 3})
    
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

createNode(200, 200);

var startElement = document.getElementById('element-1');
//   endElement = document.getElementById('element-2');

// New leader line has red color and size 8.
// new LeaderLine(startElement, endElement, {color: 'red', size: 8});


line1 = new LeaderLine(startElement, document.getElementById('node0'), {color: 'red', size: 3});
console.log(line1.position());


