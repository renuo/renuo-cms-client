///<reference path="../../../../../typings/jquery/jquery.d.ts"/>
///<reference path="../editor_loader.ts"/>

class CkeditorLoader implements EditorLoader {
  loadEditor(editorCdnUrl:string = '//cdn.ckeditor.com/4.5.5/full/ckeditor.js'):JQueryPromise<any> {
    return jQuery.getScript(editorCdnUrl);
  }
}
