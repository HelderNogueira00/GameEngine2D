import { EditorWindowManager } from "./EditorWindowManager.js";
import { EngineConfig } from "../config/EngineConfig.js";
import { ProjectsManager } from "./ProjectsManager.js";
import { LoginUI } from "../ui/LoginUI.js";
import { LoginManager } from "./LoginManager.js";
import { ThemeManager } from "./ThemeManager.js";

export class EngineUI {

    static Instance = null;
    constructor(engine) {

        EngineUI.Instance = this;
        this.engine = engine;
        this.elements = [];
        this.projectsManager = new ProjectsManager();
        this.editorWindowManager = new EditorWindowManager(this.engine);

        this.linkElements();

        switch(this.engine.config.CurrentState) {

            case 0: this.showInitialization(); break;
            case 1: this.showEditorMode(); break;
            case 2: this.showPlayMode(); break;
        }

        this.elements.push(new LoginUI(this));
    }


    linkElements() {

        this.elements.push();
        this.initElement = document.getElementById("initElement");
        this.playElement = document.getElementById("playElement");
        this.editorElement = document.getElementById("editorElement");

        this.playButton = document.getElementById("play");
        this.stopButton = document.getElementById("stop");
        this.framerateInput = document.getElementById("framerate");
       
        this.loadingPanelElement = document.querySelector('#loadingPanel');
        this.editorOptionsBar = document.querySelector("#editorOptionsBar");
        this.editorLogoutButton = this.editorOptionsBar.querySelector("#logout");

        this.setupEventListeners();
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

        this.editorLogoutButton.addEventListener('click', e => {

            LoginManager.Instance.logout();
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

        element.style.display = "flex";
    }

    showLoading(text) {

        this.loadingPanelElement.querySelector('p').textContent = text;
        this.loadingPanelElement.style.display = "flex";
    }

    hideLoading(timer = 0) {

        setTimeout(() => this.loadingPanelElement.style.display = "none", timer * 1000);
    }
}
