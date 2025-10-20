import { EditorWindow } from "../base/EditorWindow.js";
import { Types } from "../config/EngineStructs.js";
import { BackendManager } from "../managers/BackendManager.js";
import { ConsoleManager } from "../managers/ConsoleManager.js";
import { EditorManager } from "../managers/EditorManager.js";
import { EditorWindowManager } from "../managers/EditorWindowManager.js";

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
            { text: "Upload Asset", function: this.onUploadAsset },
            { text: "New Javascript", function: this.onNewScript },
            { text: "New Folder", function: this.onNewFolder }
        ];
        this.addContextMenu(this.mainContextMenuOptions, this.contentElement);
        //this.enableContextMenu(this.mainContextMenuOptions);
    }

    createListeners() {

        this.backFolderElement.addEventListener('dblclick', e => { 

            const barsLength = this.treeLayer.split('/').length;
            if(barsLength === 2) {

                this.treeLayer = '';
                this.onTreeUpdated(null);
                return;
            }

            const current = this.treeLayer.split('/')[barsLength - 2];
            const index = this.treeLayer.indexOf(current);
            const previousPath = this.treeLayer.substring(0, index);
            this.treeLayer = previousPath;
            this.onTreeUpdated(null);
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

    onUploadAsset = () => {

        const uploadElement = document.createElement('input');
        uploadElement.setAttribute('multiple', '');
        uploadElement.type = "file";
        uploadElement.style.display = "none";
        this.contentElement.appendChild(uploadElement);
        uploadElement.click();
        uploadElement.addEventListener('change', e => {

            for(const f of uploadElement.files) {

                const form = new FormData();
                form.append('myFile', f);

                //filter exts
                this.onUploadFile(this.treeLayer, form);
                uploadElement.remove();
            }
        });
    }

    onNewScript = () => {

        EditorWindowManager.Instance.sendEvent({type: Types.Event.OnCodeEditorOpen, data: "filename"});
        ConsoleManager.Warning("Creating New Javascript File.");
    }

    onRefresh() {


    }

    onTreeUpdated(event) {

        this.previewFiles();

        this.clear();
        this.buildTree();
        this.buildTreeElements();
        this.displayTreeLayers();

    }

    clear() {

        this.tree.dirs.forEach(dir => {

            if(dir.element)
                dir.element.remove();
        });

        this.tree.dirs = [];
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

    async getImage(basePath) {

        const name = EditorManager.Instance.projectName.replaceAll("/", ":");
        const path = basePath.replaceAll("/", ":");
        const url = Types.URI.FSGetFile + "/" + name + "/" + path;
        const res = await BackendManager.Instance.getAuthenticatedFile(url); 
        const imageURL = URL.createObjectURL(res.blob);
        return imageURL;
    }

    buildTreeElements() {

        this.tree.dirs.forEach(dir => {

            if(dir.element === null || dir.element === undefined) {

                const name = dir.path.split('/').pop();
                let imagePath = "";
                switch(dir.ext) {

                    case Types.OrganizerItemType.Directory: imagePath = "img/folder.png"; break;
                    case Types.OrganizerItemType.File: imagePath = "img/file.png"; break;
                    case Types.OrganizerItemType.Image: imagePath = "img/image.png"; break;
                    case Types.OrganizerItemType.Script: imagePath = "img/script.png"; break;
                }

                const folderElement = document.createElement('div');
                folderElement.classList.add('organizer-folder');
                folderElement.innerHTML = 
                    "<div class=\"organizer-folder\">" +
                            "<img src=\"" + imagePath + "\">" +
                            "<p>" + name + "</p>" +
                            "<input type=\"text\" value=\"name\" style=\"display: none\"/>" +
                    "</div>";

                const textElement = folderElement.getElementsByTagName('p')[0];
                const imageElement = folderElement.getElementsByTagName('img')[0];
                const inputElement = folderElement.getElementsByTagName('input')[0];
                const contentElement = document.querySelector('#projectWindow').querySelector('.content');
                folderElement.style.display = "none";
                contentElement.appendChild(folderElement);
                imageElement.addEventListener('dblclick', e => { 
                    
                    this.treeLayer = dir.path + '/';
                    this.onTreeUpdated(null);
                });
                imageElement.addEventListener('dragstart', e => {

                    e.dataTransfer.setData('text/plain', e.target.src + "|" + name);
                });
                textElement.addEventListener('dblclick', e => { console.log('changing name'); });
               
                inputElement.addEventListener('change', e => {

                    e.preventDefault();
                    e.target.style.display = "none";
                    textElement.style.display = "block";

                    this.renameDir(this.treeLayer + textElement.textContent, this.treeLayer + e.target.value);
                });

                const options = [
                    { text: "Rename", function: () => {

                        textElement.style.display = "none";
                        inputElement.style.display = "block";
                        inputElement.value = textElement.textContent;
                    }},
                    { text: "Delete", function: () => this.onItemDelete(this.treeLayer + textElement.textContent) }
                ];
               
                this.addContextMenu(options, folderElement);
                dir.element = folderElement;
            } 
        });
    }

    async displayTreeLayers() {

        this.backFolderElement.style.display = (this.treeLayer === '') ? "none" : "block";

        for(const dir of this.tree.dirs) {
            
            if(dir.path.startsWith(this.treeLayer)) {

                if(dir.path.split('/').length === this.treeLayer.split('/').length) {

                    dir.element.style.display = "block";
                    if(dir.ext === Types.OrganizerItemType.Image) {

                        const url = await this.getImage(dir.path);
                        dir.element.getElementsByTagName('img')[0].src = url;
                    }
                    continue;
                }
            }

            dir.element.style.display = "none";
        }

    }


    //Create A New Folder On Server And Update Tree
    async createDir(name) {

        const body = { projectID: EditorManager.Instance.projectID, name: name };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.FSCreateDir);
        
        if(BackendManager.Instance.isOK(res))
            EditorManager.UpdateTreeStructure(res.data.data);
    }   

    async renameDir(oldName, newName) {

        const body = { projectID: EditorManager.Instance.projectID, name: oldName, newName: newName };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.FSRenameDir);

        if(BackendManager.Instance.isOK(res))
            EditorManager.UpdateTreeStructure(res.data.data);
    }

    //Delete File or Folder On Server And Update Tree
    async onItemDelete(name) {

        console.log(name);
        const body = { projectID: EditorManager.Instance.projectID, name: name };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.FSDelete);

        if(BackendManager.Instance.isOK(res))
            EditorManager.UpdateTreeStructure(res.data.data);
    }

    async onUploadFile(name, form) {

        form.append('name', name);
        form.append('projectID', EditorManager.Instance.projectID);
        const body = form;
        const res = await BackendManager.Instance.postUpload(body, Types.URI.FSUpload);

        if(BackendManager.Instance.isOK(res))
            EditorManager.UpdateTreeStructure(res.data.data);
    }

    async previewFiles() {

        /*const body = { projectID: EditorManager.Instance.projectID };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.FSProjectFiles);

        if(BackendManager.Instance.isOK(res)) {

            const files = res.data.data;
            for(const f of files) {

                const url = Types.URI.FSGetFile + "/" + EditorManager.Instance.projectID + "/" + f;
                const res = await BackendManager.Instance.getAuthenticatedFile(url);
                const imgURL = URL.createObjectURL(res.blob);
                const img = this.tree.dirs.forEach(dir => {

                    console.log(dir.path);
                });
                //img.src = imgURL;
                //this.contentElement.appendChild(img);
            }
        }*/
    }
}
