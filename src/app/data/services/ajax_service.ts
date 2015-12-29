class AjaxService {
  private static MAX_CACHE_TTL:number = 60 * 2; // 2 minutes

  fetchContentBlocks(apiKey:string, apiHost:string):JQueryPromise<any> {
    return jQuery.getJSON(`${apiHost}/v1/${apiKey}/content_blocks?_=${this.cacheTime()}`);
  }

  fetchContentBlock(contentBlock:ContentBlock):JQueryPromise<any> {
    return jQuery.getJSON(`${contentBlock.apiHost}/v1/${contentBlock.apiKey}/content_blocks/${contentBlock.contentPath}`);
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
      })
    });
  }

  cacheTime():number {
    return Math.floor(this.currentTime() / AjaxService.MAX_CACHE_TTL) * AjaxService.MAX_CACHE_TTL;
  }

  protected currentTime():number {
    return Date.now();
  }
}
