///<reference path="../models/content_block.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="data_converter.ts"/>

class DataService {
  constructor(private ajaxService:AjaxService) {
  }

  loadContent(contentBlock:ContentBlock):JQueryPromise<ContentBlock> {
    return this.ajaxService.fetchContentBlock(contentBlock).then((raw) =>
      new DataConverter().convertJson(raw));
  }
}
