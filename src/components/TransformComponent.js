import { Component } from "../base/Component.js";
import { Types } from "../config/EngineStructs.js";
import { EditorManager } from "../managers/EditorManager.js";

export class TransformComponent extends Component {

    constructor(gameObject) {

        const transformComponent = document.querySelector('#transformComponent').cloneNode(true);
        transformComponent.setAttribute("id", "transformComponent-" + gameObject.id);
        document.querySelector('.components').appendChild(transformComponent);
        const element = {
            
            parent: transformComponent,
            xPosInput: transformComponent.querySelector('#xPos'),
            zRotInput: transformComponent.querySelector('#zRot'),
            xSclInput: transformComponent.querySelector('#xScl'),
            yPosInput: transformComponent.querySelector('#yPos'),
            ySclInput: transformComponent.querySelector('#yScl')
        }
        
        super(gameObject, Types.Component.Transform, element);

    }
    
    createListeners() {
        
        this.element.xPosInput.addEventListener('input', e => { this.position.x = e.target.value; });
        this.element.yPosInput.addEventListener('input', e => { this.position.y = e.target.value; });
        this.element.zRotInput.addEventListener('input', e => { this.rotation.z = e.target.value; });
        this.element.xSclInput.addEventListener('input', e => { this.scaling.x = e.target.value; });
        this.element.ySclInput.addEventListener('input', e => { this.scaling.y = e.target.value; });
    }

    start() {

        this.reset();
        this.element.xPosInput.value = this.position.x;
        this.element.yPosInput.value = this.position.y;
        this.element.zRotInput.value = this.rotation.z;
        this.element.xSclInput.value = this.scaling.x;
        this.element.ySclInput.value = this.scaling.y;
    }

    reset() {

        this.scaling = { x:1, y:1 };
        this.rotation = { z:0};
        this.position = { x:0, y:0 };
    }

    update() {

        this.element.xPosInput.value = this.position.x;
        this.element.yPosInput.value = this.position.y;
        this.element.zRotInput.value = this.rotation.z;
        this.element.xSclInput.value = this.scaling.x;
        this.element.ySclInput.value = this.scaling.y;

        this.gameObject.editorElement.style.left = this.position.x * EditorManager.GetPixelPerUnit() + "px";
        this.gameObject.editorElement.style.top = this.position.y * EditorManager.GetPixelPerUnit() + "px";
        this.gameObject.editorElement.style.width = this.scaling.x * EditorManager.GetPixelPerUnit() + "px";
        this.gameObject.editorElement.style.height = this.scaling.y * EditorManager.GetPixelPerUnit() + "px";
    }

    translate(xDir, yDir) {

        this.position.x += xDir;
        this.position.y += yDir;
    }

    rotate(zDir) {

        this.rotation.z += zDir;
    }

    scale(xDir, yDir) {

        this.scaling.x += xDir;
        this.scaling.y += yDir;
    }
}
