import { EditorWindow } from "../base/EditorWindow";
import { Types } from "../config/EngineStructs";
import { BackendManager } from "../managers/BackendManager";
import { ConsoleManager } from "../managers/ConsoleManager";
import { EditorManager } from "../managers/EditorManager";
import { EditorWindowManager } from "../managers/EditorWindowManager";

export class OrganizerEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.Organizer);

        this.tree = { dirs: [] };
        this.treeLayer = '';
        this.emptyElement = this.element.querySelector('#emptyText');
        this.backFolderElement = document.querySelector('#backFolder');
        this.newFolderElement = document.querySelector('#newFolder');
        this.contentElement = document.querySelector('#projectWindow').querySelector('.content');
        this.emptyElement.style.diplay = "none";
        this.createListeners();
      //  this.login("Kommando", "hello");

       

        this.mainContextMenuOptions = [
            { text: "Import New Asset", function: this.onNewAsset },
            { text: "New Javascript", function: this.onNewScript },
            { text: "New Folder", function: this.onNewFolder }
        ];
        this.addContextMenu(this.mainContextMenuOptions, this.contentElement);
        //this.enableContextMenu(this.mainContextMenuOptions);
    }

    createListeners() {

        this.backFolderElement.addEventListener('dblclick', e => { 

            const barsLength = this.treeLayer.split('\\').length;
            if(barsLength === 2) {

                this.treeLayer = '';
                return;
            }

            const current = this.treeLayer.split('\\')[barsLength - 2];
            const index = this.treeLayer.indexOf(current);
            const previousPath = this.treeLayer.substring(0, index);
            this.treeLayer = previousPath;
            console.log(this.treeLayer);
        });

        this.newFolderElement.querySelector('#newFolderInput').addEventListener('change', e => {

            const folderName = e.target.value;
            e.target.value = "New Folder";
            this.createDir(this.treeLayer + folderName);
            this.newFolderElement.style.display = "none";
        });
    }

    onItemRename() {

    }

    onMouseUp(event) {

        document.querySelector('#newFolder').style.display = "none";
    }

    onNewFolder() {

        document.querySelector('#newFolder').style.display = "block";
    }

    onNewAsset = () => {

        console.log("import new asset:!");
    }

    onNewScript = () => {

        EditorWindowManager.Instance.sendEvent({type: Types.Event.OnCodeEditorOpen, data: "filename"});
        ConsoleManager.Warning("Creating New Javascript File.");
    }

    onRefresh() {

        this.buildTree();
        this.buildTreeElements();
        this.displayTreeLayers();
    }

    buildTree() {

        const treeData = EditorManager.GetTreeStructure().raw.split('|');
        for(const entry of treeData) {

            if(entry === "")
                continue;

            let type = null;
            const typePart = entry.split(']')[0].split('[')[1];
            const pathPart = entry.split(']')[1].split('[')[1];

            switch(typePart) {

                case "DIR": type = Types.OrganizerItemType.Directory; break;
                case "FILE": type = Types.OrganizerItemType.File; break;
                case "SCRIPT": type = Types.OrganizerItemType.Script; break;
                case "IMAGE": type = Types.OrganizerItemType.Image; break;
                
                default: type = Types.OrganizerItemType.File; break;
            }

            let exists = false;
            let dir = { path: pathPart, ext: type };
            this.tree.dirs.forEach(dirItem => {

                if(dirItem.path === dir.path && dirItem.ext === dir.ext)
                    exists = true;
            });

            if(!exists)
                this.tree.dirs.push({ path: pathPart, ext: type, element: null});
        }
    }

    buildTreeElements() {

        this.tree.dirs.forEach(dir => {

            if(dir.element === null || dir.element === undefined) {

                const name = dir.path.split('\\').pop();
                const folderElement = document.createElement('div');
                const textElement = document.createElement('p');
                const imageElement = document.createElement('img');
                folderElement.classList.add('organizer-folder');
                folderElement.appendChild(imageElement);
                folderElement.appendChild(textElement);
                textElement.textContent = name;
                let imagePath = "";
                switch(dir.ext) {

                    case Types.OrganizerItemType.Directory: imagePath = "img/folder.png"; break;
                    case Types.OrganizerItemType.File: imagePath = "img/file.png"; break;
                    case Types.OrganizerItemType.Image: imagePath = "img/image.png"; break;
                    case Types.OrganizerItemType.Script: imagePath = "img/script.png"; break;
                }
                imageElement.src = imagePath;
                const contentElement = document.querySelector('#projectWindow').querySelector('.content');
                folderElement.style.display = "none";
                contentElement.appendChild(folderElement);
                imageElement.addEventListener('dblclick', e => { this.treeLayer = dir.path + '\\' });
                textElement.addEventListener('dblclick', e => { console.log('changing name'); });
               
                const options = [
                    { text: "Rename", function: this.onItemRename },
                    { text: "Delete", function: () => this.onItemDelete(textElement.textContent) }
                ];
               
                this.addContextMenu(options, folderElement);
                dir.element = folderElement;
            } 
        });
    }

    displayTreeLayers() {

        this.backFolderElement.style.display = (this.treeLayer === '') ? "none" : "block";

        for(const dir of this.tree.dirs) {
            
            if(dir.path.startsWith(this.treeLayer)) {

                if(dir.path.split('\\').length === this.treeLayer.split('\\').length) {

                    dir.element.style.display = "block";
                    continue;
                }
            }

            dir.element.style.display = "none";
        }

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

    //On Login OK, Fetch Project File Structure
    async onUserLoggedIn(event) {

        const url = 'http://engine.local:3000/fsapi';
        const res = await BackendManager.Instance.getRequest(url);
        
        if(res.ok) {
            
            console.log(res);
            this.emptyElement.style.display = (res.data === '') ? "block" : "none";
            EditorManager.UpdateTreeStructure(res.data);
        }
    }

    //Create A New Folder On Server And Update Tree
    async createDir(name) {

        const url = "http://engine.local:3000/fsapi/dir";
        const body = {

            name: name,
            action: "create"
        };

        const res = await BackendManager.Instance.postAuthenticatedRequest(body, url);
        if(res.ok)
            EditorManager.UpdateTreeStructure(res.data);
    }   

    //Delete File or Folder On Server And Update Tree
    async onItemDelete(name) {

        const url = "http://engine.local:3000/fsapi/dir";
        const body = {

            name: name,
            action: "delete"
        };

        const res = await BackendManager.Instance.postAuthenticatedRequest(body, url);
        if(res.ok)
            EditorManager.UpdateTreeStructure(res.data);
    }
}