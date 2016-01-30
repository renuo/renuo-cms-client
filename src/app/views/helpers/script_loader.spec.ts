///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../../../typings/ckeditor/ckeditor.d.ts"/>
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
    expect(spy).toHaveBeenCalledWith('//cdn.rawgit.com/renuo/renuo-upload/1.0.0/dist/renuo_upload.min.js');
  });

  it('loads the custom dropzone', function () {
    const spy = spyOn(loader, 'loadScript');
    loader.loadCustomDropzone();
    expect(spy).toHaveBeenCalledWith('//cdn.rawgit.com/renuo/dropzone/v4.0.4/dist/min/dropzone.min.js');
  });

  it('loads the ckeditor', function () {
    const spy = spyOn(loader, 'loadScript');
    loader.loadCkeditor();
    expect(spy).toHaveBeenCalledWith('//cdn.ckeditor.com/4.5.5/full/ckeditor.js');
  });
});
