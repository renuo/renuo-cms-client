///<reference path="../models/content_block.ts"/>

class ContentBlockService {
  loadContent(contentPath:string) {
    return new ContentBlock('', contentPath, '');
  }
}