class AjaxService {
  constructor(private apiKey:string) {
  }

  fetch(contentPath:string) {
    return jQuery.getJSON(`/v1/${this.apiKey}/content_blocks/${contentPath}`);
  }
}
