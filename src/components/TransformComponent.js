import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";
import { EditorManager } from "../managers/EditorManager.js";

export class TransformComponent extends Component {

    constructor(gameObject) {

        super(gameObject, Types.Component.Transform);
    }
    
    start() {

        this.reset();
    }

    reset() {

        this.scaling = { x:1, y:1 };
        this.rotation = { z:0};
        this.position = { x:0, y:0 };
    }

    update() {

        this.gameObject.editorElement.style.left = this.position.x * EditorManager.GetPixelPerUnit() + "px";
        this.gameObject.editorElement.style.top = this.position.y * EditorManager.GetPixelPerUnit() + "px";
        this.gameObject.editorElement.style.width = this.scaling.x * EditorManager.GetPixelPerUnit() + "px";
        this.gameObject.editorElement.style.height = this.scaling.y * EditorManager.GetPixelPerUnit() + "px";
    }

    translate(xDir, yDir) {

        this.position.x += xDir;
        this.position.y += yDir;
    }

    rotate(zDir) {

        this.rotation.z += zDir;
    }

    scale(xDir, yDir) {

        this.scaling.x += xDir;
        this.scaling.y += yDir;
    }

    applyConfig(config) {

        this.position = { x: config.position.x, y: config.position.y };
        this.rotation = { z: config.rotation.z };
        this.scaling = { x: config.scaling.x, y: config.scaling.y };

    }

    getConfig() {

        return {

            type: this.type,
            position: this.position,
            rotation: this.rotation,
            scaling: this.scaling
        };
    }
}
