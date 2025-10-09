<div id="editorElement">
    <ul class="context-menu" id="windowContextMenu">

    </ul>

    <div id="transformArrow">
        <img id="#arrowX" src="img/arrowX.png" alt="">
        <img id="#arrowY" src="img/arrowY.png" alt="">
    </div>

    <div class="options-bar">
        <ul>
            <li><a href="#">Project</a></li>
            <li><a href="#">Build</a></li>
            <li><a href="#">SETTINGS</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">BACKUP</a></li>
            <li><a href="#">HELP</a></li>
        </ul>
    </div>

    <div class="actions-bar">
        <input type="number" max-length="4" placeholder="Framerate: 1000" id="framerate"/>
        <button id="play">PLAY</button>
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
                                    </div>
                                    <div class="actions">
                                        <p class="object-delete">Remove</p>
                                        <p class="object-component">Add Component</p>
                                    </div>
                            </div>
                            <div class="components">
                                <div class="component" id="transformComponent">
                                   <div class="title"><h2>Transform Component (DEFAULT)</h2></div>
                                    <div class="body">
                                        <div class="row">
                                            <div class="title">
                                                <h6>Position: </h6>
                                            </div>    
                                            <div class="args">
                                                <p >X: </p>
                                                <input id="xPos" type="number"/>
                                                <p >Y: </p>
                                                <input id="yPos" type="number"/>
                                            </div>
                                        </div>

                                         <div class="row">
                                            <div class="title">
                                                <h6>Rotation: </h6>
                                            </div>    
                                            <div class="args">
                                                <p >Z: </p>
                                                <input id="zRot" type="number"/>
                                            </div>
                                        </div>

                                         <div class="row">
                                            <div class="title">
                                                <h6>Scaling: </h6>
                                            </div>    
                                            <div class="args">
                                                <p>X: </p>
                                                <input id="xScl" type="number"/>
                                                <p>Y: </p>
                                                <input id="yScl" type="number"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="rendererComponent" class="component">
                                  <div class="title"><h2>Renderer Component</h2><button>Remove</button></div>
                                    <div class="body">
                                        <div class="row">
                                            <div class="title">
                                                <h6>Painting Mode: </h6>
                                            </div>    
                                            <div class="args">
                                                <select id="paintingMode" name="fruits">
                                                    <option value="color">Color</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="title">
                                                <h6>RGB Color: </h6>
                                            </div>    
                                            <div class="args">
                                                <p >Red: </p>
                                                <input id="redColor" type="number"/>
                                                <p >Green: </p>
                                                <input id="greenColor" type="number"/>
                                                <p >Blue: </p>
                                                <input id="blueColor" type="number"/>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="title">
                                                <h6>Radius Top: </h6>
                                            </div>    
                                            <div class="args">
                                                <p >Left: </p>
                                                <input id="topLeft" type="number"/>
                                                <p >Right: </p>
                                                <input id="topRight" type="number"/>
                                            </div>
                                        </div>
                                         <div class="row">
                                            <div class="title">
                                                <h6>Radius Bottom: </h6>
                                            </div>    
                                            <div class="args">
                                                <p >Left: </p>
                                                <input id="bottomLeft" type="number"/>
                                                <p >Right: </p>
                                                <input id="bottomRight" type="number"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="component" id="textRendererComponent">
                                      <div class="title"><h2>Text Renderer Component</h2><button>Remove</button></div>
                                    <div class="body">
                                        <div class="row">
                                            <div class="title">
                                                <h6>Text Transform: </h6>
                                            </div>    
                                            <div class="args">
                                                <select id="textTransform" name="fruits">
                                                    <option value="normal">normal</option>
                                                    <option value="lower">lowercase</option>
                                                    <option value="upper">uppercase</option>
                                                    <option value="capital">capital</option>
                                                </select>
                                            </div>
                                        </div>


                                         <div class="row">
                                            <div class="title">
                                                <h6>Text: </h6>
                                            </div>    
                                            <div class="args">
                                                <input id="textData" type="text"/>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="title">
                                                <h6>Font Family: </h6>
                                            </div>    
                                            <div class="args">
                                                <input id="fontFamily" type="text"/>
                                            </div>
                                        </div>

                                      <div class="row">
                                            <div class="title">
                                                <h6>Font Size: </h6>
                                            </div>    
                                            <div class="args">
                                                <input id="fontSize" type="number"/>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="title">
                                                <h6>RGB Color: </h6>
                                            </div>    
                                            <div class="args">
                                                <p >Red: </p>
                                                <input id="redColor" type="number"/>
                                                <p >Green: </p>
                                                <input id="greenColor" type="number"/>
                                                <p >Blue: </p>
                                                <input id="blueColor" type="number"/>
                                            </div>
                                        </div>
                                        
                                    
                                    </div>
                                </div>

                                

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
                        
                     </div>
                </div>
            </div>
             <div class="window-resize-left window-resize"></div>
        </div>
    </div>
    </div>
</div>
</div>