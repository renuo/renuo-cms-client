///<reference path="../views/editors/editor_loader.ts"/>
///<reference path="../views/editors/editor_preparer.ts"/>
///<reference path="../data/services/data_service.ts"/>

class EditController {
  private editorLoadingCallback:JQueryPromise<any> = null;

  constructor(private dataService:DataService, private loader:EditorLoader, private preparer:EditorPreparer) {
  }

  prepareEdit(dom:DomContentBlock):void {
    if (this.editorLoadingCallback === null) this.editorLoadingCallback = this.loader.loadEditor();

    this.editorLoadingCallback.done(() =>
      this.preparer.prepare(dom, (dom:DomContentBlock, newContent:string) => this.editContent(dom, newContent)));
  }

  editContent(dom:DomContentBlock, newContent:string) {
    const cb = dom.contentBlock;
    const newContentBlock = new ContentBlock(newContent, cb.contentPath, cb.apiKey, cb.apiHost);
    return this.dataService.storeContent(newContentBlock, dom.privateApiKey)
      .then(() => this.preparer.notifySave(dom, true))
      .fail(() => this.preparer.notifySave(dom, false));
  }
}