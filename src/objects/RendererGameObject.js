import { Types } from "../config/EngineStructs.js";
import { GameObject } from "../base/GameObject.js";

export class RendererGameObject extends GameObject {

    constructor(id, config) {

        super(id, config);
        this.name = "Renderer GameObject";
        this.addComponent(Types.Component.Transform);
        this.addComponent(Types.Component.Renderer);
    }

    update() {

        
    }
}
