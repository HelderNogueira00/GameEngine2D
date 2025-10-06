import { EngineConfig } from "./EngineConfig";

export class EngineUI {

    constructor(engine) {

        this.engine = engine;
        this.linkElements();

        switch(this.engine.config.CurrentState) {

            case 0: this.showInitialization(); break;
            case 1: this.showEditorMode(); break;
            case 2: this.showPlayMode(); break;
        }
    }

    linkElements() {

        this.initElement = document.getElementById("initElement");
        this.playElement = document.getElementById("playElement");
        this.editorElement = document.getElementById("editorElement");

        this.playButton = document.getElementById("play");
        this.stopButton = document.getElementById("stop");

        this.setupEventListeners();
        this.engine.changeState(EngineConfig.EngineState.Editing);
    }

    setupEventListeners() {
        
        this.playButton.addEventListener("click", () => {
            this.engine.changeState(EngineConfig.EngineState.Playing);
        });

        this.stopButton.addEventListener("click", () => {
            this.engine.changeState(EngineConfig.EngineState.Editing);
        });
    }

    showInitialization() {

        this.focus(this.initElement);
    }

    showPlayMode() {

        this.focus(this.playElement);
    }

    showEditorMode() {

        this.focus(this.editorElement);
    }

    focus(element) {

        this.initElement.style.display = "none";
        this.playElement.style.display = "none";
        this.editorElement.style.display = "none";

        element.style.display = "block";
    }
}