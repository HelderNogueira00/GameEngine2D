import { EditorWindow } from "../base/EditorWindow";
import { EditorWindowManager } from "./EditorWindowManager";

export class EditorManager {

    static Instance = null;
    constructor(engine) {

        EditorManager.Instance = this;
        this.engine = engine;
    }

    static GetConfig() { return EditorManager.Instance.engine.config; }
    static GetPixelPerUnit() { return EditorManager.Instance.engine.config.PixelUnit; }
    static GetGameObjects() { return EditorManager.Instance.engine.objects; }
    static GetGameObject(id) { return EditorManager.Instance.engine.objects.find(go => go.id === id); }
}