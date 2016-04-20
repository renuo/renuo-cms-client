///<reference path="../../../../../typings/browser/ambient/jquery/index.d.ts"/>
///<reference path="../editor_loader.ts"/>
///<reference path="../../helpers/script_loader.ts"/>

class UploadLoader {
  constructor(public scriptLoader:ScriptLoader) {
  }

  loadUpload():JQueryPromise<any> {
    return jQuery.when(this.scriptLoader.loadRenuoUpload(), this.scriptLoader.loadCustomDropzone());
  }
}
