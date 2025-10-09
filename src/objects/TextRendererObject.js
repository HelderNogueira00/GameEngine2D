import { GameObject } from "../base/GameObject";
import { Types } from "../config/EngineStructs";

export class TextRendererObject extends GameObject {

    constructor(id) {

        super(id);
        this.name = "Text Renderer";
        this.addComponent(Types.Component.Transform);
        this.addComponent(Types.Component.TextRenderer);
    }
}