///<reference path="../../../../typings/tsd.d.ts"/>

class ContentBlock {
  constructor(public content:string, public contentPath:string, public apiKey:string, public apiHost:string,
              public createdAt:Date = null, public updatedAt:Date = null, public defaultContent:string = null) {
    if (defaultContent === null) this.defaultContent = content;
  }

  isNew():boolean {
    return !this.createdAt;
  }
}
