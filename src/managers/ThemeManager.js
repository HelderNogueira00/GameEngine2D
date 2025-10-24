import { Types } from "../config/EngineStructs.js";
import { EditorManager } from "./EditorManager.js";
import { EditorWindowManager } from "./EditorWindowManager.js";

export class ThemeManager {

    static Instance = undefined;

    static LightTheme = {
        
        editorColor: "#d5d5d5",
        primaryColor: "#0771c9fa",
        secondaryColor: "#101010",
        windowBodyColor: "#f1f1f1d2",
        windowBorderColor: "#b3b3b3ff",
        windowHeaderColor: "#ebebebff",
        workspaceGridBGColor: "#b3b3b3ff",
        workspaceGridCellBGColor: "#d5d5d5",
        workspaceGridCellBorderColor: "#b3b3b3ff"
    };

    static DarkTheme = {

        editorColor: "#151515",
        primaryColor: "#f0bc14fa",
        secondaryColor: "#d4d4d4",
        windowBodyColor: "#202020",
        windowBorderColor: "#404040",
        windowHeaderColor: "#202020",
        workspaceGridBGColor: "#444",
        workspaceGridCellBGColor: "#151515",
        workspaceGridCellBorderColor: "#303030"
    };

    constructor() {

        ThemeManager.Instance = this;

        this.linkElements();
        this.createThemes();
        this.applyTheme(this.darkTheme);
    }

    linkElements() {

        this.editorWindowElements = document.querySelectorAll('.window');
        this.switchThemeElement = document.querySelector('#switchTheme');
        this.editorBodyElement = document.querySelector('#editorElement');

        this.switchThemeElement.addEventListener('click', e => {

            e.preventDefault();
            this.applyTheme((this.currentTheme === this.lightTheme) ? this.darkTheme : this.lightTheme);
        });
    }

    createThemes() {

        this.darkTheme = ThemeManager.DarkTheme;
        this.lightTheme = ThemeManager.LightTheme;
    }

    applyTheme(theme) {

        this.currentTheme = theme;
        this.editorBodyElement.style.color = theme.secondaryColor;
        this.editorBodyElement.style.backgroundColor = theme.editorColor;

        this.editorWindowElements.forEach(el => {

            const header = el.querySelector('.window-header').querySelector('span');
            header.style.backgroundColor  = theme.windowHeaderColor
            header.style.color = theme.secondaryColor;

            const body = el.querySelector('.window-body');
            body.style.backgroundColor = theme.windowBodyColor;
            body.querySelector('.content').style.border = "2px solid " + theme.windowBorderColor;
        });

        document.querySelector('#windowContextMenu').style.backgroundColor = theme.editorColor;
        document.querySelectorAll('input').forEach(el => {

            el.style.backgroundColor = theme.editorColor;
            el.style.color = theme.secondaryColor;
            el.style.borderColor = theme.windowBorderColor;
        });

        document.querySelectorAll('a').forEach(el => el.style.color = theme.secondaryColor);
        EditorWindowManager.Instance.sendEvent({ type: Types.Event.OnThemeChanged, data: this.currentTheme});
    }

    
}