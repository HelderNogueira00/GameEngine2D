import { EditorWindow } from "../base/EditorWindow.js";
import { EditorManager } from "../managers/EditorManager.js";

export class StatsEditorWindow extends EditorWindow {

    constructor() {
        
        super(EditorWindow.Type.Statistics);
        this.findElements();
        this.createListeners();
    }

    findElements() {

        this.parentElement = document.querySelector('#statsWindow');
        this.apiElement = this.parentElement.querySelector('#apiCount');
        this.loopsElement = this.parentElement.querySelector('#loopsCount');
        this.gameObjectsElement = this.parentElement.querySelector('#goCount');
        this.assetsElement = this.parentElement.querySelector('#assetsCount');
        this.framerateElement = this.parentElement.querySelector('#framerateCount');
        this.componentsElement = this.parentElement.querySelector('#componentsCount');
    }

    createListeners() {

    }

    onRefresh() {

        const stats = EditorManager.GetEngine().getGlobalStats();
        this.gameObjectsElement.textContent = "GameOjects Count: " + stats.goCount;
        this.loopsElement.textContent = "Loops Count: " + stats.loopsCount;
        this.assetsElement.textContent = "Assets Count: " + stats.assetsCount;
        this.framerateElement.textContent = "Editor Framerate: " + stats.framerate;
        this.apiElement.textContent = "API Calls Count: " + stats.api;
        this.componentsElement.textContent = "Components Count: " + stats.componentsCount;
    }
}
