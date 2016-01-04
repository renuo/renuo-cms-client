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
    const cacheKey = [contentBlock.apiHost, contentBlock.apiKey].join('|');

    if (!this.dataCache[cacheKey]) this.dataCache[cacheKey] = this.loadAllContents(contentBlock, enableHttpCaching);

    return this.dataCache[cacheKey].then((hash) => this.dataConverter.extractObjectFromHash(contentBlock, hash));
  }

  storeContent(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<any> {
    return this.ajaxService.storeContentBlock(contentBlock, privateApiKey);
  }

  private loadAllContents(contentBlock:ContentBlock, enableHttpCaching:boolean):JQueryPromise<AjaxContentBlocksHash> {
    return this.ajaxService.fetchContentBlocks(contentBlock.apiKey, contentBlock.apiHost, enableHttpCaching).then(raw =>
      this.dataConverter.convertJsonObjectToHash(raw));
  };
}
