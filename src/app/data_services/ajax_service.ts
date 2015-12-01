class AjaxService {
  constructor(private host:string) {
  }

  fetchContentBlock(apiKey:string, contentPath:string):JQueryPromise<any> {
    return jQuery.getJSON(`${this.host}/v1/${apiKey}/content_blocks/${contentPath}`);
  }

  storeContentBlock(contentBlock:ContentBlock, privateApiKey:string):JQueryPromise<any> {
    return jQuery.ajax({
      url: `${this.host}/v1/${contentBlock.apiKey}/content_blocks`,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        content_block: {
          content: contentBlock.content,
          content_path: contentBlock.contentPath,
          api_key: contentBlock.apiKey
        },
        private_api_key: privateApiKey
      })
    });
  }
}
