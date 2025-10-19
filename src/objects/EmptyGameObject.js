import { EditorManager } from "../managers/EditorManager.js";
import { Types } from "../config/EngineStructs.js";
import { GameObject } from "../base/GameObject.js";
import { InputManager } from "../managers/InputManager.js";
import { ConsoleManager } from "../managers/ConsoleManager.js";

export class EmptyGameObject extends GameObject {
    
    constructor(id) {

        super(id);
        this.addComponent(Types.Component.Transform);
    }

    start() {

        this.name = "New Empty GameObject";
    }

    update() {


    }
}
