import { EditorWindow } from "../base/EditorWindow.js";
import { Types } from "../config/EngineStructs.js";
import { EditorWindowManager } from "../managers/EditorWindowManager.js";

export class CodeEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.CodeEditor);
        this.linkElements();
        this.createListeners();
    }

    linkElements() {

        this.closeEditorButton = document.querySelector('#codeClose');
        this.openEditorButton = document.querySelector('#codeOpen');

        this.closeEditorButton.style.display = "none";
    }

    createListeners() {

        this.openEditorButton.addEventListener('click', e => { EditorWindowManager.Instance.sendEvent({type: Types.Event.OnCodeEditorOpen, data: "filename"})});
        this.closeEditorButton.addEventListener('click', e => { EditorWindowManager.Instance.sendEvent({type: Types.Event.OnCodeEditorClose, data: "filename"})});
    }

    onCodeEditorOpened(event) {

        this.element.style.display = "block";
        this.openEditorButton.style.display = "none";
        this.closeEditorButton.style.display = "block";
    }

    onCodeEditorClosed(event) {

        this.element.style.display = "none";
        this.closeEditorButton.style.display = "none";
        this.openEditorButton.style.display = "block";
    }
}

