import { EmptyGameObject } from "./EmptyGameObject";
import { EngineConfig } from "./EngineConfig";
import { EngineUI } from "./EngineUI";

export class EngineManager {
    
    constructor() {

        this.config = new EngineConfig();
        this.ui = new EngineUI(this);

        this.initialize();
        setInterval(() => { this.onNewFrame(); }, this.config.Framerate); 
    }

    initialize() {

//        setTimeout(() => { this.changeState(EngineConfig.EngineState.Editing); }, 4000);
    }

    onNewFrame() {

        this.applyState();
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

new EngineManager([

    //all pobjects that need to be preloaded
    new EmptyGameObject()
]);