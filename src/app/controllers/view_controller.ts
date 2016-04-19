///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
///<reference path="edit_controller.ts"/>
///<reference path="editable_view_controller.ts"/>
///<reference path="readonly_view_controller.ts"/>

class ViewController {
  constructor(private finder:ContentBlockFinder, private converter:DomContentBlockConverter,
              private dataService:DataService, private drawer:ContentBlockDrawer,
              private editController:EditController) {
  }

  init():void {
    const domContentBlocks = this.finder.find().map((el) => this.converter.convert(el));
    const edit = new EditableViewController(this.converter, this.dataService, this.drawer, this.editController);
    const readOnly = new ReadonlyViewController(this.converter, this.dataService, this.drawer);

    domContentBlocks.forEach((dom:DomContentBlock) => {
      if (dom.isEditable()) return edit.loadContent(dom);
      readOnly.loadContent(dom, false);
    });
  }
}
