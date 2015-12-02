class EditController {
  private editorLoadingCallback:JQueryPromise<any> = null;

  constructor(private loader:CkeditorLoader, private preparer:EditorPreparer) {
  }

  prepareEdit(dom:DomContentBlock):void {
    if (this.editorLoadingCallback === null) {
      this.editorLoadingCallback = this.loader.loadEditor();
    }
    this.editorLoadingCallback.done(() => this.preparer.prepare(dom));
  }
}
