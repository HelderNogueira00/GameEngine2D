import { EditorWindow } from "../base/EditorWindow";
import { EditorWindowManager } from "./EditorWindowManager";
import { EngineConfig } from "../config/EngineConfig";
import { InputManager } from "./InputManager";

export class EngineUI {

    constructor(engine) {

        this.engine = engine;
        this.editorWindowManager = new EditorWindowManager(this.engine);

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

        this.framerateInput = document.getElementById("framerate");

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

        this.framerateInput.addEventListener('input', e => {

            this.engine.changeFramerate(e.target.value);
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