///<reference path="../../../../../typings/jquery/jquery.d.ts"/>
///<reference path="../editor_loader.ts"/>
///<reference path="../../helpers/script_loader.ts"/>

class UploadLoader {
  constructor(public scriptLoader:ScriptLoader) {
  }

  loadUpload():JQueryPromise<any> {
    return this.scriptLoader.loadCkeditor();
  }
}
