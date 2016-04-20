///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
///<reference path="edit_controller.ts"/>

class EditableViewController {
  constructor(private converter:DomContentBlockConverter, private dataService:DataService,
              private drawer:ContentBlockDrawer, private editController:EditController) {
  }

  loadContent(dom:DomContentBlock) {
    return this.dataService.loadEditableContent(dom.contentBlock, dom.privateApiKey).then((editableContentBlock) =>
      this.handleElement(this.converter.createNewEditableBlock(dom, editableContentBlock))
    );
  };

  private handleElement(domContentBlock:DomContentBlock) {
    this.drawer.draw(domContentBlock);
    this.editController.prepareEdit(domContentBlock);
  };
}
