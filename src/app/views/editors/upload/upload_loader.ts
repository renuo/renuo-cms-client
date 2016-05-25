///<reference path="../../../../../typings/browser/ambient/jquery/index.d.ts"/>
///<reference path="../editor_loader.ts"/>
///<reference path="../../helpers/script_loader.ts"/>
///<reference path="../../helpers/css_injector.ts"/>

class UploadLoader {
  static DROPZONE_VERSION:string = '4.3.0';

  constructor(public scriptLoader:ScriptLoader, private cssInjector:CSSInjector) {
  }

  loadUpload():JQueryPromise<any> {
    this.cssInjector.loadDropzoneCSS(UploadLoader.DROPZONE_VERSION);
    return jQuery.when(this.scriptLoader.loadRenuoUpload(),
      this.scriptLoader.loadDropzone(UploadLoader.DROPZONE_VERSION));
  }
}
