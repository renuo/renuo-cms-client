///<reference path="../../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="ckeditor_preparer.ts"/>

describe('CkeditorPreparer', function () {
  it('prepares a content for editing', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    const element = $('<div>')[0];
    const dom = new DomContentBlock(element, block, 'private-key');

    const preparer = new CkeditorPreparer();
    preparer.prepare(dom);
    // TODO: add real test
  });
});
