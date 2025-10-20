import { UIElement } from "../base/UIElement.js";
import { EngineConfig } from "../config/EngineConfig.js";
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

        //Linking Elements
        this.addElement("login", "#usernameInput", "username");
        this.addElement("login", "#passwordInput", "password");
        this.addElement("login", "#login", "button");
        this.addElement("projects", "#create", "create");
        this.addElement("projects", "#logout", "logout");
        this.addElement("newProject", "#nameInput", "name");
        this.addElement("newProject", "#descInput", "desc");
        this.addElement('newProject', "#create", "create");
        this.addElement("newProject", "#list", "list");
    }

    createListeners() {
        
        this.getElement("projects", "logout").addEventListener('click', e => this.onLogoutClick(e));
        this.getElement("projects", "create").addEventListener('click', e => this.onCreateProjectClick(e));
        this.getElement("newProject", "list").addEventListener('click', e => this.onListClick(e));
        this.getElement("newProject", "create").addEventListener('click', e => this.onCreateClick(e));
        this.getElement("login", "button").addEventListener('click', e => this.onLoginClick(e));
    }

    initialize() {

        this.hideContainer("projects");
        this.hideContainer("newProject");
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
    }

    onProjectDeleted() { ProjectsManager.Instance.fetchProjects(); }
    onProjectRenamed() { ProjectsManager.Instance.fetchProjects(); }
}
