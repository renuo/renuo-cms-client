///<reference path="../../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>
///<reference path="ckeditor_loader.ts"/>

describe('CkeditorLoader', function () {
  it('loads the ckeditor', function () {
    expect(typeof CKEDITOR).toBe('undefined');

    const testFunction = jasmine.createSpy('test', () => {
      expect(typeof CKEDITOR).not.toBe('undefined');
      expect(CKEDITOR.version).toBe('yay-a-mock');
    }).and.callThrough();

    jasmine.Ajax.install();

    const loader = new CkeditorLoader();
    loader.loadEditor('/ckeditor-mock').then(testFunction);

    const testResponse = {status: 200, responseText: 'var CKEDITOR={"version":"yay-a-mock"};'};
    jasmine.Ajax.requests.mostRecent().respondWith(testResponse);
    expect(testFunction).toHaveBeenCalled();

    jasmine.Ajax.uninstall();
  });
});
