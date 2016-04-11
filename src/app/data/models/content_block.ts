class ContentBlock {
  constructor(public content:string, public contentPath:string, public apiKey:string, public apiHost:string,
              public createdAt:Date = null, public updatedAt:Date = null, public defaultContent:string = null) {
  }

  isNew():boolean {
    return !this.createdAt;
  }

  shouldUseParagraphs():boolean {
    if(this.defaultContent.indexOf('<p>') >= 0) return true;
    return this.defaultContent === '';
  }
}
