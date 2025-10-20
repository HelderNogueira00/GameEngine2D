import { Types } from "../config/EngineStructs.js";

export class Component {

    constructor(gameObject, type) {

        if(type === undefined || type === Types.Component.Undefined)
            throw new Error("Invalid Component!");

        this.id = gameObject.id;
        this.type = type;
        this.element = {};
        this.gameObject = gameObject;
        
        this.createListeners();
        this.start();
    }

    start() {}
    update() {}
    getConfig() {}
    applyConfig() {}
    createListeners() {}
}
