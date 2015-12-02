///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
class ViewController {
  constructor(private finder:ContentBlockFinder, private converter:DomContentBlockConverter,
              private dataService:DataService, private drawer:ContentBlockDrawer) {
  }

  init():void {
    const elements = this.finder.find();
    const contentBlocks = elements.map((el) => this.converter.convert(el));
    contentBlocks.map((el) => {
      this.dataService.loadContent(el.contentBlock).then((contentBlock) => {
        this.drawer.draw(new DomContentBlock(el.element, contentBlock, el.privateApiKey));
      });
    });
  }
}
