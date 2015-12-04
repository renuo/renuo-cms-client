///<reference path="../editor_preparer.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>

class CkeditorPreparer implements EditorPreparer {
  constructor(private ckeditor:any = null) {
    jQuery('<style type="text/css">' +
      '@keyframes renuo-cms-flash-success {0% { background: default; } 50% { background: #d7eed7; } 100% { background: default; }}' +
      '@keyframes renuo-cms-flash-error {0% { background: default; } 50% { background: #f5d1d0; } 100% { background: default; }}' +
      '.renuo-cms-edit-success{animation-name: renuo-cms-flash-success; animation-duration: 1.5s;}' +
      '.renuo-cms-edit-error{animation-name: renuo-cms-flash-error; animation-duration: 1.5s;}' +
      '</style>').appendTo('head');
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
    const cssClass = success ? 'success' : 'error';
    jQuery(dom.element).addClass(`renuo-cms-edit-${cssClass}`).delay(2000).queue(()=>
      jQuery(dom.element).removeClass(`renuo-cms-edit-${cssClass}`).dequeue());
  }
}
