///<reference path="../../../typings/jquery/jquery.d.ts"/>

class ScriptLoaderMock extends ScriptLoader {
  loadScript(url:string):JQueryPromise<any> {
    return jQuery.getScript('/mocked');
  }
}
