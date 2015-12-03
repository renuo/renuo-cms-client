///<reference path="../editor_preparer.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>

class CkeditorPreparer implements EditorPreparer {
  constructor(private ckeditor:any = null) {
  }

  prepare(dom:DomContentBlock):void {
    if (this.ckeditor === null) this.ckeditor = CKEDITOR;

    jQuery(dom.element).attr('contenteditable', 'true');
    this.ckeditor.inline(dom.element);
  }
}
