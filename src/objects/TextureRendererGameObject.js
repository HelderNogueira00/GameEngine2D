import { GameObject } from "../base/GameObject";
import { Types } from "../config/EngineStructs";

export class TextureRendererGameObject extends GameObject {

    constructor(id) {

        super(id);
        this.name = "Texture Renderer";
        this.addComponent(Types.Component.Transform);
        this.addComponent(Types.Component.TextureRenderer);
    }

    update() {
        
    }
}