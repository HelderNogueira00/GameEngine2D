import { EngineConfig } from "../config/EngineConfig";
import { Types } from "../config/EngineStructs";
import { ConsoleManager } from "./ConsoleManager";
import { EditorManager } from "./EditorManager";
import { EditorWindowManager } from "./EditorWindowManager";

export class BackendManager {

    static Instance = null;
    constructor(engine) {

        BackendManager.Instance = this;

        this.engine = engine;
        this.token = localStorage.getItem('token');
    }

    async postAuthenticatedRequest(body, url) {

        let result = { ok: false, data: "" };
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
            if(res.ok) {

                const data = await res.json();
                result.ok = true;
                result.data = data.data;
            }
            else ConsoleManager.Error("Error Updating folders");
        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        console.log(result);
        return result;
    }


    async postRequest(body, url) {

        let result = { ok: false, data: "" };
        const headers = { 
       
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        try {

            const res = await fetch(url, headers);
            if(res.ok) {

                const data = await res.json();
                result.ok = true;
                result.data = data;
            }
            else ConsoleManager.Error("Error Updating folders");
        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;

    }

    async getRequest(url) {

        let result = { ok: false, data: "" };
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
            if(res.ok) {

                const data = await res.json();
                result.ok = true;
                result.data = data.data;
            }
            else ConsoleManager.Error("Error Updating folders");
        }
        catch(err) { ConsoleManager.Error('API Error: ' + err)}
        return result;
    }
}