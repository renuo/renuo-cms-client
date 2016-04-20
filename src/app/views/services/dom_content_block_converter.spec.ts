///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="content_block_finder.ts"/>
///<reference path="dom_content_block_converter.ts"/>
///<reference path="../models/dom_content_block.ts"/>

describe('DomContentBlockConverter', function () {
  const converter = new DomContentBlockConverter();

  it('converts a dom element to a dom content block', function () {
    const element:HTMLElement = jQuery('<div data-content-path="my-path" ' +
      'data-api-key="my-key"></div>')[0];
    const domContentBlock:DomContentBlock = converter.convert(element);
    const cb = domContentBlock.contentBlock;

    expect(domContentBlock.element).toBe(element);
    expect(cb.content).toBe('');
    expect(cb.contentPath).toBe('my-path');
    expect(cb.apiKey).toBe('my-key');
  });

  it('converts a dom element to a dom content block', function () {
    const str = '<div data-content-path="my-path" data-api-host="host" ' +
      'data-api-key="my-key" data-private-api-key="PK"></div>';
    const element:HTMLElement = jQuery(str)[0];
    const domContentBlock:DomContentBlock = converter.convert(element);
    const cb = domContentBlock.contentBlock;

    expect(domContentBlock.privateApiKey).toBe('PK');
    expect(domContentBlock.element).toBe(element);
    expect(cb.content).toBe('');
    expect(cb.contentPath).toBe('my-path');
    expect(cb.apiKey).toBe('my-key');
    expect(cb.apiHost).toBe('host');
  });

  it('sets the private api key to null if private api key is empty', function () {
    const str = '<div data-content-path="my-path" data-api-host="host" ' +
      'data-api-key="my-key" data-private-api-key=""></div>';
    const domContentBlock:DomContentBlock = converter.convert(jQuery(str)[0]);

    expect(domContentBlock.privateApiKey).toBe(null);
  });

  it('creates a new dom content block for a new content block', function () {
    const str = '<div data-content-path="my-path" data-api-host="host" ' +
      'data-api-key="my-key" data-private-api-key="test"></div>';
    const domContentBlock:DomContentBlock = converter.convert(jQuery(str)[0]);

    const newBlock:ContentBlock = domContentBlock.contentBlock;
    const existingBlock:ContentBlock = new ContentBlock('new content!', newBlock.contentPath, newBlock.apiKey,
      newBlock.apiHost, newBlock.createdAt, newBlock.updatedAt);

    const domExistingContentBlock:DomContentBlock = converter.createNewBlock(domContentBlock, existingBlock);
    expect(domExistingContentBlock.contentBlock).toBe(existingBlock);
    expect(domExistingContentBlock.element).toBe(domContentBlock.element);
    expect(domExistingContentBlock.privateApiKey).toBe(domContentBlock.privateApiKey);
  });

  it('creates a new editable dom content block for a new content block', function () {
    const str = '<div data-content-path="my-path" data-api-host="host" ' +
      'data-api-key="my-key" data-private-api-key="test"></div>';
    const domContentBlock:DomContentBlock = converter.convert(jQuery(str)[0]);

    const newBlock:ContentBlock = domContentBlock.contentBlock;
    const existingBlock:ContentBlock = new ContentBlock('new content!', newBlock.contentPath, newBlock.apiKey,
      newBlock.apiHost, newBlock.createdAt, newBlock.updatedAt);

    const renuoUploadCredentials = new RenuoUploadCredentials('some', 'thing');
    const editableCb = new EditableContentBlock(existingBlock, renuoUploadCredentials);
    const domExistingContentBlock:DomContentBlock = converter.createNewEditableBlock(domContentBlock, editableCb);
    expect(domExistingContentBlock.contentBlock).toBe(existingBlock);
    expect(domExistingContentBlock.element).toBe(domContentBlock.element);
    expect(domExistingContentBlock.privateApiKey).toBe(domContentBlock.privateApiKey);
    expect(domExistingContentBlock.renuoUploadCredentials).toBe(renuoUploadCredentials);
  });

  it('sets the default content', function () {
    const str1 = '<div data-content-path="p" data-api-host="h" data-api-key="k" data-private-api-key=""></div>';
    expect(converter.convert(jQuery(str1)[0]).contentBlock.defaultContent).toBe('');

    const str2 = '<div data-content-path="p" data-api-host="h" data-api-key="k" data-private-api-key="">test</div>';
    expect(converter.convert(jQuery(str2)[0]).contentBlock.defaultContent).toBe('test');
  });
});
