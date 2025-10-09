import { Types } from "../config/EngineStructs";
import { GameObject } from "../base/GameObject";

export class RendererGameObject extends GameObject {

    constructor(id) {

        super(id);
        this.name = "Renderer GameObject";
        this.addComponent(Types.Component.Transform);
        this.addComponent(Types.Component.Renderer);
    }

    update() {

        
    }
}