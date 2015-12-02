///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block_finder.ts"/>
///<reference path="dom_content_block_converter.ts"/>
///<reference path="../models/dom_content_block.ts"/>

describe('DomContentBlockConverter', function () {
  const converter = new DomContentBlockConverter();

  it('converts a dom element to a dom content block', function () {
    const element:HTMLElement = jQuery('<div data-content-path="my-path" data-api-key="my-key"></div>')[0];
    const domContentBlock:DomContentBlock = converter.convert(element);
    const cb = domContentBlock.contentBlock;

    expect(domContentBlock.element).toBe(element);
    expect(cb.content).toBe(null);
    expect(cb.contentPath).toBe('my-path');
    expect(cb.apiKey).toBe('my-key');
  });

  it('converts a dom element to a dom content block', function () {
    const str = '<div data-content-path="my-path" data-api-key="my-key" data-private-api-key="PK"></div>';
    const element:HTMLElement = jQuery(str)[0];
    const domContentBlock:DomContentBlock = converter.convert(element);
    const cb = domContentBlock.contentBlock;

    expect(domContentBlock.privateApiKey).toBe('PK');
    expect(domContentBlock.element).toBe(element);
    expect(cb.content).toBe(null);
    expect(cb.contentPath).toBe('my-path');
    expect(cb.apiKey).toBe('my-key');
  });

  it('sets the private api key to null if private api key is empty', function () {
    const str = '<div data-content-path="my-path" data-api-key="my-key" data-private-api-key=""></div>';
    const domContentBlock:DomContentBlock = converter.convert(jQuery(str)[0]);

    expect(domContentBlock.privateApiKey).toBe(null);
  });
});
