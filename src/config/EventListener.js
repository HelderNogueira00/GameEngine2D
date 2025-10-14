import { BackendManager } from "../managers/BackendManager";
import { EventsManager } from "../managers/EventsManager";

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