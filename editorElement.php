<div id="editorElement">
    <div id="loadingPanel">
        <div class="body">
            <p>Loading, please wait a few seconds ...</p>
        </div>
    </div>
    <ul class="context-menu" id="windowContextMenu">

    </ul>

    <div id="transformArrow">
        <img id="#arrowX" src="img/arrowX.png" alt="">
        <img id="#arrowY" src="img/arrowY.png" alt="">
    </div>

    <div id="editorOptionsBar" class="options-bar">
        <ul>
            <li><a href="#">Project</a></li>
            <li><a href="#">Build</a></li>
            <li><a id="switchTheme" href="#">Theme</a></li>
            <li><a id="saveScene" href="#">SAVE</a></li>
            <li><a href="#">BACKUP</a></li>
            <li><a id="logout" href="#">LOGOUT</a></li>
            <p id="currentScene">No Scene Loaded</p>
        </ul>
    </div>

    <div class="actions-bar">
        <input type="number" max-length="4" placeholder="Framerate: 1000" id="framerate"/>
        <button id="play">PLAY</button>
        <button id="codeOpen">Open Code Editor</button>
        <button id="codeClose">Close Code Editor</button>
    
    </div>



    <div class="containers">
    <div class="window-container window-container-top">

        <div class="window" id="worldObjectsWindow">
            <div class="window-content">
                <div class="window-header">
                    <span>World Objects</span>
                </div>
                <div class="window-body" id="worldObjectsWindowContextArea">
                    <div class="content">
                     
                    </div>
                </div>
            </div>
              <div class="window-resize-right window-resize"></div>
        </div>

        <div class="window" id="workspaceWindow">
            <div class="window-content">
                <div class="window-header">
                    <span>Workspace</span>
                </div>
                <div class="window-body">
                     <div class="content horizontal">
                        <div class="grid" id="workspaceGrid">
                        </div>
                        <div id="gridObjects"></div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="window" id="codeWindow">
            <div class="window-content">
                <div class="window-header">
                    <span>Javascript Code Editor</span>
                </div>
                <div class="window-body">
                     <div class="content horizontal">
                        <div class="top">
                        </div>
                        <div class="body">
                            <textarea name="codeSection" id="codeSection">

                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="window" id="propertiesWindow">
            <div class="window-content">
                <div class="window-header">
                    <span>Properties</span>
                </div>
                <div class="window-body">
                     <div class="content">
                        <div class="objectProperties">
                            <div class="head">

                                <div class="info">
                                        <h4 class="object-name">Object Name</h4>
                                        <p class="object-id">object ID</p>
                                        <div class="active"><p>GameObject Enabled: </p><input type="checkbox" id="enabled"/></div>
                                    </div>
                                    <div class="actions">
                                        <p class="object-delete">Remove</p>
                                        <p class="object-component">Add Component</p>
                                    </div>
                            </div>
                            <div class="components">
                                <div class="component" id="addComponent">
                                    <ul>
                                        <li class="li" type="transform">> Transform Component</li>
                                        <li class="li" type="renderer">> Renderer Component</li>
                                        <li class="li" type="textRenderer">> Text Renderer Component</li>
                                        <li class="li">> New Script</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div class="window-resize-left window-resize"></div>
        </div>
</div>
    <div class="container-resize"></div>
<div class="window-container window-container-bottom">
        <div class="window" id="projectWindow">
            <div class="window-content">
                <div class="window-header">
                    <span>Organizer</span>
                </div>
                <div class="window-body">
                     <div class="content">
                        <p id="emptyText">No files or folders found!</p>
                        <div id="backFolder" class="organizer-folder" style="display: none;"><img src="img/folder.png"><p>../</p></div>
                        <div id="newFolder" class="organizer-folder" style="display: none;"><img src="img/folder.png">
                            <input id="newFolderInput" type="text" max-length="12" value="New Folder"/>
                        </div>

                        <div id="newScene" class="organizer-folder" style="display: none;"><img src="img/scene.png">
                            <input id="newSceneInput" type="text" max-length="12" value="New Scene"/>
                        </div>
                    </div>
                </div>
            </div>
              <div class="window-resize-right window-resize"></div>
        </div>

        <div class="window" id="consoleWindow">
            <div class="window-content">
                <div class="window-header">
                    <span>Console Viewer</span>
                </div>
                <div class="window-body">
                     <div class="content">
                    
                    </div>
                </div>
            </div>
        </div>

        <div class="window" id="statsWindow">
            <div class="window-content">
                <div class="window-header">
                    <span>Statistics</span>
                </div>
                <div class="window-body">
                     <div class="content">
                        <p id="goCount">GameObjects Count: 0</p>
                        <p id="loopsCount">Update Loops Count: 0</p>
                        <p id="assetsCount">Assets File Count: 0</p>
                        <p id="framerateCount">Editor Framerate: 0</p>
                        <p id="componentsCount">Components Count: 0</p>
                        <p id="apiCount">Server API Requests: 0</p>
                     </div>
                </div>
            </div>
             <div class="window-resize-left window-resize"></div>
        </div>
    </div>
    </div>
</div>
</div>
