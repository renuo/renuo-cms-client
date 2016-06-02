///<reference path="../../../../typings/globals/jquery/index.d.ts"/>
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

  loadDropzone(dropzoneVersion:string):JQueryPromise<any> {
    return this.loadScript(`//cdn.jsdelivr.net/dropzone/${dropzoneVersion}/dropzone.min.js`);
  }
}
