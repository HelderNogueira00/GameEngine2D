export class EditorWindow {

    constructor() {

        this.init(); 
    }

    init() {

        const resizableWindows = document.querySelectorAll('.window-resize');
        resizableWindows.forEach(handle => {

            let isResizing = false;

            handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isResizing = true;

            const windowElement = handle.parentElement;
            const initialWidth = windowElement.offsetWidth;
            const initialMouseX = e.clientX;

            const mouseMoveHandler = (moveEvent) => {
            if (!isResizing) return;

                var deltaX = moveEvent.clientX - initialMouseX;
                if(handle.classList.contains('window-resize-left'))
                    deltaX *= -1;

                windowElement.style.width = `${initialWidth + deltaX}px`;
                
            };

            const mouseUpHandler = () => {
                isResizing = false;
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                };

                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            });
        });
        
        let isResizingVertically = false;
        const verticalResizeHandle = document.querySelector('.container-resize');
        verticalResizeHandle.addEventListener('mousedown', (e) => {

            e.preventDefault();
            isResizingVertically = true;
            
            const bottomContainer = document.querySelector('.window-container-bottom');
            const initialHeight = bottomContainer.offsetHeight;
            const initialMouseY = e.clientY;

            const mouseMoveHandler = (moveEvent) => {
            if (!isResizingVertically) return;

                var deltaY = moveEvent.clientY - initialMouseY;
                bottomContainer.style.height = `${initialHeight - deltaY}px`;
            };

                const mouseUpHandler = () => {
                isResizingVertically = false;
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                };

                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
         
        })
    }
}