import { EditorManager } from "../managers/EditorManager.js";
import { Types } from "../config/EngineStructs.js";
import { GameObject } from "../base/GameObject.js";
import { InputManager } from "../managers/InputManager.js";
import { ConsoleManager } from "../managers/ConsoleManager.js";

export class EmptyGameObject extends GameObject {
    
    constructor(id, config) {

        super(id, config);
        this.addComponent(Types.Component.Transform);
        this.applyConfig(config);
    }

    start() {

        this.name = "New Empty GameObject";
    }

    update() {


    }
}
