import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";

export class TextureRendererComponent extends Component {

    constructor(go) {

        const element = {

            parent: document.querySelector('#textureRendererComponent'),
            opacityInput:  document.querySelector('#textureRendererComponent').querySelector('#opacityInput'),
            sizingInput:  document.querySelector('#textureRendererComponent').querySelector('#sizingInput'),
            radiusTLInput: document.querySelector('#textureRendererComponent').querySelector('#radiusTLInput'),
            radiusTRInput: document.querySelector('#textureRendererComponent').querySelector('#radiusTRInput'),
            radiusBLInput: document.querySelector('#textureRendererComponent').querySelector('#radiusBLInput'),
            radiusBRInput: document.querySelector('#textureRendererComponent').querySelector('#radiusBRInput'),
            reapeatInput: document.querySelector('#textureRendererComponent').querySelector('#repeatInput'),
            xOffsetInput: document.querySelector('#textureRendererComponent').querySelector('#xOffsetInput'),
            yOffsetInput: document.querySelector('#textureRendererComponent').querySelector('#yOffsetInput')
        };

        super(go, Types.Component.TextureRenderer, element);
    }

    createListeners() {

        this.textureName = "";
        this.textureSource = "";
        this.offset = { x: 0, y:0 };
        this.element.opacityInput.addEventListener('input', e => this.changeOpacity(e.target.value));
        this.element.sizingInput.addEventListener('change', e => this.changeSizeMode(e.target.options[e.target.selectedIndex].text));
        this.element.radiusTLInput.addEventListener('input', e => this.radius.topLeft = e.target.value);
        this.element.radiusTRInput.addEventListener('input', e => this.radius.topRight = e.target.value);
        this.element.radiusBLInput.addEventListener('input', e => this.radius.bottomLeft = e.target.value);
        this.element.radiusBRInput.addEventListener('input', e => this.radius.bottomRight = e.target.value);
        this.element.xOffsetInput.addEventListener('input', e => this.changeOffset(e.target.value, this.offset.y));
        this.element.yOffsetInput.addEventListener('input', e => this.changeOffset(this.offset.x, e.target.value));
        this.element.reapeatInput.addEventListener('input', e => this.changeRepeatMode(e.target.options[e.target.selectedIndex].text));
    }

    start(){

        this.changeOpacity(1);
        this.changeOffset(0,0);
        this.changeRadius(0,0,0,0);
        this.changeSizeMode("Fit Object");

        this.element.opacityInput.value = this.opacity;
        //this.element.sizingInput.value = this.sizeMode;
        this.element.xOffsetInput.value = this.offset.x;
        this.element.yOffsetInput.value = this.offset.y;
        this.element.radiusTLInput.value = this.radius.topLeft;
        this.element.radiusTRInput.value = this.radius.topRight;
        this.element.radiusBLInput.value = this.radius.bottomLeft;
        this.element.radiusBRInput.value = this.radius.bottomRight;
    }

    update() {

        this.gameObject.editorElement.style.backgroundSize = this.sizeMode;
        this.gameObject.editorElement.style.backgroundRepeat = this.repeatMode;
        this.gameObject.editorElement.style.opacity = this.opacity;
        this.gameObject.editorElement.style.backgroundPosition = this.offset.x + "px " + this.offset.y + "px";
        this.gameObject.editorElement.style.borderTopLeftRadius = this.radius.topLeft + "px";
        this.gameObject.editorElement.style.borderTopRightRadius = this.radius.topRight + "px";
        this.gameObject.editorElement.style.borderBottomLeftRadius = this.radius.bottomLeft + "px";
        this.gameObject.editorElement.style.borderBottomRightRadius = this.radius.bottomRight + "px";
    }

    onTextureDropped(textureName, textureSource) {

        this.textureSource = textureSource;
        this.textureName = textureName;

        this.gameObject.editorElement.style.backgroundImage = "url(" + this.textureSource + ")";
    }

    changeOffset(x, y) {

        this.offset.x = x;
        this.offset.y = y;
        console.log("Current Offset: " + this.offset.x);
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


}
