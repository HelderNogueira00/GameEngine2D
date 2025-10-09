export class InputManager {

    static Instance = null;
    constructor() {

        InputManager.Instance = this;
        this.horizontal = 0;
        this.vertical = 0;

        this.createListeners();
    }

    createListeners() {

        document.addEventListener('keydown', e => {

            switch(e.code) {

                case 'KeyA': this.horizontal = -1; break;
                case 'KeyD': this.horizontal = 1; break;
                case 'KeyW': this.vertical = 1; break;
                case 'KeyS': this.vertical = -1; break;

                case 'ArrowLeft': this.horizontal = -1; break;
                case 'ArrowRight': this.horizontal = 1; break;
                case 'ArrowUp': this.vertical = 1; break;
                case 'ArrowDown': this.vertical = -1; break;
            }
        });

        document.addEventListener('keypress', e => {

        });

        document.addEventListener('keyup', e => {

            switch(e.code) {

                case 'KeyA': this.horizontal = 0; break;
                case 'KeyD': this.horizontal = 0; break;
                case 'KeyW': this.vertical = 0; break;
                case 'KeyS': this.vertical = 0; break;

                case 'ArrowLeft': this.horizontal = 0; break;
                case 'ArrowRight': this.horizontal = 0; break;
                case 'ArrowUp': this.vertical = 0; break;
                case 'ArrowDown': this.vertical = 0; break;
            }
        });
    }

    reset() { this.horizontal = 0; this.vertical = 0; }
    static GetVertical() { return InputManager.Instance.vertical; }
    static GetHorizontal() { return InputManager.Instance.horizontal; }
}