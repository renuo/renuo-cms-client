///<reference path="../models/ajax_content_blocks.ts"/>

class AjaxService {
  private static MAX_CACHE_TTL:number = 60 * 2; // 2 minutes

  fetchContentBlocks(apiKey:string, apiHost:string, enableCaching:boolean):JQueryPromise<AjaxContentBlocks> {
    return jQuery.getJSON(`${apiHost}/v1/${apiKey}/content_blocks?_=${this.cacheTime(enableCaching)}`);
  }

  storeContentBlock(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<any> {
    return jQuery.ajax({
      url: `${contentBlock.apiHost}/v1/${contentBlock.apiKey}/content_blocks`,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        content_block: {
          content: contentBlock.content,
          content_path: contentBlock.contentPath
        },
        private_api_key: privateApiKey
      }),
      headers: {'X-HTTP-Method-Override': 'PUT'}
    });
  }

  cacheTime(enableCaching:boolean):number {
    if (!enableCaching) return this.currentTime();
    return Math.floor(this.currentTime() / AjaxService.MAX_CACHE_TTL) * AjaxService.MAX_CACHE_TTL;
  }

  protected currentTime():number {
    return Date.now() / 1000;
  }
}
