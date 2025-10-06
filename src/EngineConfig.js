export class EngineConfig {

    static EngineState = Object.freeze({

        Initializing: 0,
        Editing: 1,
        Playing: 2
    });

    Framerate = 1;
    NextState = EngineConfig.EngineState.Initializing;
    CurrentState = EngineConfig.EngineState.Initializing;
}