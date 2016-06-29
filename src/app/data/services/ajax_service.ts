///<reference path="../models/ajax_content_blocks.ts"/>

class AjaxService {
  private static MAX_CACHE_TTL:number = 60 * 2; // 2 minutes

  fetchContentBlocks(apiKey:string, apiHost:string, enableHttpCaching:boolean):JQueryPromise<AjaxContentBlocks> {
    return jQuery.getJSON(`${apiHost}/v1/${apiKey}/content_blocks?_=${this.cacheTime(enableHttpCaching)}`);
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
          content_path: contentBlock.contentPath,
          version: contentBlock.version
        },
        private_api_key: privateApiKey
      }),
      headers: {'X-HTTP-Method-Override': 'PUT'}
    });
  }

  cacheTime(enableHttpCaching:boolean):number {
    if (!enableHttpCaching) return Math.round(this.currentTime());

    return Math.floor(this.currentTime() / AjaxService.MAX_CACHE_TTL) * AjaxService.MAX_CACHE_TTL;
  }

  protected currentTime():number {
    return Date.now() / 1000;
  }

  public getRenuoUploadCredentials(contentBlock:ContentBlock, privateApiKey:String):JQueryPromise<any> {
    return jQuery.getJSON(`${contentBlock.apiHost}/v1/${contentBlock.apiKey}/` +
      `renuo_upload_credentials?private_api_key=${privateApiKey}`);
  }
}
