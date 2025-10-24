import { ConsoleManager } from "./ConsoleManager.js";
import { EditorManager } from "./EditorManager.js";
import { EditorWindowManager } from "./EditorWindowManager.js";
import { EngineConfig } from "../config/EngineConfig.js";;
import { Types } from "../config/EngineStructs.js";
import { EngineUI } from "./EngineUI.js";
import { GameObject } from "../base/GameObject.js";
import { InputManager } from "./InputManager.js";
import { BackendManager } from "./BackendManager.js";
import { BackendEvents } from "../config/BackendEvents.js";
import { EventsManager } from "./EventsManager.js";
import { EmptyGameObject } from "../objects/EmptyGameObject.js";
import { ScenesManager } from "./ScenesManager.js";

export class EngineManager {
    
    static Instance;
    constructor(...objects) {

        this.eventsManager = new EventsManager(this);
        this.scenesManager = new ScenesManager();
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

    loadScene(config) {

        this.destroyAllGameObjects();
        if(config.objects) {

            config.objects.forEach(go => this.createObject(EmptyGameObject, go));
        }
    }

    destroyAllGameObjects() {

        while(this.objects.length > 0) {

            for(const go of this.objects) {

                console.log("GO ID: " + go.id);
                this.destroyObject(go.id);
            }
        }
    }

    getLoopsCount() {

        const compCount = this.getComponentsCount();
        const goCount = this.objects.length;
        const windows = EditorWindowManager.Instance.windows.length;

        return compCount + goCount + windows;
    }

    getComponentsCount() {

        let count = 0;
        this.objects.forEach(go => {

            count += go.components.length;
        });

        return count;
    }

    changeFramerate(framerate) {

        clearInterval(this.intervalID);
        this.intervalID = setInterval(() => { this.onNewFrame(); }, framerate);

        ConsoleManager.Warning("Editor Framerate Changed: " + framerate);
    }

    createObject(engineObject, config = null) {

        const object = new engineObject(this.objectsCount, config);
        this.objects.push(object);
        this.objectsCount++;

        console.log(this.objects);
        EditorWindowManager.Instance.sendEvent({ type: Types.Event.ObjectCreated, data: object.id});
        return object;
    }

    destroyObject(id) {

        const object = this.objects.find(obj => obj.id === id);
        const index = this.objects.indexOf(object);
        this.objects.splice(index, 1);

        EditorWindowManager.Instance.sendEvent({ type: Types.Event.ObjectDestroyed, data: id, element: object.editorElement});
    }

    copyGameObject(id) {

        const go = this.objects.find(obj => obj.id === id);
        const newGO = this.createObject(EmptyGameObject, go.updateConfig());
        return newGO;
    }

    getGameObjects() {

        return this.objects;
    }

    getGameObject(id) {

        return this.objects.find(go => go.id === id);
    }

    getGlobalStats() {

        return {

            goCount: this.objects.length,
            componentsCount: this.getComponentsCount(),
            assetsCount: EditorManager.GetAssetsCount(),
            loopsCount: this.getLoopsCount(),
            framerate: this.config.EngineFramerate,
            api: this.backend.apiCount
        };
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

                break;

            case EngineConfig.EngineState.Editing: 

                break;

            case EngineConfig.EngineState.Playing: 
           
                break;
        }
    }

    changeState(newState) {

        this.config.NextState = newState;
        switch(this.config.NextState) {

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

    onUserLoggedOut() {

        this.changeState(EngineConfig.EngineState.Initializing);
    }
}

new EngineManager();
