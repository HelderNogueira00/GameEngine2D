export class EngineConfig {

    static EngineState = Object.freeze({

        Initializing: 0,
        Editing: 1,
        Playing: 2
    });

    static PixelUnit = 41;
    GameFramerate = 10000;
    EditorFramerate = 100;
    EngineFramerate = 1000;

    NextState = EngineConfig.EngineState.Initializing;
    CurrentState = EngineConfig.EngineState.Initializing;
}