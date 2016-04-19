///<reference path="../models/content_block.ts"/>

class LocalStorageService {
  private static STORAGE_KEY:string = 'renuo-cms-blocks';

  set(contentBlocks: Array<ContentBlock>) {
    localStorage.setItem(LocalStorageService.STORAGE_KEY, JSON.stringify(contentBlocks));
  }

  get(contentBlock: ContentBlock):ContentBlock {
    const rawContentBlocks:Array<Object> = JSON.parse(localStorage.getItem(LocalStorageService.STORAGE_KEY));

    const rawContentBlock:any = rawContentBlocks.filter( (cb:any) => {
      return cb.contentPath === contentBlock.contentPath;
    })[0];

    return new ContentBlock(
      rawContentBlock.content,
      rawContentBlock.contentPath,
      rawContentBlock.apiKey,
      rawContentBlock.apiHost,
      new Date(<string>rawContentBlock.createdAt),
      new Date(<string>rawContentBlock.updatedAt)
    );
  }
}
