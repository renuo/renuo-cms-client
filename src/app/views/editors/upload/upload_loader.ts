///<reference path="../../../../../typings/browser/ambient/jquery/index.d.ts"/>
///<reference path="../editor_loader.ts"/>
///<reference path="../../helpers/script_loader.ts"/>
///<reference path="../../helpers/css_injector.ts"/>

class UploadLoader {
  constructor(public scriptLoader:ScriptLoader, public cssInjector:CSSInjector) {
  }

  loadUpload():JQueryPromise<any> {
    this.cssInjector.loadDropzoneCSS();
    return jQuery.when(this.scriptLoader.loadRenuoUpload(), this.scriptLoader.loadDropzone());
  }
}
