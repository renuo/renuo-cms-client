class EditController {
  private loadedEditor = false;

  constructor(private loader:CkeditorLoader, private preparer:EditorPreparer) {
  }

  prepareEdit(dom:DomContentBlock):void {
    if (!this.loadedEditor) {
      this.loadedEditor = true;
      this.loader.loadEditor();
    }
    this.preparer.prepare(dom);
  }
}
