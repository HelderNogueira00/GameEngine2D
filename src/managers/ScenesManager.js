import { Types } from "../config/EngineStructs.js";
import { EmptyGameObject } from "../objects/EmptyGameObject.js";
import { BackendManager } from "./BackendManager.js";
import { EditorManager } from "./EditorManager.js";
import { EditorWindowManager } from "./EditorWindowManager.js";
import { EventsManager } from "./EventsManager.js";

export class ScenesManager {

    static Instance = undefined;
    constructor(engine) {

        ScenesManager.Instance = this;

        this.engine = engine;
        this.scenes = [];
        this.sceneIndex = 0;

        this.linkElements();
        this.createListeners();
    }

    linkElements() {
        
        this.currentSceneElement = document.querySelector('#currentScene');
        this.saveButtonElement = document.querySelector('#saveScene');
    }

    createListeners() {


    }

    async linkScene(scenePath) {

        if(this.getSceneByName(scenePath))
            return;

        const body = { projectName: EditorManager.Instance.projectName, sceneName: scenePath};
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.FetchScene);

        if(BackendManager.Instance.isOK(res)) {

            const sceneConfig = res.data.data;
            this.scenes.push(JSON.parse(sceneConfig));
        }
    }

    async saveScene(sceneName, gos) {

        let sceneConfig = { 
        
            name: sceneName,
            objects: []
        };

        gos.forEach(go => sceneConfig.objects.push(go.updateConfig()));;
        const body = { projectName: EditorManager.Instance.projectName, scene: JSON.stringify(sceneConfig) };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.SaveScene);

        console.log(res);
        if(BackendManager.Instance.isOK(res)) {

        }
    }

    loadScene(name) {

        this.engine.ui.showLoading("Loading " + name + " scene, please wait ...");
        const scene = this.getSceneByName(name);
        console.log("Scene Loading: " + scene + ":" + name);
        if(scene) {
            
            this.engine.destroyAllGameObjects();
            if(scene.objects)
                scene.objects.forEach(go => this.engine.createObject(EmptyGameObject, go));
            
            this.currentScene = name;
            
            this.currentSceneElement.textContent = name;
            this.saveButtonElement.addEventListener('click', e => { ScenesManager.Instance.saveScene(name, EditorWindowManager.Instance.engine.getGameObjects()); });
        }
            
        this.engine.ui.hideLoading(2);
    }

    getSceneByName(sceneName) {

        return this.scenes.find(scene => scene.name === sceneName);
    }

}