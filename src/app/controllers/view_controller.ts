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

  init(htmlContentBlocks:HTMLElement[] = null):void {
    if (htmlContentBlocks == null) htmlContentBlocks = this.finder.find();
    const domContentBlocks = htmlContentBlocks.map((el) => this.converter.convert(el));
    const editView = new EditableViewController(this.converter, this.dataService, this.drawer, this.editController);
    const readonlyView = new ReadonlyViewController(this.converter, this.dataService, this.drawer);

    domContentBlocks.forEach((dom:DomContentBlock) => {
      if (dom.isEditable()) return editView.loadContent(dom);
      readonlyView.loadContent(dom);
    });
  }
}
