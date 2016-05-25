///<reference path="../../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../../../../typings/browser/ambient/ckeditor/index.d.ts"/>
///<reference path="upload_loader.ts"/>
///<reference path="../../helpers/script_loader.ts"/>
///<reference path="../../helpers/css_injector.ts"/>

describe('UploadLoader', function () {
  const scriptLoader = new ScriptLoader();
  const cssInjector = new CSSInjector();

  it('loads the upload scripts', function () {

    const deferredUpload = jQuery.Deferred();
    const deferredDropzone = jQuery.Deferred();

    const uploadSpy = spyOn(scriptLoader, 'loadRenuoUpload').and.returnValue(deferredUpload.promise());
    const dropzoneSpy = spyOn(scriptLoader, 'loadDropzone').and.returnValue(deferredDropzone.promise());

    const loader = new UploadLoader(scriptLoader, cssInjector);
    loader.loadUpload();

    expect(uploadSpy).toHaveBeenCalled();
    expect(dropzoneSpy).toHaveBeenCalled();
  });

  it('resolves correctly (dropzone first)', function () {
    const deferredUpload = jQuery.Deferred();
    const deferredDropzone = jQuery.Deferred();

    spyOn(scriptLoader, 'loadRenuoUpload').and.returnValue(deferredUpload.promise());
    spyOn(scriptLoader, 'loadDropzone').and.returnValue(deferredDropzone.promise());

    const loader = new UploadLoader(scriptLoader, cssInjector);
    const deferred = loader.loadUpload();

    expect(deferred.state()).toEqual('pending');
    deferredUpload.resolve();
    expect(deferred.state()).toEqual('pending');
    deferredDropzone.resolve();
    expect(deferred.state()).toEqual('resolved');
  });

  it('resolves correctly (upload first)', function () {
    const deferredUpload = jQuery.Deferred();
    const deferredDropzone = jQuery.Deferred();

    spyOn(scriptLoader, 'loadRenuoUpload').and.returnValue(deferredUpload.promise());
    spyOn(scriptLoader, 'loadDropzone').and.returnValue(deferredDropzone.promise());

    const loader = new UploadLoader(scriptLoader, cssInjector);
    const deferred = loader.loadUpload();

    expect(deferred.state()).toEqual('pending');
    deferredDropzone.resolve();
    expect(deferred.state()).toEqual('pending');
    deferredUpload.resolve();
    expect(deferred.state()).toEqual('resolved');
  });
});
