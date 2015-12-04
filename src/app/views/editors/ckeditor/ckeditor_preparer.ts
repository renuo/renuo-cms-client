///<reference path="../editor_preparer.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>

class CkeditorPreparer implements EditorPreparer {
  constructor(private ckeditor:any = null) {
  }

  prepare(dom:DomContentBlock, editCallback:EditContentBlockCallback):void {
    if (this.ckeditor === null) this.ckeditor = CKEDITOR;

    jQuery(dom.element).attr('contenteditable', 'true');
    // TODO: ACF: http://sdk.ckeditor.com/samples/acf.html
    this.ckeditor.inline(dom.element).on('blur', function (event:CKEDITOR.eventInfo) {
      if (event.editor.checkDirty()) {
        const newContent = event.editor.getData();
        event.editor.resetDirty();
        editCallback(dom, newContent);
      }
    });
  }

  notifySave(dom:DomContentBlock, success:boolean):void {
    // TODO: implement this
  }
}
