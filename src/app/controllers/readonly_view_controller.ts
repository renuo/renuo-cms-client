///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
///<reference path="edit_controller.ts"/>
///<reference path="editable_view_controller.ts"/>

class ReadonlyViewController {
  constructor(private converter:DomContentBlockConverter, private dataService:DataService,
              private drawer:ContentBlockDrawer) {
  }

  loadContent(dom:DomContentBlock, enableCaching:boolean = true) {
    if(enableCaching) this.loadCachedContent(dom);

    return this.dataService.loadReadonlyContent(dom.contentBlock).then((contentBlock) =>
      this.handleElement(this.converter.createNewBlock(dom, contentBlock))
    );
  };

  private loadCachedContent(dom:DomContentBlock) {
    const cachedContentBlock = this.dataService.loadReadonlyContentFromCache(dom.contentBlock);
    this.handleElement(this.converter.createNewBlock(dom, cachedContentBlock));
  }

  private handleElement(domContentBlock:DomContentBlock) {
    this.drawer.draw(domContentBlock);
  };
}
