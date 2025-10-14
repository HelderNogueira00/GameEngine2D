import { EngineConfig } from "../config/EngineConfig";

export class EventsManager {

    static Type = Object.freeze({

        OnLoginGranted: 200,
        OnLoginDenied: 201,
        OnProjectsFetched: 202,
        OnProjectDeleted: 203,
        OnProjectRenamed: 204,
        onProjectCreated: 205,
        OnUserLoggedOut: 206,
        OnProjectLoaded: 207,
        OnFSRefresh: 208
    });
    static Instance = null;
    
    constructor(engine) {

        EventsManager.Instance = this;
        this.listeners = [];
        this.engine = engine;
    }

    addListener(listener) {

        this.listeners.push(listener);
    }

    broadcast(event) {

        if(!event.type)
            return;

        switch(event.type) {

            case EventsManager.Type.OnLoginGranted: 
                this.listeners.forEach(l => l.onLoginGranted(event)); 
            break;

            case EventsManager.Type.OnLoginDenied: 
                this.listeners.forEach(l => l.onLoginDenied(event)); 
                break;
            case EventsManager.Type.OnProjectsFetched: 
                this.listeners.forEach(l => l.onProjectsFetched(event)); 
            break;
            case EventsManager.Type.OnProjectDeleted: 
                this.listeners.forEach(l => l.onProjectDeleted(event)); 
                break;
            case EventsManager.Type.OnProjectRenamed: 
                this.listeners.forEach(l => l.onProjectRenamed(event)); 
                break;
            case EventsManager.Type.onProjectCreated: this.listeners.forEach(l => l.onProjectCreated(event)); break;
            case EventsManager.Type.OnUserLoggedOut: 
            
                this.listeners.forEach(l => l.onUserLoggedOut(event)); 
                this.engine.changeState(EngineConfig.EngineState.Initializing);
            break;
            case EventsManager.Type.OnProjectLoaded: 
                
                this.listeners.forEach(l => l.onProjectLoaded(event)); 
                break;

            case EventsManager.Type.OnFSRefresh:

                this.listeners.forEach(l => l.onFSRefresh(event));
                break;
        }
    }
}