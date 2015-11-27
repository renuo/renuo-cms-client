///<reference path="../../../typings/tsd.d.ts"/>

class ContentBlock {
  id:number;
  content:string;
  contentPath:string;

  constructor(id:number, content:string, contentPath:string) {
    this.id = id;
    this.content = content;
    this.contentPath = contentPath;
  }
}
