import { EditorWindow } from "../base/EditorWindow";

export class OrganizerEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.Organizer);
        const contextMenuOptions = [
            { text: "Import New Asset", function: this.onNewAsset }
        ];

        this.enableContextMenu(contextMenuOptions);
    }

    onNewAsset = () => {

        console.log("import new asset:!");
    }

    onRefresh() {

        
    }
}