///<reference path="../../../../../typings/jquery/jquery.d.ts"/>
///<reference path="../editor_loader.ts"/>

class RenuoUploadLoader implements EditorLoader {
  loadEditor(editorCdnUrl:string = '//cdn.rawgit.com/renuo/renuo-upload/1.0.0/dist/renuo_upload.min.js'):JQueryPromise<any> {
    return jQuery.getScript(editorCdnUrl);
  }
}
