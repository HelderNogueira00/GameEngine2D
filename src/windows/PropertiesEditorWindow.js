import { Component } from "../base/Component.js";
import { ConsoleManager } from "../managers/ConsoleManager.js";
import { EditorWindow } from "../base/EditorWindow.js";
import { EditorWindowManager } from "../managers/EditorWindowManager.js";
import { Types } from "../config/EngineStructs.js";
import { EditorManager } from "../managers/EditorManager.js";

export class PropertiesEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.Properties);
    
        this.objIDElement = document.querySelector('.object-id');
        this.objNameElement = document.querySelector('.object-name');
        this.objRenameElement = document.querySelector('.object-rename');
        this.objRemoveElement = document.querySelector('.object-delete');
        this.objAddComponent = document.querySelector('.object-component');
        this.objPropertiesElement = document.querySelector('.objectProperties');
        this.objComponentsElement = this.objPropertiesElement.querySelector('.components');
        this.addComponentElement = document.querySelector('#addComponent');
        this.textureRendererInput = document.querySelector('#textureRendererComponent').querySelector('#fileInput'),

        this.currentObjectID = -1;

        this.objRemoveElement.addEventListener('click', () => {

            EditorWindowManager.Instance.getEngine().destroyObject(this.currentObjectID);
            this.onDeselect();
        });

  
        this.objAddComponent.addEventListener('click', e => { this.toggleAddComponent() });
        this.addComponentElement.querySelectorAll('.li').forEach(el => { el.addEventListener('click', e => { this.onNewComponent(e.target); })});

        this.createListeners();
        this.linkElements();
    }

    createListeners() {

        this.textureRendererInput.addEventListener('dragover', e => e.preventDefault());
        this.textureRendererInput.addEventListener('drop', e => this.onTextureDropped(e));
    }

    onTextureDropped(e) {

        e.preventDefault();

        const go = EditorManager.GetGameObject(this.currentObjectID);
        if(go !== undefined) {

            const renderer = go.getComponent(Types.Component.TextureRenderer);
            if(renderer !== undefined) {

                const textureSource = e.dataTransfer.getData('text/plain').split('|')[0];
                const textureName = e.dataTransfer.getData('text/plain').split('|')[1];

                if(textureName && textureSource) {

                    this.textureRendererInput.textContent = textureName;
                    renderer.onTextureDropped(textureName, textureSource);
                }
            }
        }
    }

    onNewComponent(target) {

        this.toggleAddComponent();
        switch(target.getAttribute('type')) {
            
            case "renderer": EditorManager.GetGameObject(this.currentObjectID).addComponent(Types.Component.Renderer); break;
            case "textRenderer": EditorManager.GetGameObject(this.currentObjectID).addComponent(Types.Component.TextRenderer); break;
        }

        const goID = this.currentObjectID;
        this.onDeselect();
        this.onObjectSelected({data: goID});
    }

    toggleAddComponent() {

        if(this.addComponentElement.style.display === "none") {
            
            this.objComponentsElement.appendChild(this.addComponentElement);
            this.addComponentElement.style.display = "block";
        }
        else {

            this.addComponentElement.style.display = "none";
            this.objComponentsElement.removeChild(this.addComponentElement);
        }
    }

    onObjectSelected(event) {

        const gameObject = EditorManager.GetGameObject(event.data);
        this.currentObjectID = gameObject.id;
        this.objIDElement.textContent = "GameObject ID: " + gameObject.id;
        this.objNameElement.textContent = gameObject.name;

        gameObject.components.forEach(component => {

            switch(component.type) {

                case Types.Component.TextureRenderer:
                    this.textureRendererInput.textContent = component.textureName;
                    break;
            }
        });

        gameObject.components.forEach(component => this.applyComponentData(component));

        this.objPropertiesElement.style.display = "block";
        ConsoleManager.Error("Object Sleected: " + gameObject.id);
    }

    onDeselect() {

        this.currentObjectID = -1;
        this.objIDElement.textContent = "0";
        this.objNameElement.textContent = "";
        this.textureRendererInput.textContent = "";
        this.objPropertiesElement.style.display = "none";

        document.querySelectorAll('.component').forEach(component => component.style.display = "none");
    }

    onObjectDeselected(event) { this.onDeselect();}

    applyComponentData(component) {

        switch(component.type) {

            case Types.Component.Transform:
                
                component.element.xPosInput.value = component.position.x;
                component.element.yPosInput.value = component.position.y;
                component.element.zRotInput.value = component.rotation.z;
                component.element.xSclInput.value = component.scaling.x;
                component.element.ySclInput.value = component.scaling.y;

                break;
        }

        component.element.parent.style.display = "block";
    }

    linkElements() {

        //transform component elements
       
    }
}
