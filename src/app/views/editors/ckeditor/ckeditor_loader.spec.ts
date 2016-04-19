///<reference path="../../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../../../../typings/browser/ambient/jasmine-ajax/index.d.ts"/>
///<reference path="../../../../../typings/browser/ambient/ckeditor/index.d.ts"/>
///<reference path="ckeditor_loader.ts"/>
///<reference path="../../helpers/script_loader.ts"/>

describe('CkeditorLoader', function () {
  it('loads the ckeditor', function () {
    const scriptLoader = new ScriptLoader();
    const spy = spyOn(scriptLoader, 'loadCkeditor');

    const loader = new CkeditorLoader(scriptLoader);
    loader.loadEditor();
    expect(spy).toHaveBeenCalled();
  });
});
