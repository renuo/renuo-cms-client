///<reference path="../views/editors/editor_loader.ts"/>
///<reference path="../views/editors/editor_preparer.ts"/>
///<reference path="../data/services/data_service.ts"/>

class EditController {
  private editorLoadingCallback:JQueryPromise<any> = null;

  constructor(private dataService:DataService, private loader:EditorLoader, private preparer:EditorPreparer) {
  }

  prepareEdit(dom:DomContentBlock):void {
    if (this.editorLoadingCallback === null) {
      this.editorLoadingCallback = this.loader.loadEditor();
    }
    this.editorLoadingCallback.done(() => this.preparer.prepare(dom, this.editContent));
  }

  editContent(dom:DomContentBlock, newContent:string) {
    const cb = dom.contentBlock;
    const newContentBlock = new ContentBlock(newContent, cb.contentPath, cb.apiKey, cb.apiHost);
    this.dataService.storeContent(newContentBlock, dom.privateApiKey);
  }
}
