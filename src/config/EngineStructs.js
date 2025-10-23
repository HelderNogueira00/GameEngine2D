export class Types {

    static Component = Object.freeze({

        Undefined: 0,
        Transform: 1,
        Renderer: 2,
        TextRenderer: 3,
        TextureRenderer: 4
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
        OnUserLoggedOut: 10,
        OnTreeUpdated: 11,
        OnControlDDown: 12,
        OnThemeChanged: 13
    });

    static OrganizerItemType = Object.freeze({

        Directory: 0,
        File: 1,
        Script: 2,
        Image: 3
    });

    static URI = Object.freeze({

        LOGOUT: 'http://engine.local:3000/auth/logout',
        LOGIN: 'http://engine.local:3000/auth/login',
        TOKEN: 'http://engine.local:3000/auth/token',
        FSAPI: 'http://engine.local:3000/fsapi',
        FSRefresh: 'http://engine.local:3000/fs/refresh',
        FSCreateDir: 'http://engine.local:3000/fs/create_dir',
        FSRenameDir: 'http://engine.local:3000/fs/rename',
        FSDelete: 'http://engine.local:3000/fs/delete',
        FSUpload: 'http://engine.local:3000/fs/upload',
        FSGetFile: 'http://engine.local:3000/fs/view',
        FSProjectFiles: 'http://engine.local:3000/fs/files',
        FetchProjects: 'http://engine.local:3000/projects/fetch',
        DeleteProject: 'http://engine.local:3000/projects/delete',
        CreateProject: 'http://engine.local:3000/projects/create',
        LoadProject: 'http://engine.local:3000/projects/load'
    });
}

