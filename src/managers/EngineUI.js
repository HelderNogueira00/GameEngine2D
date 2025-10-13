import { EditorWindow } from "../base/EditorWindow";
import { EditorWindowManager } from "./EditorWindowManager";
import { EngineConfig } from "../config/EngineConfig";
import { InputManager } from "./InputManager";
import { BackendManager } from "./BackendManager";
import { ConsoleManager } from "./ConsoleManager";
import { Types } from "../config/EngineStructs";
import { ProjectsManager } from "./ProjectsManager";
import { LoginManager } from "./LoginManager";

export class EngineUI {

    constructor(engine) {

        this.engine = engine;
        this.projectsManager = new ProjectsManager();
        this.editorWindowManager = new EditorWindowManager(this.engine);

        this.linkElements();

        switch(this.engine.config.CurrentState) {

            case 0: this.showInitialization(); break;
            case 1: this.showEditorMode(); break;
            case 2: this.showPlayMode(); break;
        }

        this.usernameInput.disabled = false;
        this.passwordInput.disabled = false;
    }

    async verifyToken() {

        const res = await BackendManager.Instance.getAuthenticatedRequest(Types.URI.TOKEN);
        if(res.status === 200) {

            const token = localStorage.getItem('token');
            EditorWindowManager.Instance.sendEvent({type: Types.Event.OnUserLoggedIn, data: token});
            this.loginElement.style.display = "none";
            this.projectsListElement.style.display = "flex";
            console.log("Projects Instance: " + ProjectsManager.Instance);
            const projectsList = await ProjectsManager.Instance.loadProjects();
            console.log(projectsList);
            // this.engine.changeState(EngineConfig.EngineState.Editing);
        } else {

            console.log("token expired");
            this.usernameInput.disabled = false;
            this.passwordInput.disabled = false;
        }
    }

    linkElements() {

        this.initElement = document.getElementById("initElement");
        this.playElement = document.getElementById("playElement");
        this.editorElement = document.getElementById("editorElement");

        this.playButton = document.getElementById("play");
        this.stopButton = document.getElementById("stop");

        this.loginButton = document.querySelector('#login');
        this.loginElement = document.querySelector('#initElement').querySelector('.login');
        this.usernameInput = document.querySelector('#loginUsernameInput');
        this.passwordInput = document.querySelector('#loginPasswordInput');

        this.projectsListElement = document.querySelector('#projectsList');
        this.createProjectElement = document.querySelector('#createNewProject');
        this.createNewProjectButton = this.projectsListElement.querySelector('#createNewProjectBtn');
        this.createProjectButton = this.createProjectElement.querySelector('#createBtn');
        this.listProjectsButton = this.createProjectElement.querySelector('#listBtn');
        
        this.createProjectElement.style.display = "none";
        this.newProjectNameInput = this.createProjectElement.querySelector('#newProjectNameInput');
        this.newProjectDescInput = this.createProjectElement.querySelector('#newProjectDescInput');

        this.usernameInput.disabled = true;
        this.passwordInput.disabled = true;
        this.framerateInput = document.getElementById("framerate");

        this.setupEventListeners();
    }

    onLoginSuccess() {

        this.loginElement.style.display = "none";
        this.projectsListElement.style.display = "flex";
        this.refreshProjectsList();
    }

    async refreshProjectsList() {

        document.querySelectorAll('.projectList-item').forEach(el => el.remove());
        const projects = await ProjectsManager.Instance.fetchProjects();
        projects.forEach(proj => this.onProjectFetched(proj));
    }

    onProjectFetched(proj) {

        const element = document.createElement('div');
        element.classList.add('projectList-item');
        element.innerHTML = 
            "<div class=\"left\">" + 
                "<p>" + proj.pname + "</p>" +
                "<p>" + proj.pdesc + "</p>" +
                "</div>" +
                "<div class=\"right\">" +
                "<div id=\"rename-btn\" class=\"btn\"><img src=\"img/rename.png\" width=\"40px\" ></div>" +
                "<div id=\"delete-btn\" class=\"btn\"><img src=\"img/delete.png\" width=\"40px\" ></div>" +
            "</div>";

        element.querySelector('#delete-btn').addEventListener('click', e => { ProjectsManager.Instance.deleteProject(e, proj.id); this.refreshProjectsList(); });
        
        this.projectsListElement.appendChild(element);
    }

    onLoginFailure() {

        console.log("Login Failed!");
        this.usernameInput.value = "";
        this.passwordInput.value = "";
        this.usernameInput.disabled = false;
        this.passwordInput.disabled = false;
        this.loginButton.disabled = false;
    }

    executeLogin(e) {
        
        e.preventDefault();
        this.loginButton.disabled = true;
        this.usernameInput.disabled = true;
        this.passwordInput.disabled = true;

        const username = this.usernameInput.value;
        const password = this.passwordInput.value;
        LoginManager.Instance.onLogin(username, password);
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
        this.createNewProjectButton.addEventListener('click', e => {

            e.preventDefault();
            this.projectsListElement.style.display = "none";
            this.createProjectElement.style.display = "block";
        });

        this.listProjectsButton.addEventListener('click', e => {

            e.preventDefault();
            this.createProjectElement.style.display = "none";
            this.projectsListElement.style.display = "block";
        });

        this.createProjectButton.addEventListener('click', e => {

            e.preventDefault();
            const projName = this.newProjectNameInput.value;
            const projDesc = this.newProjectDescInput.value;
            this.newProjectDescInput.disabled = true;
            this.newProjectNameInput.disabled = true;
            this.createProjectButton.disabled = true;

            ProjectsManager.Instance.createProject(projName, projDesc);
            this.newProjectDescInput.disabled = false;
            this.newProjectNameInput.disabled = false;
            this.createProjectButton.disabled = false;
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