///<reference path="../../../../../typings/jquery/jquery.d.ts"/>

class CkeditorLoader {
  loadEditor(editorCdnUrl:string = '//cdn.ckeditor.com/4.5.5/standard/ckeditor.js'):JQueryXHR {
    return jQuery.getScript(editorCdnUrl);
  }
}
