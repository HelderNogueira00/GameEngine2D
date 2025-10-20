import { GameObject } from "../base/GameObject.js";
import { Types } from "../config/EngineStructs.js";

export class TextureRendererGameObject extends GameObject {

    constructor(id, config) {

        super(id, config);
        this.name = "Texture Renderer";
        this.addComponent(Types.Component.Transform);
        this.addComponent(Types.Component.TextureRenderer);
    }

    update() {
        
    }
}
