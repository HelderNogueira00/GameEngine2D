import { Types } from "../config/EngineStructs";
import { BackendManager } from "./BackendManager";

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
            return this.projects;
        }
        
        return result.data;
    }

    async deleteProject(e, projectID) {

        e.preventDefault();
        const body = { projectID: projectID };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.DeleteProject);

        if(res.ok && res.status === 200 && result.data !== undefined)
            console.log("ok");

        console.log("something wen wrong: deleting project");
    }

    async createProject(projectName, projectDesc) {

        const body = { projectName: projectName, projectDescription: projectDesc };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.CreateProject);

        if(res.ok && res.status === 200 && res.data !== undefined)
            console.log("ok");

        console.log("something wen wrong: creating project");
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