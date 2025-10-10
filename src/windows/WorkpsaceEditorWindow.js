import { EditorManager } from "../managers/EditorManager";
import { EditorWindow } from "../base/EditorWindow";
import { EditorWindowManager } from "../managers/EditorWindowManager";
import { Types } from "../config/EngineStructs";

export class WorkspaceEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.Workspace);

        this.isGridDragging = false;
        this.offset = { x: 0, y:0 }
        this.lastMousePos = { x: 0, y:0 }

        this.linkElements();

        this.offsetX =0;
        this.offsetY = 0;

        this.objects = [];
        this.createGridEditor();
        this.createListeners();
    }

    onClean = () => {

    }

    linkElements() {

        this.isArrowMoving = { x: false, y: false };
        this.arrowElement = { 
            
            parent: document.querySelector('#transformArrow'),
            x: document.querySelector('#arrowX'),
            y: document.querySelector('#arrowY') 
        }

        //this.arrowElement.x.addEventListener('click', e => this.onArrowStart(e, 0));
        //this.arrowElement.y.addEventListener('click', e => this.onArrowStart(e, 1));
    }

    onArrowStart(e, axis) {


    }

    onArrowMouseDown(e) {

        this.isArrowMoving = true;
        console.log('mouse down');
    }

    onArrowMouseUp(e) {

        this.isArrowMoving = false;
        console.log('mouse up');
    }

    onArrowMouseMove(e) {

        if(this.isArrowMoving)
            console.log('mouse move');
    }

    createGridEditor() {

        this.gridElement = document.querySelector('#workspaceGrid');
        this.gridObjects = document.querySelector('#gridObjects');
        this.gridElement.style.position = "relative";

        const rows = 50;
        const columns = 50;

        this.gridElement.style.gridTemplateColumns = "repeat(" + columns + ", 40px)";
        this.gridElement.style.gridTemplateRows = "repeat(" + rows + ", 40px)";

        for(let x = 0; x < rows; x++) {
            for(let y = 0; y < columns; y++) {

                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.setAttribute("y", x);
                cellElement.setAttribute("x", y);
                this.gridElement.appendChild(cellElement);
            }
        }
    }

    createListeners() {

        this.element.addEventListener('mousedown', e => {

            if (e.button === 1) { // Middle mouse
                
                this.isGridDragging = true;
                this.lastMousePos = { x: e.clientX, y: e.clientY };
                e.preventDefault();
            }
        });

        this.element.addEventListener('mouseup', e => {

            if(e.button === 1)
                this.isGridDragging = false;
        });

        this.element.addEventListener('mousemove', e => {

             if (!this.isGridDragging) return;

            const dx = e.deltaX - this.lastMousePos.x;
            const dy = e.deltaY - this.lastMousePos.y;

            this.offset.x += dx;
            this.offset.y += dy;

            this.gridElement.style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`;
            this.lastMousePos = { x: e.clientX, y: e.clientY };
        });
    }

    onRefresh() {
        this.drawOnGrid();
    }


    drawOnGrid() {
        
        EditorWindowManager.Instance.getEngine().getGameObjects().forEach(gameObject => {

            const element = gameObject.editorElement;
            this.gridElement.appendChild(element);
            element.appendChild(this.arrowElement.parent);
            element.style.transform = "rotateZ(" + gameObject.getComponent(Types.Component.Transform).rotation.z + "deg)";
        });
    }

    onMouseUp(event) {

        this.isObjectDragging = false;
        this.isArrowMoving.x = false;
        this.isArrowMoving.y = false;
    }

    onObjectDestroyed(event) {

        event.element.remove();
    }

    onObjectSelected(event) {

        const go = EditorManager.GetGameObject(event.data);
        go.editorElement.style.border = "1px solid #f0bc14fa";
        go.editorElement.appendChild(this.arrowElement.parent);
        this.arrowElement.parent.style.display = "block";
    }

    onObjectDeselected(event) {

        EditorManager.GetGameObjects().forEach(go => go.editorElement.style.border = "none");
        this.arrowElement.parent.style.display = "none";
    }

    onCodeEditorOpened(event) {

        this.element.style.display = "none";
    }

    onCodeEditorClosed(event) {

        this.element.style.display = "block";
    }
}