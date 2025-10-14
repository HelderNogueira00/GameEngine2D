import { BackendEvents } from "../config/BackendEvents";
import { Types } from "../config/EngineStructs";
import { BackendManager } from "./BackendManager";
import { EditorWindowManager } from "./EditorWindowManager";
import { EventsManager } from "./EventsManager";

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

    async logout() {

        const res = await BackendManager.Instance.getAuthenticatedRequest(Types.URI.LOGOUT);
        if(res.status === 200 && res.data !== undefined && res.data !== null) {

            localStorage.removeItem('token');
            EventsManager.Instance.broadcast({ type: EventsManager.Type.OnUserLoggedOut });
        }
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
        EventsManager.Instance.broadcast({ type: EventsManager.Type.OnLoginGranted, data: token });
    }

    onLoginDenied() {

        this.loginOK = false;
        localStorage.removeItem('token');
        EventsManager.Instance.broadcast({ type: EventsManager.Type.OnLoginDenied, data: ""});
    }
}