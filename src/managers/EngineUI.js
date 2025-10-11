import { EditorWindow } from "../base/EditorWindow";
import { EditorWindowManager } from "./EditorWindowManager";
import { EngineConfig } from "../config/EngineConfig";
import { InputManager } from "./InputManager";
import { BackendManager } from "./BackendManager";
import { ConsoleManager } from "./ConsoleManager";
import { Types } from "../config/EngineStructs";

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

        const token = localStorage.getItem('token');
        if(token) {

            EditorWindowManager.Instance.sendEvent({type: Types.Event.OnUserLoggedIn, data: token});
            this.engine.changeState(EngineConfig.EngineState.Editing);
        }
    }

    linkElements() {

        this.initElement = document.getElementById("initElement");
        this.playElement = document.getElementById("playElement");
        this.editorElement = document.getElementById("editorElement");

        this.playButton = document.getElementById("play");
        this.stopButton = document.getElementById("stop");

        this.loginButton = document.querySelector('#login');
        this.usernameInput = document.querySelector('#loginUsernameInput');
        this.passwordInput = document.querySelector('#loginPasswordInput');

        this.framerateInput = document.getElementById("framerate");

        this.setupEventListeners();
        
    }

    async executeLogin(e) {
        
        e.preventDefault();
        this.usernameInput.disabled = true;
        this.passwordInput.disabled = true;

        const username = this.usernameInput.value;
        const password = this.passwordInput.value;
        const url = "http://engine.local:3000/login";
        const body = {

            username: `${username}`,
            password: `${password}`
        };

        const res = await BackendManager.Instance.postRequest(body, url);
        if(res.ok) {

            localStorage.setItem('token', res.data.token);
            ConsoleManager.Log("Logged In Successfully!");
            EditorWindowManager.Instance.sendEvent({type: Types.Event.OnUserLoggedIn, data: res.data.token});
            this.engine.changeState(EngineConfig.EngineState.Editing);
            return;
        }

        this.usernameInput.value = "";
        this.passwordInput.value = "";
        this.usernameInput.disabled = false;
        this.passwordInput.disabled = false;
        console.log(res);
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

        this.loginButton.addEventListener('click', async (e) => this.executeLogin(e));

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