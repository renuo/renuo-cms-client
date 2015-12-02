///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../data/models/content_block.ts"/>
///<reference path="dom_content_block.ts"/>

describe('DomContentBlock', function () {
  it('constructs a dom content block', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    const element = $('<div>')[0];
    const dom = new DomContentBlock(element, block);
    expect(dom.element).toBe(element);
    expect(dom.contentBlock).toBe(block);
  });
});
