///<reference path="../../../../../typings/jquery/jquery.d.ts"/>
///<reference path="../editor_loader.ts"/>
///<reference path="../../helpers/script_loader.ts"/>

class CkeditorLoader implements EditorLoader {
  constructor(public scriptLoader:ScriptLoader) {
  }

  loadEditor():JQueryPromise<any> {
    return this.scriptLoader.loadCkeditor();
  }
}
