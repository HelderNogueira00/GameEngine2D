import { ConsoleEditorWindow } from "../windows/ConsoleEditorWindow";
import { EditorWindow } from "../base/EditorWindow";
import { Types } from "../config/EngineStructs";
import { OrganizerEditorWindow } from "../windows/OrganizerEditorWindow";
import { PropertiesEditorWindow } from "../windows/PropertiesEditorWindow";
import { StatsEditorWindow } from "../windows/StatsEditorWindow";
import { WorkspaceEditorWindow } from "../windows/WorkpsaceEditorWindow";
import { WorldObjectEditorWindow } from "../windows/WorldObjectsEditorWindow";
import { CodeEditorWindow } from "../windows/CodeEditorWindow";

export class EditorWindowManager {

    static Instance;
    constructor(engine) {
        
        EditorWindowManager.Instance = this;

        this.engine = engine;
        this.windows = [];
        this.linkEditorWindows();
        this.linkGlobalListeners();
        this.enableWindowResizing();
        this.enableContainerResizing();

        this.currentObjectSelected = -1;
    }

    onObjectClick(id) {

        if(this.currentObjectSelected === id) {

            this.currentObjectSelected = -1;
            this.sendEvent({type: Types.Event.ObjectDeselected, data: id});
            return;
        }

        this.currentObjectSelected = id;
        this.sendEvent({type: Types.Event.ObjectSelected, data: id});
    }

    sendEvent(event) {

        this.windows.forEach(w => w.receiveEvent(event));
        this.engine.receiveEvent(event);
    }

    refreshEditorWindows() {

        this.windows.forEach(w => w.onRefresh());
    }

    getEngine() { return this.engine; }

    getWindow(type) {

        return this.windows.find(window => window.type === type);
    }

    findWindowByID(id) {

        this.windows.forEach(w => {

            if(w.getWindowID() === id)
                return w;
        })
    }

    linkEditorWindows() {

        this.windows.push(new WorldObjectEditorWindow(this.engine));
        this.windows.push(new WorkspaceEditorWindow(this.engine));
        this.windows.push(new PropertiesEditorWindow(this.engine));
        this.windows.push(new OrganizerEditorWindow(this.engine));
        this.windows.push(new ConsoleEditorWindow(this.engine));
        this.windows.push(new StatsEditorWindow(this.engine));
        this.windows.push(new CodeEditorWindow(this.engine));
    }

    linkGlobalListeners() {

        document.addEventListener("click", () => {

            document.querySelector('#windowContextMenu').style.display = "none";
        });
    }

    enableWindowResizing() {

        const resizableWindows = document.querySelectorAll('.window-resize');
        resizableWindows.forEach(handle => {

            let isResizing = false;

            handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;

            const windowElement = handle.parentElement;
            const initialWidth = windowElement.offsetWidth;
            const initialMouseX = e.clientX;

            const mouseMoveHandler = (moveEvent) => {
            if (!isResizing) return;

                var deltaX = moveEvent.clientX - initialMouseX;
                if(handle.classList.contains('window-resize-left'))
                    deltaX *= -1;

                windowElement.style.width = `${initialWidth + deltaX}px`;
                
            };

            const mouseUpHandler = () => {
                isResizing = false;
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                };

                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            });
        });
    }

    enableContainerResizing() {

        let isResizingVertically = false;
        const verticalResizeHandle = document.querySelector('.container-resize');
        verticalResizeHandle.addEventListener('mousedown', (e) => {

            e.preventDefault();
            isResizingVertically = true;
            
            const bottomContainer = document.querySelector('.window-container-bottom');
            const initialHeight = bottomContainer.offsetHeight;
            const initialMouseY = e.clientY;

            const mouseMoveHandler = (moveEvent) => {
            if (!isResizingVertically) return;

                var deltaY = moveEvent.clientY - initialMouseY;
                bottomContainer.style.height = `${initialHeight - deltaY}px`;
            };

            const mouseUpHandler = () => {
            isResizingVertically = false;
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
    }
}