///<reference path="../editor_preparer.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>

class CkeditorPreparer implements EditorPreparer {
  constructor(private ckeditor?:any) {
    if (this.ckeditor === null) this.ckeditor = CKEDITOR;
  }

  prepare(dom:DomContentBlock):void {
    this.ckeditor.inline(dom);
  }
}
