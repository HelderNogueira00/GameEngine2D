import { EditorWindow } from "../base/EditorWindow";
import { Types } from "../config/EngineStructs";
import { ConsoleManager } from "../managers/ConsoleManager";
import { EditorWindowManager } from "../managers/EditorWindowManager";

export class OrganizerEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.Organizer);
        const contextMenuOptions = [
            { text: "Import New Asset", function: this.onNewAsset },
            { text: "New Javascript", function: this.onNewScript },
            { text: "New Folder", function: this.createDir }
        ];

        this.emptyElement = this.element.querySelector('#emptyText');
        this.emptyElement.style.diplay = "none";
        this.enableContextMenu(contextMenuOptions);
    }

    onNewAsset = () => {

        console.log("import new asset:!");
    }

    onNewScript = () => {

        this.login("Kommando", "hello");
        EditorWindowManager.Instance.sendEvent({type: Types.Event.OnCodeEditorOpen, data: "filename"});
        ConsoleManager.Warning("Creating New Javascript File.");
    }

    onRefresh() {

        
    }

    async createScript(name) {

        const payload = {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`
            })
        };

        const res = await fetch('http://engine.local:3000/newScript', payload);
        if(res.ok)
            console.log("script created on server");
    }

    async login(username, password) {

        const payload = {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: `${username}`,
                password: `${password}`
            })
        };

        const res = await fetch('http://engine.local:3000/login', payload);
        
        try {

            const res = await fetch('http://engine.local:3000/login', payload);
            if(!res.ok) {

                ConsoleManager.Error("Response Login Failed!");
                return;
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            ConsoleManager.Log("Logged In Successfully!");
            EditorWindowManager.Instance.sendEvent({type: Types.Event.OnUserLoggedIn, data: data.token});

        } catch(err) {ConsoleManager.Error("Fethcing Data Error: " + err);}
    }

    async onUserLoggedIn(event) {

        const token = event.data;
        try {

            const headers = { 

                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const res = await fetch('http://engine.local:3000/fsapi', headers);
            if(!res.ok) {

                ConsoleManager.Error("File API Error!");
                return;
            }

            const data = await res.json();
            if(data.data === "") {

                this.emptyElement.style.diplay = "block";
                return;
            }

            this.emptyElement.style.display = "none";
        }
        catch(err) { ConsoleManager.Error("Error Fetching Organizer File API: " + err)}
    }

    async createDir() {

        const token = localStorage.getItem('token');
        if(!token)
            return;

        let result = { ok: false, data: "" };
        try {

             const headers = { 

                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    name: "Assets/Crop"
                })
            };

            const res = await fetch('http://engine.local:3000/fsapi/new_dir', headers);
            if(res.ok) {

                const data = await res.json();
                console.log(data.data);
                result.ok = true;
                result.data = data.data;
            }
            else ConsoleManager.Error("Error Updating folders");
        }
        catch(err) { ConsoleManager.Error('Creating Dir Error: ' + err)}
        
        if(result.ok)
            this.createFolder(data.data);
    }

    createFolder(data) {

        const parts = data.split('|');
        for(const part of parts) {

            if(part.includes("[DIR]")) {

                const folderElement = document.createElement('div');
                const textElement = document.createElement('p');
                folderElement.classList.add('organizer-folder');
                folderElement.appendChild(textElement);
                textElement.textContent = part.split('[')[1];
                this.element.appendChild(folderElement);
            
            }
        }
    }
}