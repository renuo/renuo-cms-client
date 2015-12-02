///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
class ViewController {
  constructor(private finder:ContentBlockFinder, private converter:DomContentBlockConverter,
              private dataService:DataService, private drawer:ContentBlockDrawer) {
  }

  init():void {
    const elements = this.finder.find();
    const domContentBlocks = elements.map((el) => this.converter.convert(el));
    domContentBlocks.map((dom) => {
      this.dataService.loadContent(dom.contentBlock).then((contentBlock) => {
        this.drawer.draw(this.converter.createNewBlock(dom, contentBlock));
      });
    });
  }
}
