///<reference path="../editor_preparer.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>

class CkeditorPreparer implements EditorPreparer {
  constructor(private ckeditor:any = null) {
  }

  prepare(dom:DomContentBlock):void {
    if (this.ckeditor === null) this.ckeditor = CKEDITOR;

    jQuery(dom.element).attr('contenteditable', 'true');
    // TODO: ACF: http://sdk.ckeditor.com/samples/acf.html
    this.ckeditor.inline(dom.element).on('blur', function (event:CKEDITOR.eventInfo) {
      if (event.editor.checkDirty()) {
        const newContent = event.editor.getData();
        // TODO: save the data
        // content changed to: newContent
        event.editor.resetDirty();
      }
    });
  }
}
