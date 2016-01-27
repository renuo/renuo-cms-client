///<reference path="../models/content_block.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="data_converter.ts"/>
///<reference path="../models/ajax_content_blocks_hash.ts"/>

class DataService {
  private dataCache:{[cacheKey: string]: JQueryPromise<AjaxContentBlocksHash>} = {};
  private dataConverter = new DataConverter();

  constructor(private ajaxService:AjaxService) {
  }

  loadContent(contentBlock:ContentBlock, enableHttpCaching:boolean):JQueryPromise<ContentBlock> {
    const cacheKey = this.cacheKey(contentBlock, enableHttpCaching);

    if (!this.dataCache[cacheKey]) this.dataCache[cacheKey] = this.loadAllContents(contentBlock, enableHttpCaching);

    return this.dataCache[cacheKey].then((hash) => this.dataConverter.extractObjectFromHash(contentBlock, hash));
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

  loadEditableContent(contentBlock:ContentBlock):JQueryPromise<ContentBlock> {
    return this.loadContent(contentBlock, false);
  }
}
