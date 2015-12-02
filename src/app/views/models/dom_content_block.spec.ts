///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../data/models/content_block.ts"/>
///<reference path="dom_content_block.ts"/>

describe('DomContentBlock', function () {
  it('constructs a dom content block', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    const element = $('<div>')[0];
    const dom = new DomContentBlock(element, block, 'private-key');
    expect(dom.element).toBe(element);
    expect(dom.contentBlock).toBe(block);
    expect(dom.privateApiKey).toBe('private-key');
    expect(dom.isEditable()).toBe(true);
  });

  it('tells when it is not editable', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    const element = $('<div>')[0];
    const dom = new DomContentBlock(element, block, null);
    expect(dom.isEditable()).toBe(false);
  });
});
