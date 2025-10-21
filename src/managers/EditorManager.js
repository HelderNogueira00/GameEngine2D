import { Types } from "../config/EngineStructs.js";
import { EventListener } from "../config/EventListener.js";
import { BackendManager } from "./BackendManager.js";
import { EditorWindowManager } from "./EditorWindowManager.js";

export class EditorManager extends EventListener {

    static Instance = null;
    constructor(engine) {

        super();
        EditorManager.Instance = this;

        this.engine = engine;
        this.treeStructure = { raw: "" };
        this.onProjectLoaded = this.onProjectLoaded.bind(this);
    }

    static GetAssetsCount() { return EditorManager.Instance.treeStructure.raw.split('|').length; }
    static GetEngine() { return EditorManager.Instance.engine; }
    static GetTreeStructure() { return EditorManager.Instance.treeStructure; }
    static UpdateTreeStructure(tree) { 
       
        EditorManager.Instance.treeStructure.raw = tree; 
        EditorWindowManager.Instance.sendEvent({ type: Types.Event.OnTreeUpdated });
    }
    static GetConfig() { return EditorManager.Instance.engine.config; }
    static GetPixelPerUnit() { return EditorManager.Instance.engine.config.PixelUnit; }
    static GetGameObjects() { return EditorManager.Instance.engine.objects; }
    static GetGameObject(id) { return EditorManager.Instance.engine.objects.find(go => go.id === id); }

    onFSRefresh(event) {

        console.log(event);
    }

    async onProjectLoaded(event) {

        this.projectID = event.data.id;
        this.projectName = event.data.name;
        const body = { projectID: this.projectID };
        const res = await BackendManager.Instance.postAuthenticatedRequest(body, Types.URI.FSRefresh);

        if(BackendManager.Instance.isOK(res)) {

            EditorManager.UpdateTreeStructure(res.data.data);
            console.log(res.data);
        }
    }
}
