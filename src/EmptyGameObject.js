import { GameObject } from "./GameObject";

export class EmptyGameObject extends GameObject {
    
    start() {

        console.log("start triggered!");
    }

    update() {

        console.log("update triggered!");
    }
}