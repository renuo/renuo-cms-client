///<reference path="../models/content_block.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="data_converter.ts"/>

class DataService {
  private dataCache:{[id: string]: JQueryPromise<{[id: string]: AjaxContentBlock}>} = {};
  private dataConverter = new DataConverter();

  constructor(private ajaxService:AjaxService) {
  }

  loadContent(contentBlock:ContentBlock):JQueryPromise<ContentBlock> {
    const cacheKey = [contentBlock.apiHost, contentBlock.apiKey].join('|');

    if (!this.dataCache[cacheKey]) this.dataCache[cacheKey] = this.loadAllContents(contentBlock);

    return this.dataCache[cacheKey].then((hash) => this.dataConverter.extractObjectFromHash(contentBlock, hash));
  }

  storeContent(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<any> {
    return this.ajaxService.storeContentBlock(contentBlock, privateApiKey);
  }

  private loadAllContents(contentBlock:ContentBlock):JQueryPromise<{[id: string]: AjaxContentBlock}> {
    return this.ajaxService.fetchContentBlocks(contentBlock.apiKey, contentBlock.apiHost).then(raw =>
      this.dataConverter.convertJsonObjectToHash(raw));
  };
}
