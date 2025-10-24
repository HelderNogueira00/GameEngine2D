import { Types } from "../config/EngineStructs.js";
import { BackendManager } from "./BackendManager.js";
import { EditorManager } from "./EditorManager.js";
import { EditorWindowManager } from "./EditorWindowManager.js";
import { EventsManager } from "./EventsManager.js";

export class ScenesManager {

    static Instance = undefined;
    constructor() {

        ScenesManager.Instance = this;

        this.scenes = [];
        this.sceneIndex = 0;
        this.currentScene = { };
    }
    
    linkElements() {
        
        this.saveButtonElement = document.querySelector('#saveScene');
    }

    createListeners() {

        this.saveButtonElement.addEventListener('click', e => {

            ScenesManager.Instance.saveScene(ScenesManager.Instance.currentScene);
        });
    }

    createScene(sceneName) {

        this.scenes.push({

            id: this.sceneIndex,
            name: sceneName,
            objects: []
        });

        this.sceneIndex++;
    }

    saveScene(sceneName, objectsConfig) {

        const scene = this.getSceneByName(sceneName);
        if(scene === undefined)
            return;

        objectsConfig.forEach(go => scene.objects.push(go));
        this.serializeScene(scene);
    }

    async loadScene(name) {

        const body = { projectName: EditorManager.Instance.projectName, sceneName: name};
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.LoadScene);

        if(BackendManager.Instance.isOK(res)) {

            this.currentScene = this.getSceneByName(res.data.data);
            EventsManager.Instance.broadcast({ type: EventsManager.Type.OnSceneLoad, data: res.data.data });
        }
    }

    getSceneByName(sceneName) {

        return this.scenes.find(scene => scene.name === sceneName);
    }

    serializeScene(scene) {


    }

}