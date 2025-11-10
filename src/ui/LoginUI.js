import { UIElement } from "../base/UIElement.js";
import { EngineConfig } from "../config/EngineConfig.js";
import { EngineUI } from "../managers/EngineUI.js";
import { LoginManager } from "../managers/LoginManager.js";
import { ProjectsManager } from "../managers/ProjectsManager.js";

export class LoginUI extends UIElement {

    constructor(engineUI) {

        super();
        this.engineUI = engineUI;
    }

    linkElements() {

        //Linking Top Divs
        this.addContainer("#loginContainer", "login");
        this.addContainer('#newProjectContainer', "newProject");
        this.addContainer('#projectsListContainer', "projects");
        this.addContainer('#createAccountContainer', "newAccount");
        this.addContainer('#forgotPasswordContainer', "passwordRec");

        //Linking Elements
        this.addElement("login", "#usernameInput", "username");
        this.addElement("login", "#passwordInput", "password");
        this.addElement("login", "#login", "button");
        this.addElement("login", "#forgotPassword", "forgot");
        this.addElement("login", "#backCreateAccount", "createAccount");
        this.addElement("projects", "#create", "create");
        this.addElement("projects", "#logout", "logout");
        this.addElement("newProject", "#nameInput", "name");
        this.addElement("newProject", "#descInput", "desc");
        this.addElement('newProject', "#create", "create");
        this.addElement("newProject", "#list", "list");
        this.addElement("newAccount", "#nameInput", "name");
        this.addElement("newAccount", "#usernameInput", "username");
        this.addElement("newAccount", "#passwordInput", "password");
        this.addElement("newAccount", "#emailInput", "email");
        this.addElement("newAccount", "#CPasswordInput", "cpassword");
        this.addElement("newAccount", "#createAccount", "createAccount");
        this.addElement("newAccount", "#backLogin", "login");
        this.addElement("passwordRec", "#usernameInput", "username");
        this.addElement("passwordRec", "#emailInput", "email");
        this.addElement("passwordRec", "#recovery", "recovery");
        this.addElement("passwordRec", "#backLogin", "login");
        this.addElement("passwordRec", "#backCreateAccount", "createAccount");
    }

    createListeners() {
        
        this.getElement("projects", "logout").addEventListener('click', e => this.onLogoutClick(e));
        this.getElement("projects", "create").addEventListener('click', e => this.onCreateProjectClick(e));
        this.getElement("newProject", "list").addEventListener('click', e => this.onListClick(e));
        this.getElement("newProject", "create").addEventListener('click', e => this.onCreateClick(e));
        this.getElement("login", "button").addEventListener('click', e => this.onLoginClick(e));
        this.getElement("newAccount", "createAccount").addEventListener('click', e => this.onCreateAccountClick(e));
        this.getElement("login", "createAccount").addEventListener('click', e => this.onCreateAccountBackClick(e));
        this.getElement("newAccount", "login").addEventListener('click', e => this.onLoginBackClick(e));
        this.getElement("passwordRec", "createAccount").addEventListener('click', e => this.onCreateAccountBackClick(e));
        this.getElement("passwordRec", "login").addEventListener('click', e => this.onLoginBackClick(e));
        this.getElement("passwordRec", "recovery").addEventListener('click', e => this.onAccountRecoveryClick(e));
        this.getElement("login", "forgot").addEventListener('click', e => this.onForgotPasswordClick(e));
    }

    initialize() {

        this.hideContainers();
        this.showContainer("login");
    }

    onForgotPasswordClick(e) {

        e.preventDefault();
        this.hideContainers();
        this.showContainer("passwordRec");
    }

    onAccountRecoveryClick(e) {

        e.preventDefault();
        this.disableContainer("passwordRec");

        const username = this.getValue("passwordRec", "username");
        const email = this.getValue("passwordRec", "email");
        LoginManager.Instance.onAccountRecovery(username, email);
    }

    onLoginBackClick(e) {

        e.preventDefault();
        this.hideContainers();
        this.showContainer("login");
    }

    onCreateAccountBackClick(e) {

        e.preventDefault();
        this.hideContainers();
        this.showContainer("newAccount");
    }

    onCreateAccountClick(e) {

        e.preventDefault();
        this.disableContainer("newAccount");

        const name = this.getValue("newAccount", "name");
        const email = this.getValue("newAccount", "email");
        const username = this.getValue("newAccount", "username");
        const password = this.getValue("newAccount", "password");
        const cPassword = this.getValue("newAccount", "cpassword");

        //Triage Errors
        if (cPassword !== password) {

            return;
        }

        console.log("sending req");
        LoginManager.Instance.onCreateAccount(name, email, username, password);
    }

    onLogoutClick(e) {

        e.preventDefault();
        LoginManager.Instance.logout();
    }

    onListClick(e) {

        e.preventDefault();
        this.hideContainer("newProject");
        this.showContainer("projects");
    }

    onCreateClick(e) {

        e.preventDefault();
        const projectName = this.getValue("newProject", "name");
        const projectDesc = this.getValue("newProject", "desc");
        this.disableContainer("newProject");
        ProjectsManager.Instance.createProject(projectName, projectDesc);
    }

    onCreateProjectClick(e) {

        e.preventDefault();
        this.hideContainer("projects");
        this.hideContainer("login");
        this.showContainer("newProject");
    }

    onLoginClick(e) {

        e.preventDefault();
        this.disableContainer("login");

        const username = this.getValue("login", "username");
        const password = this.getValue("login", "password");
        LoginManager.Instance.onLogin(username, password);
    }

    onLoginGranted() {

        ProjectsManager.Instance.fetchProjects();
    }
    
    onLoginDenied() {
        
        this.enableContainer("login");
    }

    onProjectsFetched(event) {

        this.hideContainer("login");
        this.showContainer("projects");
        
        const projects = event.data;
        document.querySelectorAll('.projectList-item').forEach(el => {el.remove(); console.log("removing");});

        for(const project of projects) {

            const element = document.createElement('div');
            element.classList.add('projectList-item');
            element.innerHTML = 
                "<div class=\"left\">" +
                    "<p id=\"name\">" + project.pname + "</p>" +
                    "<input type=\"text\" style=\"display: none\" id=\"nameInput\"/>" +
                    "<p id=\"desc\">" + project.pdesc + "</p>" +
                    "<input type=\"text\" style=\"display: none\" id=\"descInput\"/>" +
                "</div>" +
                "<div class=\"right\">" +
                    "<div id=\"rename\" class=\"btn\"><img src=\"img/rename.png\"></div>" +
                    "<div id=\"delete\" class=\"btn\"><img src=\"img/delete.png\"></div>" +
                "</div>";
            
            element.querySelector('#rename').addEventListener('click', e => {

                e.preventDefault();
                
                const nameInput = element.querySelector("#nameInput");
                const descInput = element.querySelector("#descInput");
                const nameText = element.querySelector("#name");
                const descText = element.querySelector("#desc");
                
                descText.style.display = "none";
                nameText.style.display = "none";
                nameInput.style.display = "block";
                descInput.style.display = "block";
                nameInput.value = nameText.textContent;
                descInput.value = descText.textContent;

                nameInput.addEventListener('change', e => {

                    e.preventDefault();
                    nameText.textContent = nameInput.value;
                    nameInput.style.display = "none";
                    nameText.style.display = "block";
                });

                descInput.addEventListener('change', e => {

                    e.preventDefault();
                    descText.textContent = descInput.value;
                    descInput.style.display = "none";
                    descText.style.display = "block";
                });

                ProjectsManager.Instance.renameProject(project.id, project.pname);
            });

            element.querySelector('#delete').addEventListener('click', e => {

                e.preventDefault();
                ProjectsManager.Instance.deleteProject(project.id);
            });

            element.addEventListener('click', e => {

                e.preventDefault();
                ProjectsManager.Instance.loadProject(project.id);
            });

            this.getContainer("projects").parent.appendChild(element);
        }
    }

    onProjectCreated() {

        this.hideContainer("newProject");
        this.hideContainer("login");
        this.showContainer("projects");
    }

    onUserLoggedOut() {

        this.hideContainer("projects");
        this.hideContainer("newProject");
        this.showContainer("login");
        this.enableContainer("login");
    }

    onProjectLoaded(event) {

        this.hideContainer("projects");
        this.engineUI.engine.changeState(EngineConfig.EngineState.Editing);
        EngineUI.Instance.hideLoading(0.3);
    }

    onProjectDeleted() { ProjectsManager.Instance.fetchProjects(); }
    onProjectRenamed() { ProjectsManager.Instance.fetchProjects(); }
}
