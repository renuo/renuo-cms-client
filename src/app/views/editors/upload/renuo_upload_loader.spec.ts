///<reference path="../../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>
///<reference path="renuo_upload_loader.ts"/>

describe('RenuoUploadLoader', function () {
  it('loads the renuo upload', function () {
    //noinspection TypeScriptUnresolvedVariable
    expect(typeof RenuoUpload).toBe('undefined');

    const testFunction = jasmine.createSpy('test', () => {
      //noinspection TypeScriptUnresolvedVariable
      expect(typeof RenuoUpload).not.toBe('undefined');
      //noinspection TypeScriptUnresolvedVariable
      expect(RenuoUpload.version).toBe('yay-a-mock');
    }).and.callThrough();

    // TODO: fix this
    //jasmine.Ajax.install();

    const loader = new RenuoUploadLoader();
    loader.loadEditor('/renuo-upload-mock').then(testFunction);

    const testResponse = {status: 200, responseText: 'var RenuoUpload={"version":"yay-a-mock"};'};
    jasmine.Ajax.requests.mostRecent().respondWith(testResponse);
    expect(testFunction).toHaveBeenCalled();
  });
});
