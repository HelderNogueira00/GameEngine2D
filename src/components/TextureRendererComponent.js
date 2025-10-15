import { Component } from "../base/Component";
import { Types } from "../config/EngineStructs";

export class TextureRendererComponent extends Component {

    constructor(go) {

        const element = {

            parent: document.querySelector('#textureRendererComponent'),
            fileInput: document.querySelector('#fileInput')
        };

        super(go, Types.Component.TextureRenderer, element);
    }

    createListeners() {

        this.element.fileInput.addEventListener('click', e=> console.log('input selected'));
        this.element.fileInput.addEventListener('dragover', e => {

            e.preventDefault();
        });

        this.element.fileInput.addEventListener('drop', e => {
 e.preventDefault();
  console.log('Dropped:', e.dataTransfer);
        });
    }

    start(){


    }

    update() {

    }
}