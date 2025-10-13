import { ConsoleManager } from "./ConsoleManager";
import { EditorManager } from "./EditorManager";
import { EditorWindowManager } from "./EditorWindowManager";
import { EngineConfig } from "../config/EngineConfig";;
import { Types } from "../config/EngineStructs";
import { EngineUI } from "./EngineUI";
import { GameObject } from "../base/GameObject";
import { InputManager } from "./InputManager";
import { BackendManager } from "./BackendManager";
import { BackendEvents } from "../config/BackendEvents";
import { EventsManager } from "./EventsManager";
import { EventListener } from "../config/EventListener";

export class EngineManager {
    
    static Instance;
    constructor(...objects) {

        this.eventsManager = new EventsManager(this);
        this.input = new InputManager();
        this.config = new EngineConfig();
        this.ui = new EngineUI(this);
        this.backend = new BackendManager(this);
        this.editor = new EditorManager(this);
        this.objects = [];
        this.initialize(objects);
        this.isGameRunning = false;
        this.isEditorRunning = false;

        EngineManager.Instance = this;
        this.intervalID = setInterval(() => { this.onNewFrame(); }, this.config.EngineFramerate);
    }

    changeFramerate(framerate) {

        clearInterval(this.intervalID);
        this.intervalID = setInterval(() => { this.onNewFrame(); }, framerate);

        ConsoleManager.Warning("Editor Framerate Changed: " + framerate);
    }

    createObject(engineObject) {

        const object = new engineObject(this.objectsCount);
        this.objects.push(object);
        this.objectsCount++;

        EditorWindowManager.Instance.sendEvent({ type: Types.Event.ObjectCreated, data: object.id});
    }

    destroyObject(id) {

        const object = this.objects.find(obj => obj.id === id);
        const index = this.objects.indexOf(object);
        this.objects.splice(index, 1);

        EditorWindowManager.Instance.sendEvent({ type: Types.Event.ObjectDestroyed, data: id, element: object.editorElement});
        ConsoleManager.Warning("GameObject Destroyed!");
    }

    getGameObjects() {

        return this.objects;
    }

    getGameObject(id) {

        return this.objects.find(go => go.id === id);
    }

    initialize(objects) {

        this.objectsCount = 0;
        objects.forEach(obj => { this.createObject(obj); });
    }

    onNewFrame() {

        this.applyState();
        this.objects.forEach(object => {

            object.baseUpdate();
            object.update();
        });

        EditorWindowManager.Instance.sendEvent({type: Types.Event.OnNewFrame, data: null});
        EditorWindowManager.Instance.refreshEditorWindows();
        this.input.reset();
    }

    applyState() {

        this.config.CurrentState = this.config.NextState;
        switch(this.config.CurrentState) {

            case EngineConfig.EngineState.Initializing: 

                this.ui.focus(this.ui.initElement);
                break;

            case EngineConfig.EngineState.Editing: 

                this.isEditorRunning = true;
                this.isGameRunning = false;
                this.ui.focus(this.ui.editorElement);
                break;

            case EngineConfig.EngineState.Playing: 
            
                this.isEditorRunning = false;
                this.isGameRunning = true;
                this.ui.focus(this.ui.playElement);
                break;
        }
    }

    changeState(newState) {

        this.config.NextState = newState;
        switch(this.config.NextState) {

            case EngineConfig.EngineState.Initializing: 
                break;

            case EngineConfig.EngineState.Editing: 
                
                break;

            case EngineConfig.EngineState.Playing: 
                break;
        }
    }

    onUserLoggedOut() {

        this.changeState(EngineConfig.EngineState.Initializing);
    }
}

new EngineManager();