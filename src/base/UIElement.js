import { EventListener } from "../config/EventListener";

export class UIElement extends EventListener {
    
    constructor() {

        super();
        this.containers = [];
        this.linkElements();
        this.createListeners();
        this.initialize();
    }

    addContainer(id, containerName) {

        const containerElement = document.querySelector(id);
        if(!containerElement)
            return;

        this.containers.push({ name: containerName, parent: containerElement, elements: [] });
    }

    addElement(containerName, elementID, elementName) {

        this.containers.forEach(container => {

            if(container.name === containerName) {

                const element = container.parent.querySelector(elementID);
                container.elements.push({ name: elementName, element: element });
                return;
            }
        });
    }

    getContainer(containerName) {

        return this.containers.find(container => container.name === containerName);
    }

    getElement(containerName, elementName) {

        const container = this.getContainer(containerName);
        return container.elements.find(el => el.name === elementName).element;
    }

    getValue(containerName, elementName) {

        return this.getElement(containerName, elementName).value;
    }

    hideContainer(containerName) {

        const container = this.getContainer(containerName);
        container.parent.style.display = "none";
    }

    showContainer(containerName) {

        const container = this.getContainer(containerName);
        container.parent.style.display = "block";
    }

    disableContainer(containerName) {
         
        const container = this.getContainer(containerName);
        container.elements.forEach(el => { el.element.disabled = true; });
    }

    enableContainer(containerName) {

        const container = this.getContainer(containerName);
        container.elements.forEach(el => { el.element.disabled = false; })
    }

    initialize() {}
    linkElements() {}
    createListeners() {}
}