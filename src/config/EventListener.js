import { BackendManager } from "../managers/BackendManager.js";
import { EventsManager } from "../managers/EventsManager.js";

export class EventListener {

    constructor() {
        
        EventsManager.Instance.addListener(this);
    }

    onLoginDenied() {}
    onLoginGranted() {}
    onProjectsFetched() {}
    onProjectRenamed() {}
    onProjectDeleted() {}
    onProjectLoaded() {}
    onUserLoggedOut() {}

    broadcast(event) {

        EventsManager.Instance.broadcast(event);
    }
}
