///<reference path="../views/editors/editor_loader.ts"/>
///<reference path="../views/editors/editor_preparer.ts"/>

class EditController {
  private editorLoadingCallback:JQueryPromise<any> = null;

  constructor(private loader:EditorLoader, private preparer:EditorPreparer) {
  }

  prepareEdit(dom:DomContentBlock):void {
    if (this.editorLoadingCallback === null) {
      this.editorLoadingCallback = this.loader.loadEditor();
    }
    this.editorLoadingCallback.done(() => this.preparer.prepare(dom));
  }
}
