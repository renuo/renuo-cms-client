///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../../../typings/browser/ambient/ckeditor/index.d.ts"/>
///<reference path="script_loader.ts"/>
///<reference path="../editors/upload/renuo_upload.d.ts"/>

describe('ScriptLoader', function () {
  const loader = new ScriptLoader();

  it('loads the script', function () {
    expect(typeof RenuoUpload).toBe('undefined');

    const testFunction = jasmine.createSpy('test', () => {
      expect(typeof RenuoUpload).not.toBe('undefined');
      expect(RenuoUpload.version).toBe('yay-a-mock');
    }).and.callThrough();

    jasmine.Ajax.install();

    loader.loadScript('/renuo-upload-mock').then(testFunction);

    const testResponse = {status: 200, responseText: 'var RenuoUpload={"version":"yay-a-mock"};'};
    jasmine.Ajax.requests.mostRecent().respondWith(testResponse);
    expect(testFunction).toHaveBeenCalled();

    jasmine.Ajax.uninstall();
  });

  it('loads the renuo upload', function () {
    const spy = spyOn(loader, 'loadScript');
    loader.loadRenuoUpload();
    expect(spy).toHaveBeenCalledWith('//cdn.rawgit.com/renuo/renuo-upload/1.1.0/dist/renuo_upload.min.js');
  });

  it('loads the custom dropzone', function () {
    const spy = spyOn(loader, 'loadScript');
    loader.loadDropzone('4.3.0');
    expect(spy).toHaveBeenCalledWith('//cdn.jsdelivr.net/dropzone/4.3.0/dropzone.min.js');
  });

  it('loads the ckeditor', function () {
    const spy = spyOn(loader, 'loadScript');
    loader.loadCkeditor();
    expect(spy).toHaveBeenCalledWith('//cdn.ckeditor.com/4.5.5/full/ckeditor.js');
  });
});
