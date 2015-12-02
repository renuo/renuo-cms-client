///<reference path="../../../../../typings/jquery/jquery.d.ts"/>

class CkeditorLoader {
  loadEditor(editorCdnUrl:string = '//cdn.ckeditor.com/4.5.5/full/ckeditor.js'):JQueryPromise<any> {
    return jQuery.getScript(editorCdnUrl);
  }
}
