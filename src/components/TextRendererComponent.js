import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";

export class TextRendererComponent extends Component {

    constructor(gameObject) {

        const element = {

            parent: document.querySelector('#textRendererComponent'),
            textTransform: document.querySelector('#textRendererComponent').querySelector('#textTransform'),
            textData: document.querySelector('#textRendererComponent').querySelector('#textData'),
            fontFamily: document.querySelector('#textRendererComponent').querySelector('#fontFamily'),
            fontSize: document.querySelector('#textRendererComponent').querySelector('#fontSize'),
            textColorRed: document.querySelector('#textRendererComponent').querySelector('#redColor'),
            textColorGreen: document.querySelector('#textRendererComponent').querySelector('#greenColor'),
            textColorBlue: document.querySelector('#textRendererComponent').querySelector('#blueColor'),
            elementBase: 'p'
        };

        super(gameObject, Types.Component.TextRenderer, element);
    }

    createListeners() {

        this.element.textTransform.addEventListener('change', e => { this.textTransform = e.target.value });
        this.element.textData.addEventListener('input', e => { this.textData = e.target.value });
        this.element.fontFamily.addEventListener('input', e => { this.font.family = e.target.value });
        this.element.fontSize.addEventListener('input', e => { this.font.size = e.target.value });
        this.element.textColorRed.addEventListener('input', e=> { this.font.color.red = e.target.value });
        this.element.textColorGreen.addEventListener('input', e=> { this.font.color.green = e.target.value });
        this.element.textColorBlue.addEventListener('input', e => { this.font.color.blue = e.target.value });
    }

    start() {

        this.font = { 

            family: 'Roboto',
            size: 0.9,
            color: { red: 255, green: 255, blue: 255},
        }

        this.textData = "Sample Text Renderer";
        this.textTransform = 'normal';

        this.element.textTransform.value = this.textTransform;
        this.element.textData.value = this.textData;
        this.element.fontFamily.value = this.font.family;
        this.element.fontSize.value = this.font.size;
        this.element.textColorRed.value = this.font.color.red;
        this.element.textColorBlue.value = this.font.color.blue;
        this.element.textColorGreen.value = this.font.color.green;
    }

    update() {

        this.gameObject.editorTextElement.style.fontFamily = this.font.family;
        this.gameObject.editorTextElement.style.color = "rgb(" + this.font.color.red + "," + this.font.color.green + "," + this.font.color.blue + ")";
        this.gameObject.editorTextElement.style.fontSize = this.font.size + "rem";
        this.gameObject.editorTextElement.style.textTransform = this.textTransform;
        this.gameObject.editorTextElement.textContent = this.textData;
    }
}
