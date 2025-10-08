import { Component } from "./Component";

export class TransformComponent extends Component {

    constructor() {

        super(Component.Type.Transform);
    }

    start() {

        this.scaling = { x:1, y:1 };
        this.position = { x:0, y:0 };
        this.rotation = { x:0, y:0 };
    }

    update() {

    }

    translate(xDir, yDir) {

        this.position.x += xDir;
        this.position.y += yDir;
    }

    rotate(xDir, yDir) {

        this.rotation.x += xDir;
        this.rotation.y += yDir;
    }

    scale(xDir, yDir) {

        this.scaling.x += xDir;
        this.scaling.y += yDir;
    }
}