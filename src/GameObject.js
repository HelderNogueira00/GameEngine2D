import { Component } from "./Component";
import { TransformComponent } from "./TransformComponent";

export class GameObject {

    constructor(engine) {

        this.engine = engine;
        this.components = [];
        this.addComponent(new TransformComponent());

        this.start();
    }

    start() { }
    update() { }
    
    updateComponents() {

        this.components.forEach(component => {
            component.update();
        });
    }

    addComponent(component) {

        if(component ===undefined || component.type === Component.Type.Undefined)
            return;

        switch(component.type) {

            case Component.Type.Transform: this.transform = component; break;
        }

        this.components.push(component);
    }
}