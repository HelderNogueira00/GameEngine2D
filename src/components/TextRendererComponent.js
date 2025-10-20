import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";

export class TextRendererComponent extends Component {

    constructor(gameObject) {

        super(gameObject, Types.Component.TextRenderer);
    }

    start() {

        this.font = { 

            family: 'Roboto',
            size: 0.9,
            color: { red: 255, green: 255, blue: 255},
        }

        this.textData = "Sample Text Renderer";
        this.textTransform = 'normal';
    }

    update() {

        this.gameObject.editorTextElement.style.fontFamily = this.font.family;
        this.gameObject.editorTextElement.style.color = "rgb(" + this.font.color.red + "," + this.font.color.green + "," + this.font.color.blue + ")";
        this.gameObject.editorTextElement.style.fontSize = this.font.size + "rem";
        this.gameObject.editorTextElement.style.textTransform = this.textTransform;
        this.gameObject.editorTextElement.textContent = this.textData;
    }

    applyConfig(config) {

        this.textData = config.textData;
        this.textTransform = config.textTransform;
        this.font.family = config.font.family;
        this.font.size = config.font.size;
        this.font.color.red = config.font.color.red;
        this.font.color.blue = config.font.color.blue;
        this.font.color.green = config.font.color.green;
    }

    getConfig() {

        return {

            type: this.type,
            font: {
                family: this.font.family,
                size: this.font.size,
                color: {
                    red: this.font.color.red,
                    blue: this.font.color.blue,
                    green: this.font.color.green
                }
            },
            textData: this.textData,
            textTransform: this.textTransform
        };
    }
}
