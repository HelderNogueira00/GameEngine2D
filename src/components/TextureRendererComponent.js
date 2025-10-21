import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";

export class TextureRendererComponent extends Component {

    constructor(go) {

        super(go, Types.Component.TextureRenderer);
    }

    createListeners() {

        this.layer = 50;
        this.textureName = "";
        this.textureSource = "";
        this.offset = { x: 0, y:0 };
    }

    start(){

        this.changeLayer(50);
        this.changeOpacity(1);
        this.changeOffset(0,0);
        this.changeRadius(0,0,0,0);
        this.changeSizeMode("Fit Object");
    }

    update() {

        this.gameObject.editorElement.style.zIndex = this.layer;
        this.gameObject.editorElement.style.backgroundSize = this.sizeMode;
        this.gameObject.editorElement.style.backgroundRepeat = this.repeatMode;
        this.gameObject.editorElement.style.opacity = this.opacity;
        this.gameObject.editorElement.style.backgroundPosition = this.offset.x + "px " + this.offset.y + "px";
        this.gameObject.editorElement.style.borderTopLeftRadius = this.radius.topLeft + "px";
        this.gameObject.editorElement.style.borderTopRightRadius = this.radius.topRight + "px";
        this.gameObject.editorElement.style.borderBottomLeftRadius = this.radius.bottomLeft + "px";
        this.gameObject.editorElement.style.borderBottomRightRadius = this.radius.bottomRight + "px";
        this.gameObject.editorElement.style.backgroundImage = "url(" + this.textureSource + ")";
    }

    onTextureDropped(e) {

        this.textureSource = e.dataTransfer.getData('text/plain').split('|')[0];
        this.textureName = e.dataTransfer.getData('text/plain').split('|')[1];
        e.target.textContent = this.textureName;
        this.gameObject.editorElement.style.backgroundImage = "url(" + this.textureSource + ")";
    }

    changeOffset(x, y) {

        this.offset.x = x;
        this.offset.y = y;
        console.log("Current Offset: " + this.offset.x);
    }

    changeLayer(z) {

        if(z > 100)
            z = 100;

        else if (z < 0)
            z = 0;

        this.layer = z;
    }

    changeSizeMode(mode) {

        let sizeMode = mode;
        console.log(sizeMode);
        switch(mode) {

            case "Original": sizeMode = "auto"; break;
            case "Fit Object": sizeMode = "contain"; break;
            case "Fill Object": sizeMode = "cover"; break;
            default: sizeMode = "cover"; break;
        }

        this.sizeMode = sizeMode;
    }

    changeRepeatMode(mode) {

        let repeat = mode;
        switch(mode) {

            case "No Repeat": repeat = "no-repeat"; break;
            case "Both": repeat = "repeat"; break;
            case "Horizontal": repeat = "repeat-x"; break;
            case "Vertical": repeat = "repeat-y"; break;
            default: repeat = "no-repeat"; break;
        }

        this.repeatMode = repeat;
    }

    changeRadius(tl, tr, bl ,br) {

        this.radius = { topLeft: tl, topRight: tr, bottomLeft: bl, bottomRight: br };
    }

    changeOpacity(level) {

        if(level >= 0 && level <= 1)
            this.opacity = level;

        else if(this.opacity > 1)
            this.opacity = 1;

        else this.opacity = 0;
    }

    applyConfig(config) {

        this.opacity = config.opacity;
        this.layer = config.layer;
        this.radius = config.radius;
        this.repeatMode = config.repeatMode;
        this.sizeMode = config.sizeMode;
        this.offset = config.offset;
        this.textureName = config.textureName;
        this.textureSource = config.textureSource;
    }

    getConfig() {

        return {

            type: this.type,
            opacity: this.opacity,
            layer: this.layer,
            radius: {
                tl: this.radius.topLeft,
                tr: this.radius.topRight,
                bl: this.radius.bottomLeft,
                br: this.radius.bottomRight
            },
            repeatMode: this.repeatMode,
            sizeMode: this.sizeMode,
            offset: {
                x: this.offset.x,
                y: this.offset.y
            },
            textureName: this.textureName,
            textureSource: this.textureSource
        };
    }


}
