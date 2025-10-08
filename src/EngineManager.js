import { EmptyGameObject } from "./EmptyGameObject";
import { EngineConfig } from "./EngineConfig";
import { EngineUI } from "./EngineUI";

export class EngineManager {
    
    constructor(...gameObjects) {

        this.config = new EngineConfig();
        this.ui = new EngineUI(this);
        this.gameObjects = [];

        this.initialize(gameObjects);
        setInterval(() => { this.onNewFrame(); }, this.config.Framerate); 
    }

    initialize(gameObjects) {

        if(gameObjects === undefined)
            return;

        gameObjects.forEach(GO => { this.gameObjects.push(new GO(this)); });
    }

    onNewFrame() {

        this.applyState();
        this.gameObjects.forEach(GO => {

            GO.updateComponents();
            GO.update();
        });
    }

    applyState() {

        this.config.CurrentState = this.config.NextState;
        switch(this.config.CurrentState) {

            case EngineConfig.EngineState.Initializing: 

                this.ui.focus(this.ui.initElement);
                break;

            case EngineConfig.EngineState.Editing: 

                this.ui.focus(this.ui.editorElement);
                break;

            case EngineConfig.EngineState.Playing: 
            
                this.ui.focus(this.ui.playElement);
                break;
        }
    }

    changeState(newState) {

        this.config.NextState = newState;
        switch(this.config.NextState) {

            case EngineConfig.EngineState.Initializing: 
                break;

            case EngineConfig.EngineState.Editing: 
                break;

            case EngineConfig.EngineState.Playing: 
                break;
        }
    }
}

new EngineManager(EmptyGameObject);