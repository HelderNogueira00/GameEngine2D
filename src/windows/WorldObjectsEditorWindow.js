
import { ConsoleManager } from "../managers/ConsoleManager.js";
import { EditorWindow } from "../base/EditorWindow.js";
import { EditorWindowManager } from "../managers/EditorWindowManager.js";
import { EmptyGameObject } from "../objects/EmptyGameObject.js";
import { Types } from "../config/EngineStructs.js";
import { RendererGameObject } from "../objects/RendererGameObject.js";
import { TextRendererObject } from "../objects/TextRendererObject.js";
import { TextureRendererGameObject } from "../objects/TextureRendererGameObject.js";

export class WorldObjectEditorWindow extends EditorWindow {

    constructor() {
        
        super(EditorWindow.Type.WorldObjects, EditorWindowManager.Instance.getEngine());
        const contextMenuOptions = [
            { text: "New Empty GameObject", function: this.onNewGameObject },
            { text: "New 2DRenderer Object", function: this.onNew2DRenderer },
            { text: "New Text Renderer", function: this.onNewTextRenderer },
            { text: "New Texture Renderer", function: this.onNewTextureRenderer }
        ];

        this.currentObjectSelected = -1;
        this.gameObjects = [];
        this.ewm = EditorWindowManager.Instance;
        this.enableContextMenu(contextMenuOptions);
    }

    onNewTextureRenderer = () => {

        this.engine.createObject(TextureRendererGameObject);
    }

    onNewTextRenderer = () => {
        this.engine.createObject(TextRendererObject);
    }

    onNewGameObject = () => {
    
        ConsoleManager.Log("New GameObject Has Been Created!");
        this.engine.createObject(EmptyGameObject);
    }

    onNew2DRenderer = () => {
        
        this.engine.createObject(RendererGameObject);
    }



    onRefresh() {

        const gameObjects = EditorWindowManager.Instance.getEngine().getGameObjects();
        gameObjects.forEach(go => {

            if(!this.getGameObjectByID(go.id)){
                
                this.addGameObject(go);
            }
        });

    }

    getGameObjectByID(id) {

        return this.gameObjects.find(go => go.id === id);
    }

    addGameObject(go) {

        const element = document.createElement('div');
        const textElement = document.createElement('p');
        const inputElement = document.createElement('input');
        inputElement.style.display = "none";
        textElement.textContent = go.name;
        textElement.classList.add('world-objects-name');
        element.addEventListener('click', e => EditorWindowManager.Instance.onObjectClick(go.id));
        element.addEventListener('dblclick', e => this.onObjectDoubleClick(e, go.id));
        inputElement.addEventListener('keydown', e => this.onObjectNameChanged(e, go.id));
        element.appendChild(textElement);
        element.appendChild(inputElement);
        this.contentElement.appendChild(element);
        this.gameObjects.push({ element: { parent: element, text: textElement, input: inputElement}, id: go.id});
    }

    onObjectClick(e, go) {

        ConsoleManager.Warning("Object Clicked: " + go.id);
        if(go.id === this.currentObjectSelected) {

            this.deselectObject();
            return;
        }

        this.deselectObject();
        this.selectObject(go);
    }

    onObjectDoubleClick(e,id) {

        console.log("doubled");
        const obj = this.gameObjects.find(go => go.id === id);
        obj.element.text.style.display = "none";
        obj.element.input.value = obj.element.text.textContent;
        obj.element.input.style.display = "block";

        this.deselectObject();
    }

    onObjectNameChanged(e, id) {

        if(e.key !== "Enter")
            return;

        const obj = this.gameObjects.find(go => go.id === id);
        EditorWindowManager.Instance.getEngine().getGameObject(id).name = obj.element.input.value;
        obj.element.text.style.display = "block";
        obj.element.text.textContent = obj.element.input.value;
        obj.element.input.style.display = "none";
        this.selectObject(EditorWindowManager.Instance.getEngine().getGameObject(id));
    }

    onObjectSelected(event) {

        const go = this.getGameObjectByID(event.data);
        const element = go.element;
        element.parent.style.backgroundColor = "#151515";
        element.text.style.color = "#f0bc14fa";

        this.currentObjectSelected = go.id;
        //EditorWindowManager.Instance.getWindow(EditorWindow.Type.Properties).onObjectSelected(go.id);
    }

    selectObject(go) {

     /*   const element = this.getGameObjectByID(go.id).element;
        element.parent.style.backgroundColor = "#151515";
        element.text.style.color = "#f0bc14fa";

        this.currentObjectSelected = go.id;
        //EditorWindowManager.Instance.getWindow(EditorWindow.Type.Properties).onObjectSelected(go.id);
        EditorWindowManager.Instance.sendEvent({ type:Types.Event.ObjectSelected, data: go.id });*/
                EditorWindowManager.Instance.sendEvent({ type:Types.Event.ObjectSelected, data: go.id });

    }

    deselectObject() {

        this.gameObjects.forEach(go => { 
        
            go.element.parent.style.backgroundColor = "#202020";
            go.element.text.style.color = "#f4f4f4";
        });
        this.currentObjectSelected = -1;
    }

    onObjectCreated(event) {

    }


    onObjectDestroyed(event) {

        const go = this.gameObjects.find(go => go.id === event.data);
        const index = this.gameObjects.indexOf(go);
        go.element.parent.remove();
        this.gameObjects.splice(index, 1);
    }

    onObjectDeselected(event) { this.deselectObject(); }
}
