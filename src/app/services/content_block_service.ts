///<reference path="../models/content_block.ts"/>
///<reference path="../data_services/ajax_service.ts"/>

class ContentBlockService {
  constructor(private ajaxService:AjaxService) {
  }

  loadContent(apiKey:string, contentPath:string):JQueryPromise<ContentBlock> {
    return this.ajaxService.fetchContentBlock(new ContentBlock('', contentPath, apiKey)).then(function (raw) {
      const b = raw.content_block;
      return new ContentBlock(b.content, b.content_path, b.api_key, b.created_at, b.updated_at);
    });
  }
}
