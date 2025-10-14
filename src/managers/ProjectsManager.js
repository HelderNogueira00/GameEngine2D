import { Types } from "../config/EngineStructs";
import { EventListener } from "../config/EventListener";
import { BackendManager } from "./BackendManager";
import { EventsManager } from "./EventsManager";

export class ProjectsManager {

    static Instance = null;
    constructor() {

        ProjectsManager.Instance = this;
        this.projects = [];
        this.fetchProjects = this.fetchProjects.bind(this);
    }

    async fetchProjects() {

        const result = await BackendManager.Instance.getAuthenticatedRequest(Types.URI.FetchProjects);
        if(result.ok && result.status === 200 && result.data !== undefined) {

            this.parseProjects(result.data.data.split(';'));
            EventsManager.Instance.broadcast({ type: EventsManager.Type.OnProjectsFetched, data: this.projects });   
        }
    }

    async deleteProject(projectID) {

        const body = { projectID: projectID };
        await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.DeleteProject);
        EventsManager.Instance.broadcast({ type: EventsManager.Type.OnProjectDeleted });
    }

    async createProject(projectName, projectDesc) {

        const body = { projectName: projectName, projectDescription: projectDesc };
        await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.CreateProject);
        EventsManager.Instance.broadcast({ type: EventsManager.Type.onProjectCreated });
    }

    async renameProject(projectID, projectName) {

    }

    async loadProject(projectID) {


        const body = { projectID: projectID };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.LoadProject);

        if(res.ok && res.status === 200 && res.data !== undefined && res.data !== null) {

            const projectID = res.data.id;
            EventsManager.Instance.broadcast({type: EventsManager.Type.OnProjectLoaded, data: projectID });
            return;
        }

        console.log("Error Loading Project!");
    }

    parseProjects(arr) {
        
        this.projects = [];
        for(const projectData of arr) {

            if(projectData.split('|')[1] === undefined)
                continue;

            let project = {

                id: projectData.split('|')[0],
                userID: projectData.split('|')[1],
                pname: projectData.split('|')[2],
                pdesc: projectData.split('|')[3]
            };

            this.projects.push(project);
        }       
    }
}