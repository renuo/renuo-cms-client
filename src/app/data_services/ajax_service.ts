class AjaxService {
  fetchContentBlock(apiKey:string, contentPath:string) {
    return jQuery.getJSON(`/v1/${apiKey}/content_blocks/${contentPath}`);
  }

  storeContentBlock(contentBlock:ContentBlock) {
    return jQuery.ajax({
      url: `/v1/${contentBlock.apiKey}/content_blocks`,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        content_block: {
          content: contentBlock.content,
          content_path: contentBlock.contentPath,
          api_key: contentBlock.apiKey
        }
      })
    });
  }
}
