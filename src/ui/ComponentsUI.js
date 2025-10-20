export class ComponentsUI {

    static getTransformUI() {

        return '' +
        '<div class="title">' +
        '<h2>Transform Component (DEFAULT)</h2></div><div class="body"><div class="row"><div class="title"><h6>Position: </h6>' +
        '</div>' +
        '<div class="args"><p >X: </p><input id="xPos" type="number"><p >Y: </p>' +
        '<input id="yPos" type="number"></div></div>' +
        '<div class="row"><div class="title"><h6>Rotation: </h6></div>' +
        '<div class="args"><p >Z: </p><input id="zRot" type="number"\/></div></div>' +
        '<div class="row"><div class="title"><h6>Scaling: </h6></div>' +
        '<div class="args"><p>X: </p><input id="xScl" type="number"\/><p>Y: </p><input id="yScl" type="number"/>' +
        '</div></div></div>';
    }

    static getRendererUI() {

        return ''+
        '<div class="title"><h2>Renderer Component</h2><button>Remove</button></div>'+
        '<div class="body">'+
        '<div class="row"><div class="title"><h6>Painting Mode: </h6></div>'+
        '<div class="args"><select id="paintingMode" name="fruits"><option value="color">Color</option></select></div></div>'+
        '<div class="row"><div class="title"><h6>RGB Color: </h6></div>'+
        '<div class="args"><p >Red: </p><input id="redColor" type="number"/><p >Green: </p><input id="greenColor" type="number"/><p >Blue: </p><input id="blueColor" type="number"/>'+
        '</div></div>'+
        '<div class="row"><div class="title"><h6>Radius Top: </h6></div>'+
        '<div class="args"><p >Left: </p><input id="topLeft" type="number"/><p >Right: </p><input id="topRight" type="number"/></div></div>'+
        '<div class="row"><div class="title"><h6>Radius Bottom: </h6></div>' +
        '<div class="args"><p >Left: </p><input id="bottomLeft" type="number"/><p >Right: </p><input id="bottomRight" type="number"/></div></div></div>';
    }

    static getTextRendererUI() {

        return ''+
        '<div class="title"><h2>Text Renderer Component</h2><button>Remove</button></div><div class="body">'+
        '<div class="row"><div class="title"><h6>Text Transform: </h6></div>'+
        '<div class="args"><select id="textTransform" name="fruits"><option value="normal">normal</option><option value="lower">lowercase</option>'+
        '<option value="upper">uppercase</option><option value="capital">capital</option></select></div></div>'+
        '<div class="row"><div class="title"><h6>Text: </h6></div>'+
        '<div class="args"><input id="textData" type="text"/></div></div>'+
        '<div class="row"><div class="title"><h6>Font Family: </h6></div>'+
        '<div class="args"><input id="fontFamily" type="text"/></div></div>'+
        '<div class="row"><div class="title"><h6>Font Size: </h6></div>'+
        '<div class="args"><input id="fontSize" type="number"/></div></div>'+
        '<div class="row"><div class="title"><h6>RGB Color: </h6></div>'+
        '<div class="args"><p >Red: </p><input id="redColor" type="number"/><p >Green: </p><input id="greenColor" type="number"/><p >Blue: </p><input id="blueColor" type="number"/>' +
        '</div></div></div>';
    }

    static getTextureRendererUI() {

        return '<div class="title"><h2>Texture Renderer</h2></div><div class="body">' +
        '<div class="row"><div class="title"><h6>Texture: </h6></div>'+
        '<div class="args"><div id="fileInput">File Input</div></div></div>'+
        '<div class="row"><div class="title"><h6>Opacity: </h6></div>'+
        '<div class="args"><input id="opacityInput" type="number" value="0"/></div></div>'+
        '<div class="row"><div class="title"><h6>Sizing Method: </h6></div>'+
        '<div class="args"><select id="sizingInput" name=""><option value="fit">Fit Object</option><option value="original">Original</option>'+
        '<option value="fill">Fill Object</option></select></div></div>'+
        '<div class="row"><div class="title"><h6>Repeat Mode: </h6></div>'+
        '<div class="args"><select id="repeatInput" name=""><option value="no">No Repeat</option><option value="both">Both</option><option value="vertical">Vertical</option>'+
        '<option value="horizontal">Horizontal</option></select></div></div>'+
        '<div class="row"><div class="title"><h6>Offset: </h6></div>'+
        '<div class="args"><p >X: </p><input id="xOffsetInput" type="number"/><p >Y: </p><input id="yOffsetInput" type="number"/></div></div>'+
        '<div class="row"><div class="title"><h6>Layer: </h6></div><div class="args"><p >0 - 255: </p><input id="zLayerInput" type="number"/></div></div>'+
        '<div class="row"><div class="title"><h6>Radius Top: </h6></div>'+
        '<div class="args"><p >Left: </p><input id="radiusTLInput" type="number"/><p >Right: </p><input id="radiusTRInput" type="number"/></div></div>'+
        '<div class="row"><div class="title"><h6>Radius Bottom: </h6></div>'+
        '<div class="args"><p >Left: </p><input id="radiusBLInput" type="number"/><p >Right: </p><input id="radiusBRInput" type="number"/></div>'+
        '</div></div>';
    }
}
