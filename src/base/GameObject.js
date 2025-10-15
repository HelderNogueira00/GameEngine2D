import { Component } from "./Component";
import { EditorWindowManager } from "../managers/EditorWindowManager";
import { Types } from "../config/EngineStructs";
import { RendererComponent } from "../components/RendererComponent";
import { TransformComponent } from "../components/TransformComponent";
import { TextRendererComponent } from "../components/TextRendererComponent";
import { TextureRendererComponent } from "../components/TextureRendererComponent";

export class GameObject {

    constructor(id) {

        this.id = id;
        this.name = "Object";
        this.components = [];
        this.gameClass = null;
        this.editorElement = null;
        this.editorTextElement = null;

        this.setup();
        this.start();
    }

    setup() {

        this.editorElement = document.createElement('div');
        this.editorElement.classList.add("obj");
        this.editorElement.setAttribute("id", this.id);
        this.editorElement.style.position = "absolute";
        this.editorElement.style.backgroundColor = "transparent";
        this.editorTextElement = document.createElement('p');
        this.editorElement.appendChild(this.editorTextElement);
        this.editorElement.addEventListener('click', e => EditorWindowManager.Instance.onObjectClick(this.id));
    }

    addComponent(type) {

        switch(type) {

            case Types.Component.Transform: this.components.push(new TransformComponent(this)); break;
            case Types.Component.Renderer: this.components.push(new RendererComponent(this)); break;
            case Types.Component.TextRenderer: this.components.push(new TextRendererComponent(this)); break;
            case Types.Component.TextureRenderer: this.components.push(new TextureRendererComponent(this)); break;
        }
    }

    removeComponent(type) {

        const comp = this.components.find(component => component.type === type);
        const index = this.components.indexOf(comp);
        this.components.splice(index, 1);
    }

    getComponent(type) {

        return this.components.find(component => component.type === type);
    }

    start() {}
    update() {}
    baseUpdate() {

        this.components.forEach(component => component.update());
    }
}