///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../views/drawers/content_block_drawer.ts"/>
///<reference path="edit_controller.ts"/>

class ViewController {
  private editController:EditController;

  constructor(private finder:ContentBlockFinder, private converter:DomContentBlockConverter,
              private dataService:DataService, private drawer:ContentBlockDrawer,
              private editorLoader:EditorLoader, private editorPreparer:EditorPreparer) {
    this.editController = new EditController(this.editorLoader, this.editorPreparer);
  }

  init():void {
    const domContentBlocks = this.finder.find().map((el) => this.converter.convert(el));

    domContentBlocks.forEach((dom) =>
      this.dataService.loadContent(dom.contentBlock).then((contentBlock) =>
        this.handleElement(this.converter.createNewBlock(dom, contentBlock))
      ));
  }

  private handleElement(domContentBlock:DomContentBlock):void {
    this.drawer.draw(domContentBlock);
  }
}
