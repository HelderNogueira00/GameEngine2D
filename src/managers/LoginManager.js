import { BackendEvents } from "../config/BackendEvents";
import { Types } from "../config/EngineStructs";
import { BackendManager } from "./BackendManager";
import { EditorWindowManager } from "./EditorWindowManager";

export class LoginManager {

    static Instance;
    constructor(backend) {
        
        LoginManager.Instance = this;

        this.backendManager = backend;
        this.loginOK = false;
        
        if(localStorage.getItem('token'))
            this.onTokenLogin();
    }

    isConnected() { 

        return this.loginOK;
    }

    async onLogin(username, password) {

        const body = {

            username: `${username}`,
            password: `${password}`
        };
        const res = await BackendManager.Instance.postRequest(body, Types.URI.LOGIN);
        const token = res.data.token;
        console.log(res);
        if(res.status === 200 && token !== undefined && token !== null) {
            
            this.onLoginGranted(token);
            return;
        }

        this.onLoginDenied();
    }

    async onTokenLogin() {
        
        const res = await BackendManager.Instance.getAuthenticatedRequest(Types.URI.TOKEN);
        const valid = res.data.valid;
        console.log(res);
        if(res.status === 200 && valid !== undefined && valid !== null) {

            if(valid === 0) {

                this.onLoginGranted(localStorage.getItem('token'));
                return;
            }
        }

        this.onLoginDenied();
    }

    onLoginGranted(token) {

        this.loginOK = true;
        localStorage.setItem('token', token);
        EditorWindowManager.Instance.sendEvent({ type: BackendManager.Events.OnLoginSuccess, data: token });
    }

    onLoginDenied() {

        this.loginOK = false;
        localStorage.removeItem('token');
        EditorWindowManager.Instance.sendEvent({ type: BackendManager.Events.OnLoginFailure, data: "" });
    }
}