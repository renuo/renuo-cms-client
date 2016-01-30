///<reference path="../views/editors/editor_loader.ts"/>
///<reference path="../views/editors/editor_preparer.ts"/>
///<reference path="../data/services/data_service.ts"/>
///<reference path="../views/editors/upload/upload_loader.ts"/>

class EditController {
  private editorLoadingCallback:JQueryPromise<any> = null;
  private uploadLoadingCallback:JQueryPromise<any> = null;

  constructor(private dataService:DataService, private loader:EditorLoader, private uploadLoader:UploadLoader,
              private preparer:EditorPreparer) {
  }

  prepareEdit(dom:DomContentBlock):void {
    if (this.editorLoadingCallback === null) this.editorLoadingCallback = this.loader.loadEditor();
    if (this.uploadLoadingCallback === null) this.uploadLoadingCallback = this.uploadLoader.loadUpload();

    jQuery.when(this.editorLoadingCallback, this.uploadLoadingCallback).done(() =>
      this.preparer.prepare(dom, (dom:DomContentBlock, newContent:string) => this.editContent(dom, newContent)));
  }

  editContent(dom:DomContentBlock, newContent:string) {
    const cb = dom.contentBlock;
    const newContentBlock = new ContentBlock(newContent, cb.contentPath, cb.apiKey, cb.apiHost, cb.createdAt,
      cb.updatedAt, cb.defaultContent);
    return this.dataService.storeContent(newContentBlock, dom.privateApiKey)
      .then(() => this.preparer.notifySave(dom, true))
      .fail(() => this.preparer.notifySave(dom, false));
  }
}
