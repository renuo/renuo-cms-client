class AjaxService {
  constructor() {
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
          content_path: contentBlock.contentPath,
          api_key: contentBlock.apiKey
        },
        private_api_key: privateApiKey
      })
    });
  }
}
