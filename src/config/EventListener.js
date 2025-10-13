import { BackendManager } from "../managers/BackendManager";
import { EventsManager } from "../managers/EventsManager";

export class EventListener {

    constructor() {
        
        this.manager = EventsManager.Instance;
        this.manager.addListener(this);
    }

    onLoginDenied() {}
    onLoginGranted() {}
    onProjectsFetched() {}
    onProjectRenamed() {}
    onProjectDeleted() {}

    broadcast(event) {

        this.manager.broadcast(event);
    }
}