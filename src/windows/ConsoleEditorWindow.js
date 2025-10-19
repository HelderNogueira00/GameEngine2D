import { EditorWindow } from "../base/EditorWindow.js";


export class ConsoleEditorWindow extends EditorWindow{

    constructor(){

        super(EditorWindow.Type.Console);
        this.logsListElement = this.element.querySelector('.content');
    }

    createElement(logString) {

        const logElement = document.createElement('p');
        logElement.textContent = "[" + new Date() + "]: " + logString;
        this.logsListElement.appendChild(logElement);

        return logElement;
    }

    log(string) {

        const el = this.createElement(string);
        el.classList.add('console-log');
        el.style.color = "#d4d4d4fa";
    }

    error(string) {

        const el = this.createElement(string);
        el.classList.add('console-error');
        el.style.color = "#f04e38fa";
    }

    warning(string) {

        const el = this.createElement(string);
        el.classList.add('console-warning');
        el.style.color = "#f0bc14fa";
    }
}
