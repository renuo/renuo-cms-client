class EditController {
  constructor(private preparer:EditorPreparer) {
  }

  prepareEdit(dom:DomContentBlock):void {
    this.preparer.prepare(dom);
  }
}
