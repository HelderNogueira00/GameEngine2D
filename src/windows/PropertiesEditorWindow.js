import { Component } from "../base/Component.js";
import { ConsoleManager } from "../managers/ConsoleManager.js";
import { EditorWindow } from "../base/EditorWindow.js";
import { EditorWindowManager } from "../managers/EditorWindowManager.js";
import { Types } from "../config/EngineStructs.js";
import { EditorManager } from "../managers/EditorManager.js";
import { ComponentsUI } from "../ui/ComponentsUI.js";
import { ThemeManager } from "../managers/ThemeManager.js";

export class PropertiesEditorWindow extends EditorWindow {

    constructor() {

        super(EditorWindow.Type.Properties);
    
        this.objIDElement = document.querySelector('.object-id');
        this.objNameElement = document.querySelector('.object-name');
        this.objRenameElement = document.querySelector('.object-rename');
        this.objRemoveElement = document.querySelector('.object-delete');
        this.objAddComponent = document.querySelector('.object-component');
        this.objPropertiesElement = document.querySelector('.objectProperties');
        this.objComponentsElement = this.objPropertiesElement.querySelector('.components');
        this.addComponentElement = document.querySelector('#addComponent');
        this.enabledElement= document.querySelector("#propertiesWindow").querySelector('#enabled');
        this.components = { transform: null, textRenderer: null, renderer: null, textureRenderer: null };
        this.currentObjectID = -1;

        this.objRemoveElement.addEventListener('click', () => {

            EditorWindowManager.Instance.getEngine().destroyObject(this.currentObjectID);
            this.onDeselect();
        });

  
        this.objAddComponent.addEventListener('click', e => { this.toggleAddComponent() });
        this.addComponentElement.querySelectorAll('.li').forEach(el => { el.addEventListener('click', e => { this.onNewComponent(e.target); })});

        this.createListeners();
        this.linkElements();
    }

    createListeners() {


    }

    onNewComponent(target) {

        this.toggleAddComponent();
        switch(target.getAttribute('type')) {
            
            case "renderer": EditorManager.GetGameObject(this.currentObjectID).addComponent(Types.Component.Renderer); break;
            case "textRenderer": EditorManager.GetGameObject(this.currentObjectID).addComponent(Types.Component.TextRenderer); break;
        }

        const goID = this.currentObjectID;
        this.onDeselect();
        this.onObjectSelected({data: goID});
    }

    toggleAddComponent() {

        if(this.addComponentElement.style.display === "none") {
            
            this.objComponentsElement.appendChild(this.addComponentElement);
            this.addComponentElement.style.display = "block";
        }
        else {

            this.addComponentElement.style.display = "none";
            this.objComponentsElement.removeChild(this.addComponentElement);
        }
    }

    onObjectSelected(event) {

        const gameObject = EditorManager.GetGameObject(event.data);
        this.currentObjectID = gameObject.id;
        this.objIDElement.textContent = "GameObject ID: " + gameObject.id;
        this.objNameElement.textContent = gameObject.name;

        this.drawComponents(gameObject.components);
        this.objPropertiesElement.style.display = "block";
    }

    onObjectDeselected() {


    }

    drawComponents(components) {

        console.log("Components: "+ components.length);
        components.forEach(component => {

            this.assignComponent(component);
            this.getComponentValues(component);
            this.addComponentListeners(component);
        });
    }

    assignComponent(component) {

        const parent = document.querySelector('#propertiesWindow').querySelector('.components');
        const newElement = document.createElement('div');
        newElement.classList.add('component');
        newElement.style.display = "block";
        component.element.parent = newElement;
        parent.appendChild(newElement);

        switch(component.type) {

            case Types.Component.Transform:

            newElement.setAttribute('id', 'transformComponent');
            newElement.innerHTML = ComponentsUI.getTransformUI();
            
            this.components.transform = {
                  type: Types.Component.Transform,
                  parent: newElement,
                  xPosInput: newElement.querySelector('#xPos'),
                  zRotInput: newElement.querySelector('#zRot'),
                  xSclInput: newElement.querySelector('#xScl'),
                  yPosInput: newElement.querySelector('#yPos'),
                  ySclInput: newElement.querySelector('#yScl')
                };
                break;

            case Types.Component.Renderer:

                newElement.setAttribute('id', 'rendererComponent');
                newElement.innerHTML = ComponentsUI.getRendererUI();
                this.components.renderer = {

                    type: Types.Component.Renderer,
                    parent: newElement,
                    paintingInput: newElement.querySelector('#paintingMode'),
                    redColorInput: newElement.querySelector('#redColor'),
                    greenColorInput: newElement.querySelector('#greenColor'),
                    blueColorInput: newElement.querySelector('#blueColor'),
                    tlRadiusInput: newElement.querySelector('#topLeft'),
                    trRadiusInput: newElement.querySelector('#topRight'),
                    blRadiusInput: newElement.querySelector('#bottomLeft'),
                    brRadiusInput: newElement.querySelector('#bottomRight')
                };
                break;

            case Types.Component.TextRenderer:

                newElement.setAttribute('id', 'textRendererComponent');
                newElement.innerHTML = ComponentsUI.getTextRendererUI();
                this.components.textRenderer =  {

                    type: Types.Component.TextRenderer,
                    parent: newElement,
                    textTransform: newElement.querySelector('#textTransform'),
                    textData: newElement.querySelector('#textData'),
                    fontFamily: newElement.querySelector('#fontFamily'),
                    fontSize: newElement.querySelector('#fontSize'),
                    textColorRed: newElement.querySelector('#redColor'),
                    textColorGreen: newElement.querySelector('#greenColor'),
                    textColorBlue: newElement.querySelector('#blueColor'),
                    elementBase: 'p'
                };
                break;

            case Types.Component.TextureRenderer:

                newElement.setAttribute('id', 'textureRendererComponent');
                newElement.innerHTML = ComponentsUI.getTextureRendererUI();
                this.components.textureRenderer = {
                    type: Types.Component.TextureRenderer,
                    parent: newElement,
                    textureInput: newElement.querySelector('#fileInput'),
                    opacityInput:  newElement.querySelector('#opacityInput'),
                    sizingInput:  newElement.querySelector('#sizingInput'),
                    radiusTLInput: newElement.querySelector('#radiusTLInput'),
                    radiusTRInput: newElement.querySelector('#radiusTRInput'),
                    radiusBLInput: newElement.querySelector('#radiusBLInput'),
                    radiusBRInput: newElement.querySelector('#radiusBRInput'),
                    reapeatInput: newElement.querySelector('#repeatInput'),
                    xOffsetInput: newElement.querySelector('#xOffsetInput'),
                    yOffsetInput: newElement.querySelector('#yOffsetInput'),
                    layerInput: newElement.querySelector('#zLayerInput')
                };
                break;
        }

        newElement.querySelectorAll('input').forEach(el => {

            const theme = ThemeManager.Instance.currentTheme;
            el.style.backgroundColor = theme.editorColor;
            el.style.color = theme.secondaryColor;
            el.style.borderColor = theme.windowBorderColor;
        });
    }

    getComponentValues(component) {

        this.enabledElement.checked = component.gameObject.enabled;
        switch(component.type) {

            case Types.Component.Transform:

                this.components.transform.xPosInput.value = component.position.x;
                this.components.transform.yPosInput.value = component.position.y;
                this.components.transform.zRotInput.value = component.rotation.x;
                this.components.transform.xSclInput.value = component.scaling.x;
                this.components.transform.ySclInput.value = component.scaling.y;
                break;

            case Types.Component.Renderer:

                this.components.renderer.redColorInput.value = component.red;
                this.components.renderer.greenColorInput.value = component.green;
                this.components.renderer.blueColorInput.value = component.blue;
                this.components.renderer.tlRadiusInput.value = component.radius.topLeft;
                this.components.renderer.trRadiusInput.value = component.radius.topRight;
                this.components.renderer.blRadiusInput.value = component.radius.bottomLeft;
                this.components.renderer.brRadiusInput.value = component.radius.bottomRight;
                break;

            case Types.Component.TextRenderer:

                this.components.textRenderer.textTransform.value = component.textTransform;
                this.components.textRenderer.textData.value = component.textData;
                this.components.textRenderer.fontFamily.value = component.font.family;
                this.components.textRenderer.fontSize.value = component.font.size;
                this.components.textRenderer.textColorRed.value = component.font.color.red;
                this.components.textRenderer.textColorBlue.value = component.font.color.blue;
                this.components.textRenderer.textColorGreen.value = component.font.color.green;
                break;

            case Types.Component.TextureRenderer:

                this.components.textureRenderer.textureInput.textContent = component.textureName;
                this.components.textureRenderer.opacityInput.value = component.opacity;
                this.components.textureRenderer.sizingInput.value = "fit";
                this.components.textureRenderer.radiusTLInput.value = component.radius.topLeft;
                this.components.textureRenderer.radiusTRInput.value = component.radius.topRight;
                this.components.textureRenderer.radiusBLInput.value = component.radius.bottomLeft;
                this.components.textureRenderer.radiusBRInput.value = component.radius.bottomRight;
                this.components.textureRenderer.xOffsetInput.value = component.offset.x;
                this.components.textureRenderer.yOffsetInput.value = component.offset.y;
                this.components.textureRenderer.reapeatInput.value = "no";
                this.components.textureRenderer.layerInput.value = component.layer;
                break;
        }
    }

    addComponentListeners(component) {

        this.enabledElement.addEventListener('change', e=> {

            component.gameObject.setActive(e.target.checked);
        });

        switch(component.type) {

            case Types.Component.Transform:
                this.components.transform.xPosInput.addEventListener('input', e => { component.position.x = e.target.value; });
                this.components.transform.yPosInput.addEventListener('input', e => { component.position.y = e.target.value; });
                this.components.transform.zRotInput.addEventListener('input', e => { component.rotation.z = e.target.value; });
                this.components.transform.xSclInput.addEventListener('input', e => { component.scaling.x = e.target.value; });
                this.components.transform.ySclInput.addEventListener('input', e => { component.scaling.y = e.target.value; });
                break;

            case Types.Component.Renderer:
                this.components.renderer.redColorInput.addEventListener('input', e => { component.red = e.target.value });
                this.components.renderer.greenColorInput.addEventListener('input', e => { component.green = e.target.value });
                this.components.renderer.blueColorInput.addEventListener('input', e => { component.blue = e.target.value });
                this.components.renderer.tlRadiusInput.addEventListener('input', e => { component.radius.topLeft = e.target.value });
                this.components.renderer.trRadiusInput.addEventListener('input', e => { component.radius.topRight = e.target.value });
                this.components.renderer.blRadiusInput.addEventListener('input', e => { component.radius.bottomLeft = e.target.value });
                this.components.renderer.brRadiusInput.addEventListener('input', e => { component.radius.bottomRight = e.target.value });
                break;

            case Types.Component.TextRenderer:
                this.components.textRenderer.textTransform.addEventListener('change', e => { component.textTransform = e.target.value });
                this.components.textRenderer.textData.addEventListener('input', e => { component.textData = e.target.value });
                this.components.textRenderer.fontFamily.addEventListener('input', e => { component.font.family = e.target.value });
                this.components.textRenderer.fontSize.addEventListener('input', e => { component.font.size = e.target.value });
                this.components.textRenderer.textColorRed.addEventListener('input', e=> { component.font.color.red = e.target.value });
                this.components.textRenderer.textColorGreen.addEventListener('input', e=> { component.font.color.green = e.target.value });
                this.components.textRenderer.textColorBlue.addEventListener('input', e => { component.font.color.blue = e.target.value });
                break;

            case Types.Component.TextureRenderer:
                this.components.textureRenderer.textureInput.addEventListener('dragover', e => e.preventDefault());
                this.components.textureRenderer.textureInput.addEventListener('drop', e => component.onTextureDropped(e));
                this.components.textureRenderer.opacityInput.addEventListener('input', e => component.changeOpacity(e.target.value));
                this.components.textureRenderer.sizingInput.addEventListener('change', e => component.changeSizeMode(e.target.options[e.target.selectedIndex].text));
                this.components.textureRenderer.radiusTLInput.addEventListener('input', e => component.radius.topLeft = e.target.value);
                this.components.textureRenderer.radiusTRInput.addEventListener('input', e => component.radius.topRight = e.target.value);
                this.components.textureRenderer.radiusBLInput.addEventListener('input', e => component.radius.bottomLeft = e.target.value);
                this.components.textureRenderer.radiusBRInput.addEventListener('input', e => component.radius.bottomRight = e.target.value);
                this.components.textureRenderer.xOffsetInput.addEventListener('input', e => component.changeOffset(e.target.value, component.offset.y));
                this.components.textureRenderer.yOffsetInput.addEventListener('input', e => component.changeOffset(component.offset.x, e.target.value));
                this.components.textureRenderer.reapeatInput.addEventListener('input', e => component.changeRepeatMode(e.target.options[e.target.selectedIndex].text));
                this.components.textureRenderer.layerInput.addEventListener('input', e => component.changeLayer(e.target.value));
                break;
        }
    }


    onDeselect() {

        this.currentObjectID = -1;
        this.objIDElement.textContent = "0";
        this.objNameElement.textContent = "";
        this.objPropertiesElement.style.display = "none";

        this.components = [];
        EditorManager.GetGameObjects().forEach(go => {
            go.components.forEach(component => {

                if(component.element !== undefined && component.element !== null) {
                    if(component.element.parent !== undefined && component.element.parent !== null) {

                        component.element.parent.remove();
                        component.element.parent = null;
                    }
                }
            });
        });
        document.querySelectorAll('.component').forEach(component => component.remove());
    }

    onObjectDeselected(event) { this.onDeselect();}


    linkElements() {
    }
}
