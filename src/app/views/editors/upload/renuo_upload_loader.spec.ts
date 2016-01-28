///<reference path="../../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>
///<reference path="renuo_upload_loader.ts"/>
///<reference path="renuo_upload.d.ts"/>

describe('RenuoUploadLoader', function () {
  it('loads the renuo upload', function () {
    expect(typeof RenuoUpload).toBe('undefined');

    const testFunction = jasmine.createSpy('test', () => {
      expect(typeof RenuoUpload).not.toBe('undefined');
      expect(RenuoUpload.version).toBe('yay-a-mock');
    }).and.callThrough();

    jasmine.Ajax.install();

    const loader = new RenuoUploadLoader();
    loader.loadEditor('/renuo-upload-mock').then(testFunction);

    const testResponse = {status: 200, responseText: 'var RenuoUpload={"version":"yay-a-mock"};'};
    jasmine.Ajax.requests.mostRecent().respondWith(testResponse);
    expect(testFunction).toHaveBeenCalled();

    jasmine.Ajax.uninstall();
  });
});
