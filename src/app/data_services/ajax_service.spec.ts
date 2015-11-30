///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="ajax_service.ts"/>

describe('AjaxService', function () {
  it('Fetches a content block', function () {
    let service = new AjaxService();
    expect(service).not.toBe(null);
  });
});
