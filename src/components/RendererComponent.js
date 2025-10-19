import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";

export class RendererComponent extends Component {

    constructor(gameObject) {

      const element = {

        parent: document.querySelector('#rendererComponent'),
        paintingInput: document.querySelector('#rendererComponent').querySelector('#paintingMode'),
        redColorInput: document.querySelector('#rendererComponent').querySelector('#redColor'),
        greenColorInput: document.querySelector('#rendererComponent').querySelector('#greenColor'),
        blueColorInput: document.querySelector('#rendererComponent').querySelector('#blueColor'),
        tlRadiusInput: document.querySelector('#rendererComponent').querySelector('#topLeft'),
        trRadiusInput: document.querySelector('#rendererComponent').querySelector('#topRight'),
        blRadiusInput: document.querySelector('#rendererComponent').querySelector('#bottomLeft'),
        brRadiusInput: document.querySelector('#rendererComponent').querySelector('#bottomRight')
      }
      
      super(gameObject, Types.Component.Renderer, element);
    }

    start() {

      this.changeRadius(0,0,0,0);
      this.changeFillColor(255,255,255);

      this.element.redColorInput.value = this.red;
      this.element.greenColorInput.value = this.green;
      this.element.blueColorInput.value = this.blue;

      this.element.tlRadiusInput.value = this.radius.topLeft;
      this.element.trRadiusInput.value = this.radius.topRight;
      this.element.blRadiusInput.value = this.radius.bottomLeft;
      this.element.brRadiusInput.value = this.radius.bottomRight;
    }

    createListeners() {

      this.element.redColorInput.addEventListener('input', e => { this.red = e.target.value });
      this.element.greenColorInput.addEventListener('input', e => { this.green = e.target.value });
      this.element.blueColorInput.addEventListener('input', e => { this.blue = e.target.value });

      this.element.tlRadiusInput.addEventListener('input', e => { this.radius.topLeft = e.target.value });
      this.element.trRadiusInput.addEventListener('input', e => { this.radius.topRight = e.target.value });
      this.element.blRadiusInput.addEventListener('input', e => { this.radius.bottomLeft = e.target.value });
      this.element.brRadiusInput.addEventListener('input', e => { this.radius.bottomRight = e.target.value });
    }

    changeFillColor(r, g, b) {

      this.red = r;
      this.green = g;
      this.blue = b;
    }

    changeRadius(tl, tr, bl ,br) {

      this.radius = { topLeft: tl, topRight: tr, bottomLeft: bl, bottomRight: br };
    }

    update() {

      this.gameObject.editorElement.style.borderTopLeftRadius = this.radius.topLeft + "px";
      this.gameObject.editorElement.style.borderTopRightRadius = this.radius.topRight + "px";
      this.gameObject.editorElement.style.borderBottomLeftRadius = this.radius.bottomLeft + "px";
      this.gameObject.editorElement.style.borderBottomRightRadius = this.radius.bottomRight + "px";
      this.gameObject.editorElement.style.backgroundColor = "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    }
}
