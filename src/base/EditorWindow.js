import { Types } from "../config/EngineStructs.js";

export class EditorWindow {

    static Type = Object.freeze({

        Undefined: 0,
        WorldObjects: 1,
        Workspace: 2,
        Properties: 3,
        Organizer: 4,
        Console: 5,
        Statistics: 6,
        CodeEditor: 7
    });

    constructor(type, engine) {

        this.type = type;
        this.engine = engine;
        this.contextMenuOpen = false;

        switch(this.type) {

            case EditorWindow.Type.WorldObjects:
                this.element = document.querySelector("#worldObjectsWindow");
                break;

            case EditorWindow.Type.Workspace:
                this.element = document.querySelector("#workspaceWindow");
                break;

            case EditorWindow.Type.Properties:
                this.element = document.querySelector("#propertiesWindow");
                break;

            case EditorWindow.Type.Organizer:
                this.element = document.querySelector("#projectWindow");
                break;

            case EditorWindow.Type.Console:
                this.element = document.querySelector("#consoleWindow");
                break;

            case EditorWindow.Type.Statistics:
                this.element = document.querySelector("#statsWindow");
                break;

            case EditorWindow.Type.CodeEditor:
                this.element = document.querySelector('#codeWindow');
                break;

        }

        if(this.element === undefined)
            throw new Error("Window Not Found!");

        this.linkElements();
    }

    receiveEvent(event) {
    
            switch(event.type) {
    
                case Types.Event.ObjectCreated: this.onObjectCreated(event); break;
                case Types.Event.ObjectDestroyed: this.onObjectDestroyed(event); break;
                case Types.Event.ObjectSelected: this.onObjectDeselected({data: -1}); this.onObjectSelected(event); break;
                case Types.Event.ObjectDeselected: this.onObjectDeselected(event); break;
                case Types.Event.MouseUP: this.onMouseUp(event); break;
                case Types.Event.OnCodeEditorOpen: this.onCodeEditorOpened(event); break;
                case Types.Event.OnCodeEditorClose: this.onCodeEditorClosed(event); break;
                case Types.Event.OnUserLoggedIn: this.onUserLoggedIn(event); break;
                case Types.Event.OnUserLoggedOut: this.onUserLoggedOut(event); break;
                case Types.Event.OnTreeUpdated: this.onTreeUpdated(event); break;
                case Types.Event.OnControlDDown: this.onControlDDown(event); break;
            }
        }

    enableContextMenu(contextOptions) {

        this.contextMenuOptions = contextOptions;
        this.contextMenuArea.addEventListener("contextmenu", e => this.onContextMenu(e, contextOptions));
    }

    addContextMenu(contextOptions, targetElement) {

        targetElement.addEventListener("contextmenu", e => this.onContextMenu(e, contextOptions));
    }

    onContextMenu(e, contextMenuOptions) {

        e.stopPropagation();
        console.log(contextMenuOptions);
        if (e === undefined)
            return;

        if(contextMenuOptions === undefined)
            contextMenuOptions = this.contextMenuOptions;

        if(contextMenuOptions.length <= 0) {

            alert("this window does not have a context menu!");
            return;
        }

        this.contextMenuElement.innerHTML = "";
        contextMenuOptions.forEach(option => {

            const optionElement = document.createElement('li');
            optionElement.classList.add('context-menu-option');
            optionElement.textContent = option.text;
            optionElement.addEventListener("click", e => this.onContextMenuOption(e, option.function));
            this.contextMenuElement.appendChild(optionElement);
        });

        //this.contextMenuArea.appendChild(this.contextMenuElement);
        e.preventDefault();
        this.contextMenuElement.style.position = "absolute";
        this.contextMenuElement.style.top = `${e.pageY}px`;
        this.contextMenuElement.style.left = `${e.pageX}px`; 
        this.contextMenuElement.style.display = "block";
    }

    onContextMenuOption(e, func) {

        if(e === undefined)
            return;
        
        func();
        this.contextMenuElement.style.display = "none";
    }

    linkElements() {

        this.contextMenu = [];
        this.contextMenuArea = this.element.querySelector('.window-body');
        this.contextMenuElement = document.querySelector('#windowContextMenu');
        this.contentElement = this.element.querySelector('.content');
    }

    getWindowID() {

        console.log(this.element.id);
        return this.element.id;
    }

    onRefresh() {}
    onMouseUp(event) {}
    onObjectCreated(event) {}
    onObjectDestroyed(event) {}
    onObjectSelected(event) {}
    onObjectDeselected(event) {}
    onCodeEditorOpened(event) {}
    onCodeEditorClosed(event) {}
    onUserLoggedIn(event) {}
    onUserLoggedOut(event) {}
    onTreeUpdated(event) {}
    onControlDDown(event) {}
}
