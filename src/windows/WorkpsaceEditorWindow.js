import { EditorManager } from "../managers/EditorManager.js";
import { EditorWindow } from "../base/EditorWindow.js";
import { EditorWindowManager } from "../managers/EditorWindowManager.js";
import { Types } from "../config/EngineStructs.js";
import { ThemeManager } from "../managers/ThemeManager.js";
import { EngineManager } from "../managers/EngineManager.js";
import { EngineConfig } from "../config/EngineConfig.js";

export class WorkspaceEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.Workspace);

        this.isGridDragging = false;
        this.gridOffset = { x:0, y: 0};
        this.gridScale = 1;

        this.offset = { x: 0, y:0 }
        this.lastMousePos = { x: 0, y:0 }

        this.linkElements();

        this.offsetX =0;
        this.offsetY = 0;

        this.objects = [];
        this.createGridEditor();
        this.createListeners();
        this.disableContextMenu();
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

        const rows = 20;
        const columns = 20;
        const pixelUnit = EngineConfig.PixelUnit;
        //this.gridElement.style.gridTemplateColumns = "repeat(" + rows + ", 40px)";
        //this.gridElement.style.gridTemplateRows = "repeat(" + columns + ", 40px)";

        for(let x = 0; x < rows; x++) {
            for(let y = 0; y < columns; y++) {

                console.log(x + ":" + pixelUnit);
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.setAttribute("y", x);
                cellElement.setAttribute("x", y);
                cellElement.style.position = "absolute";
                cellElement.style.width = pixelUnit-1 + "px";
                cellElement.style.height = pixelUnit-1 + "px";
                cellElement.style.top = x * pixelUnit-1 + "px";
                cellElement.style.left = y * pixelUnit-1 + "px";
                this.gridElement.appendChild(cellElement);
            }
        }
        

        this.onThemeChanged({data: ThemeManager.DarkTheme});
    }

    updateGrid() {


    }

    createListeners() {

        this.gridElement.addEventListener('mousedown', e => {

            if(e.button === 2){

                console.log('start drag');
                this.isGridDragging = true;
                this.gridOffset.x = e.clientX - this.gridElement.offsetLeft;
                this.gridOffset.y = e.clientY - this.gridElement.offsetTop;
            }
        });

        document.addEventListener('mousemove', e => {

            if(this.isGridDragging) {

                this.updateGrid();
                this.gridElement.style.left = (e.clientX - this.gridOffset.x) + "px";
                this.gridElement.style.top = (e.clientY - this.gridOffset.y) + "px";
            }
        });

        document.addEventListener('mouseup', e => {

            if(e.button === 2) {

                console.log('stopped dragging');
                this.isGridDragging = false;
            }
        });
        
        this.gridElement.addEventListener('wheel', e => {

            e.preventDefault();
            this.updateGrid();

            const rect = this.gridElement.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const originX = (offsetX / rect.width) * 100;
            const originY = (offsetY / rect.height) * 100;
            this.gridElement.style.transformOrigin = `${originX}% ${originY}%`;

            if(e.deltaY < 0)
                this.gridScale *= 1.1;
            else 
                this.gridScale /= 1.1;

           // this.gridScale = Math.min(Math.max(this.gridScale, 0.5), 5);
            this.gridElement.style.transform = `scale(${this.gridScale})`;
        });
    }

    onRefresh() {

        if(this.gridElement) 
            this.gridElement.style.cursor = (this.isGridDragging) ? "hand" : "auto";

        this.drawOnGrid();
    }


    drawOnGrid() {
        
        EditorWindowManager.Instance.getEngine().getGameObjects().forEach(gameObject => {

            const element = gameObject.editorElement;
            this.gridElement.appendChild(element);
            this.arrowElement.parent.top = 0;
            this.arrowElement.parent.left= 0;
            element.appendChild(this.arrowElement.parent);
            //element.style.transform = "rotateZ(" + gameObject.getComponent(Types.Component.Transform).rotation.z + "deg)";
        });
    }

    onThemeChanged(event) {

        const theme = event.data;
        this.gridElement.style.backgroundColor = theme.workspaceGridBGColor;
        document.querySelector('#workspaceGrid').querySelectorAll('.cell').forEach(el => {

            el.style.backgroundColor = theme.workspaceGridCellBGColor;
            el.style.borderColor = theme.workspaceGridCellBorderColor;
        })
    }

    onMouseUp(event) {

       //this.isObjectDragging = false;
      //  this.isArrowMoving.x = false;
       // this.isArrowMoving.y = false;
    }

    onObjectDestroyed(event) {

        event.element.remove();
    }

    onObjectSelected(event) {

        const go = EditorManager.GetGameObject(event.data);
        go.selected = true;
        go.editorElement.style.border = "1px solid #f0bc14fa";
        go.editorElement.appendChild(this.arrowElement.parent);
        this.arrowElement.parent.style.display = "block";
    }

    onObjectDeselected(event) {

        if(EngineManager.Instance.objects) {

            EngineManager.Instance.objects.forEach(go => { 
            
                go.selected = false;
                go.editorElement.style.border = "none";
            });
        }
        
        this.arrowElement.parent.style.display = "none";
    }

    onCodeEditorOpened(event) {

        this.element.style.display = "none";
    }

    onCodeEditorClosed(event) {

        this.element.style.display = "block";
    }
}
