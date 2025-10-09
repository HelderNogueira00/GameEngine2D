import { EditorManager } from "../managers/EditorManager";
import { Types } from "../config/EngineStructs";
import { GameObject } from "../base/GameObject";
import { InputManager } from "../managers/InputManager";
import { ConsoleManager } from "../managers/ConsoleManager";

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