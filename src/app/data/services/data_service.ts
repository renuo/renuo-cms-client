///<reference path="../models/content_block.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="data_converter.ts"/>

class DataService {
  private dataCache:{[id: string]: JQueryPromise<any>} = {};

  constructor(private ajaxService:AjaxService) {
  }

  loadContent(contentBlock:ContentBlock):JQueryPromise<ContentBlock> {
    const cacheKey = [contentBlock.apiHost, contentBlock.apiKey].join('|');

    if (!this.dataCache[cacheKey]) this.dataCache[cacheKey] = this.loadAllContents(contentBlock);

    const dataConverter = new DataConverter();
    return this.dataCache[cacheKey].then((raw) => dataConverter.convertJsonFromArray(contentBlock, raw));
  }

  storeContent(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<any> {
    return this.ajaxService.storeContentBlock(contentBlock, privateApiKey);
  }

  private loadAllContents(contentBlock:ContentBlock):JQueryPromise<any> {
    return this.ajaxService.fetchContentBlocks(contentBlock.apiKey, contentBlock.apiHost);
  };
}
