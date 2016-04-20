///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
///<reference path="edit_controller.ts"/>
///<reference path="editable_view_controller.ts"/>

class ReadonlyViewController {
  constructor(private converter:DomContentBlockConverter, private dataService:DataService,
              private drawer:ContentBlockDrawer) {
  }

  loadContent(dom:DomContentBlock) {
    return this.dataService.loadReadonlyContent(dom.contentBlock).then((contentBlock) =>
      this.handleElement(this.converter.createNewBlock(dom, contentBlock))
    );
  };

  private handleElement(domContentBlock:DomContentBlock) {
    this.drawer.draw(domContentBlock);
  };
}
