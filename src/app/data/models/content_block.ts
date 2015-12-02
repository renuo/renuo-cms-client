///<reference path="../../../../typings/tsd.d.ts"/>

class ContentBlock {
  constructor(public content:string, public contentPath:string, public apiKey:string,
              public createdAt:Date = null, public updatedAt:Date = null) {
  }
}
