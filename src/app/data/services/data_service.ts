///<reference path="../models/content_block.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="data_converter.ts"/>

class DataService {
  constructor(private ajaxService:AjaxService) {
  }

  loadContent(contentBlock:ContentBlock):JQueryPromise<ContentBlock> {
    const dataConverter = new DataConverter();
    return this.ajaxService.fetchContentBlocks(contentBlock.apiKey, contentBlock.apiHost).then((raw) =>
      dataConverter.convertJsonFromArray(contentBlock, raw));
  }

  storeContent(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<any> {
    return this.ajaxService.storeContentBlock(contentBlock, privateApiKey);
  }
}
