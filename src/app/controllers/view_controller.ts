///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
///<reference path="edit_controller.ts"/>

class ViewController {
  constructor(private finder:ContentBlockFinder, private converter:DomContentBlockConverter,
              private dataService:DataService, private drawer:ContentBlockDrawer,
              private editController:EditController) {
  }

  init():void {
    const domContentBlocks = this.finder.find().map((el) => this.converter.convert(el));

    domContentBlocks.forEach((dom:DomContentBlock) => {
      if (dom.isEditable()) {
        return this.dataService.loadEditableContent(dom.contentBlock, dom.privateApiKey).then((editableContentBlock) =>
          this.handleEditableElement(this.converter.createNewBlock(dom, editableContentBlock.contentBlock))
        );
      } else {
        return this.dataService.loadReadonlyContent(dom.contentBlock).then((contentBlock) =>
          this.handleReadonlyElement(this.converter.createNewBlock(dom, contentBlock))
        );
      }
    });
  }

  private handleReadonlyElement(domContentBlock:DomContentBlock) {
    this.drawer.draw(domContentBlock);
  };

  private handleEditableElement(domContentBlock:DomContentBlock) {
    this.drawer.draw(domContentBlock);
    this.editController.prepareEdit(domContentBlock);
  };
}
