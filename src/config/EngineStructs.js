export class Types {

    static Component = Object.freeze({

        Undefined: 0,
        Transform: 1,
        Renderer: 2,
        TextRenderer: 3
    });

    static Event = Object.freeze({

        ObjectCreated: 1,
        ObjectDestroyed: 2,
        ObjectSelected: 3,
        ObjectDeselected: 4,
        MouseUP: 5,
        OnNewFrame: 6,
        OnCodeEditorOpen: 7,
        OnCodeEditorClose: 8,
        OnUserLoggedIn: 9,
        OnUserLoggedOut: 10
    });

    static OrganizerItemType = Object.freeze({

        Directory: 0,
        File: 1,
        Script: 2,
        Image: 3
    });
}