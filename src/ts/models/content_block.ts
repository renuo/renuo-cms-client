///<reference path="../../../typings/tsd.d.ts"/>

class ContentBlock {
  id:number;
  content:string;
  content_path:string;

  constructor(id:number, content:string, content_path:string) {
    this.id = id;
    this.content = content;
    this.content_path = content_path;
  }
}
