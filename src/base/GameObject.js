import { Component } from "./Component.js";
import { EditorWindowManager } from "../managers/EditorWindowManager.js";
import { Types } from "../config/EngineStructs.js";
import { RendererComponent } from "../components/RendererComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { TextRendererComponent } from "../components/TextRendererComponent.js";
import { TextureRendererComponent } from "../components/TextureRendererComponent.js";

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

    applyConfig(config) {

        if(config === null || config === undefined)
            return;

        this.name = config.name;
        this.gameClass = config.gameClass;

        config.components.forEach(component => {

            const type = component.type;
            if(this.getComponent(type) === undefined) {

                console.log("COmponent: " + component.type);
                this.addComponent(type);
            }

            this.getComponent(type).applyConfig(component);
        });
    }

    updateConfig() {

        let config = {

            name: this.name,
            components: []
        };

        this.components.forEach(comp => {

            config.components.push(comp.getConfig());
        });

        return config;
    }
    addComponent(type) {

        console.log("Adding Component: " + type);
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

    setID(newID) { this.id = newID; }

    start() {}
    update() {}
    baseUpdate() {

        this.updateConfig();
        this.components.forEach(component => component.update());
    }
}
