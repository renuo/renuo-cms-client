///<reference path="../models/content_block.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="local_storage_service.ts"/>
///<reference path="data_converter.ts"/>
///<reference path="../models/ajax_content_blocks_hash.ts"/>
///<reference path="../models/editable_content_block.ts"/>
///<reference path="../models/renuo_upload_credentials.ts"/>

class DataService {
  private dataCache:{[cacheKey: string]: JQueryPromise<AjaxContentBlocksHash>} = {};
  private localStorageService = new LocalStorageService();
  private renuoUploadCredentials:{[cacheKey: string]: JQueryPromise<RenuoUploadCredentials>} = {};
  private dataConverter = new DataConverter();

  constructor(private ajaxService:AjaxService) {
  }

  cacheKey(contentBlock:ContentBlock, enableHttpCaching:boolean) {
    return [contentBlock.apiHost, contentBlock.apiKey, enableHttpCaching].join('|');
  }

  storeContent(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<any> {
    return this.ajaxService.storeContentBlock(contentBlock, privateApiKey);
  }

  private loadAllContents(contentBlock:ContentBlock, enableHttpCaching:boolean):JQueryPromise<AjaxContentBlocksHash> {
    return this.ajaxService.fetchContentBlocks(contentBlock.apiKey, contentBlock.apiHost, enableHttpCaching).then(raw =>
      this.dataConverter.convertJsonObjectToHash(raw));
  };

  loadReadonlyContent(contentBlock:ContentBlock):JQueryPromise<ContentBlock> {
    return this.loadContent(contentBlock, true);
  }

  loadReadonlyContentFromCache(contentBlock:ContentBlock):ContentBlock {
    //const cacheKey = this.cacheKey(contentBlock, true);
    //const hash = this.localStorageService.fetch(cacheKey);

    const hash = null;
    if(!hash) return contentBlock;

    return this.dataConverter.extractObjectFromHash(contentBlock, hash);
  }

  loadEditableContent(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<EditableContentBlock> {
    const cbPromise = this.loadContent(contentBlock, false);
    const uploadPromise = this.loadRenuoUploadCredentials(contentBlock, privateApiKey);

    return jQuery.when<ContentBlock|RenuoUploadCredentials>(cbPromise, uploadPromise).then(
      (contentBlock:ContentBlock, credentials:RenuoUploadCredentials) =>
        new EditableContentBlock(contentBlock, credentials)
    );
  }

  private loadRenuoUploadCredentials(contentBlock:ContentBlock,
                                     privateApiKey:string):JQueryPromise<RenuoUploadCredentials> {
    const cacheKey = this.cacheKey(contentBlock, false);

    if (!this.renuoUploadCredentials[cacheKey]) this.renuoUploadCredentials[cacheKey] =
      this.ajaxService.getRenuoUploadCredentials(contentBlock, privateApiKey).then(
        (credentials:AjaxRenuoUploadCredentials) =>
          this.dataConverter.convertJsonObjectToCredentials(credentials));

    return this.renuoUploadCredentials[cacheKey];
  };

  private loadContent(contentBlock:ContentBlock, enableHttpCaching:boolean):JQueryPromise<ContentBlock> {
    const cacheKey = this.cacheKey(contentBlock, enableHttpCaching);

    if (!this.dataCache[cacheKey]) this.dataCache[cacheKey] = this.loadAllContents(contentBlock, enableHttpCaching);

    return this.dataCache[cacheKey].then((hash) => {
      //this.localStorageService.put(cacheKey, hash);
      return this.dataConverter.extractObjectFromHash(contentBlock, hash);
    });
  }
}
