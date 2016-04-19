///<reference path="../../../../typings/browser.d.ts"/>
///<reference path="../editors/editor_loader.ts"/>

class ScriptLoader {
  loadScript(url:string):JQueryPromise<any> {
    return jQuery.getScript(url);
  }

  loadRenuoUpload():JQueryPromise<any> {
    return this.loadScript('//cdn.rawgit.com/renuo/renuo-upload/1.1.0/dist/renuo_upload.min.js');
  }

  loadCkeditor():JQueryPromise<any> {
    return this.loadScript('//cdn.ckeditor.com/4.5.5/full/ckeditor.js');
  }

  loadCustomDropzone():JQueryPromise<any> {
    return this.loadScript('//cdn.rawgit.com/renuo/dropzone/v4.0.4/dist/min/dropzone.min.js');
  }
}
