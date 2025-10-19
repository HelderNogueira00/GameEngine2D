import { EditorWindow } from "../base/EditorWindow.js";
import { EditorWindowManager } from "./EditorWindowManager.js";

export class ConsoleManager {

    static Log(string) {

        EditorWindowManager.Instance.getWindow(EditorWindow.Type.Console).log(string);
    }

    static Warning(string) {

        EditorWindowManager.Instance.getWindow(EditorWindow.Type.Console).warning(string);
    }

    static Error(string) {

        EditorWindowManager.Instance.getWindow(EditorWindow.Type.Console).error(string);
    }

}
