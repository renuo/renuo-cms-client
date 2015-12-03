///<reference path="../../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="ckeditor_preparer.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>

describe('CkeditorPreparer', function () {
  it('prepares a content for editing', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    const element = $('<div>')[0];
    const dom = new DomContentBlock(element, block, 'private-key');

    const spy = jasmine.createSpy('ckeditor');
    const fakeCkeditor = {inline: spy};
    const preparer = new CkeditorPreparer(fakeCkeditor);
    preparer.prepare(dom);
    expect(fakeCkeditor.inline).toHaveBeenCalledWith(dom.element);
  });
});
