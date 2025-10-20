import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";

export class RendererComponent extends Component {

    constructor(gameObject) {

      super(gameObject, Types.Component.Renderer);
    }

    start() {

      this.changeRadius(0,0,0,0);
      this.changeFillColor(255,255,255);
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

    applyConfig(config) {

      this.red = config.red;
      this.blue = config.blue;
      this.green = config.green;
      this.radius.topLeft = config.radius.topLeft;
      this.radius.topRight = config.radius.topRight;
      this.radius.bottomLeft = config.radius.bottomLeft;
      this.radius.bottomRight = config.radius.bottomRight;
    }

    getConfig() {

      return {

        type: this.type,
        red: this.red,
        green: this.green,
        blue: this.blue,
        radius: { topLeft: this.radius.topLeft, topRight: this.radius.topRight, bottomLeft: this.radius.bottomLeft, bottomRight: this.radius.bottomRight }
      };
    }
}
