import { GameObject } from "../base/GameObject.js";
import { Types } from "../config/EngineStructs.js";

export class TextRendererObject extends GameObject {

    constructor(id, config) {

        super(id, config);
        this.name = "Text Renderer";
        this.addComponent(Types.Component.Transform);
        this.addComponent(Types.Component.TextRenderer);
    }
}
