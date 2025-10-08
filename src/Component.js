export class Component {

    static Type = Object.freeze({

        Undefined: 0,
        Transform: 1,
        Renderer: 2
    });

    constructor(type) {

        if(type === undefined || type === Component.Type.Undefined)
            throw new Error("Invalid Component!");

        this.start();
    }

    start() {}
}