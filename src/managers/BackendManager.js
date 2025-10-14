import { EngineConfig } from "../config/EngineConfig";
import { Types } from "../config/EngineStructs";
import { ConsoleManager } from "./ConsoleManager";
import { EditorManager } from "./EditorManager";
import { EditorWindowManager } from "./EditorWindowManager";
import { LoginManager } from "./LoginManager";
import { ProjectsManager } from "./ProjectsManager";

export class BackendManager {

    static Events = Object.freeze({

        OnLoginSuccess: 100,
        OnLoginFailure: 101,
        OnProjectsFetch: 102
    });
    static Instance = null;

    constructor(engine) {

        BackendManager.Instance = this;

        this.engine = engine;
        this.listeners = [];
        this.loginManager = new LoginManager(this);
        this.projectsManager = new ProjectsManager();
        this.token = localStorage.getItem('token');
    }

    implementListener(listener) {

        this.listeners.push(listener);
    }

    async verifyToken() {

        const url = "http://engine.local";
        BackendManager.Instance.postAuthenticatedRequest();
    }

    async postUpload(body, url) {

         let result = { ok: false, data: "", status: "" };
        const token = localStorage.getItem('token');
        if(!token)
            return result;

        const headers = { 
       
            method: 'POST',
            headers: {
                
                'Authorization': `Bearer ${token}`
            },
            body: body
        };

        try {

            const res = await fetch(url, headers);
            const data = await res.json();
            result.ok = true;
            result.data = data;
            result.status = res.status;
        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;
    }

    async postAuthenticatedRequest(body, url) {

        let result = { ok: false, data: "", status: "" };
        const token = localStorage.getItem('token');
        if(!token)
            return result;

        const headers = { 
       
            method: 'POST',
            headers: {
                
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        try {

            const res = await fetch(url, headers);
            const data = await res.json();
            result.ok = true;
            result.data = data;
            result.status = res.status;
        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;
    }


    async postRequest(body, url) {

        let result = { ok: false, data: "", status: "" };
        const headers = { 
       
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        try {

            const res = await fetch(url, headers);
            const data = await res.json();
            result.ok = true;
            result.data = data;
            result.status = res.status;
        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;

    }

    async getAuthenticatedRequest(url) {

        let result = { ok: false, data: "", status: "" };
        const token = localStorage.getItem('token');
        if(!token)
            return result;
        
        const headers = { 
       
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        try {

            const res = await fetch(url, headers);
            const data = await res.json();
            result.ok = true;
            result.data = data;
            result.status = res.status;

        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;
    }

    async getAuthenticatedFile(url) {

        let result = { ok: false, data: "", status: "" };
        const token = localStorage.getItem('token');
        if(!token)
            return result;
        
        const headers = { 
       
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {

            const res = await fetch(url, headers);
            const blob = await res.blob();
            result.ok = true;
            result.blob = blob;
            result.data = data;
            result.status = res.status;

        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;
    }

    async getRequest(url) {

        let result = { ok: false, data: "", status: "" };
        const headers = { 
       
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {

            const res = await fetch(url, headers);
            const data = await res.json();
            result.ok = true;
            result.data = data;
            result.status = res.status;

        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;
    }

    isOK(res) {

        return res.ok && res.status === 200 && res.data !== undefined && res.data !== null;
    }
}