import { BackendManager } from "./BackendManager.js";

export class ResourcesManager{

    static Instance = null;
    constructor(engine) {

        ResourcesManager.Instance = this;
        this.engine = engine;

        this.assets = [];
        this.isLoading = false;
        this.assetsCount = 0;
    }

    async addAsset(uri, id) {

        if(this.getAssetByID(id) !== undefined)
            return this.getAssetByID(id);
        
        if(this.getAssetByURI(uri) !== undefined)
            return this.getAssetByURI(uri);
        
        this.isLoading = true;
        const res = await BackendManager.Instance.getAuthenticatedFile(uri); 
        const urlBlob = URL.createObjectURL(res.blob);
        
        let asset = {

            id: id,
            uri: uri,
            blob: urlBlob
        };

        this.assets.push(asset);
        this.isLoading = false;
    }

    getAssetByID(id) {

        return this.assets.find(asset => asset.id === id);
    }

    getAssetByURI(uri) {

        return this.assets.find(asset => asset.uri === uri);
    }
}