///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="ajax_service.ts"/>

describe("AjaxService", function () {
  it("can init the ajax service", function () {
    expect(new AjaxService()).not.toBe(null);
  });
});
