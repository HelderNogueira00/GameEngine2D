
import { Types } from "../config/EngineStructs";
import { EventListener } from "../config/EventListener";
import { BackendManager } from "./BackendManager";
import { EditorWindowManager } from "./EditorWindowManager";

export class EditorManager extends EventListener {

    static Instance = null;
    constructor(engine) {

        super();
        EditorManager.Instance = this;

        this.engine = engine;
        this.treeStructure = { raw: "" };
        this.onProjectLoaded = this.onProjectLoaded.bind(this);
    }

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