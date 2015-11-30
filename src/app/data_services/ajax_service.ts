class AjaxService {
  constructor(private apiKey:string) {
  }

  fetchContentBlock(contentPath:string) {
    return jQuery.getJSON(`/v1/${this.apiKey}/content_blocks/${contentPath}`);
  }
}
