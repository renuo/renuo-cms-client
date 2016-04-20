///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../data/models/content_block.ts"/>
///<reference path="dom_content_block.ts"/>

describe('DomContentBlock', function () {
  it('constructs a dom content block', function () {
    const block = new ContentBlock('content', 'path', 'api-key', 'host');
    const element = jQuery('<div>')[0];
    const credentials = new RenuoUploadCredentials('a', 'b');
    const dom = new DomContentBlock(element, block, 'private-key', credentials);
    expect(dom.element).toBe(element);
    expect(dom.contentBlock).toBe(block);
    expect(dom.privateApiKey).toBe('private-key');
    expect(dom.isEditable()).toBe(true);
    expect(dom.hasRenuoUpload()).toBe(true);
  });

  it('tells if has renuo upload', function () {
    const block = new ContentBlock('content', 'path', 'api-key', 'host');
    const element = jQuery('<div>')[0];
    const dom = new DomContentBlock(element, block, 'private-key', null);
    expect(dom.hasRenuoUpload()).toBe(false);
    dom.renuoUploadCredentials = new RenuoUploadCredentials('', '');
    expect(dom.hasRenuoUpload()).toBe(false);
    dom.renuoUploadCredentials.apiKey = 'a';
    dom.renuoUploadCredentials.signingUrl = 'b';
    expect(dom.hasRenuoUpload()).toBe(true);
  });

  it('tells when it is not editable', function () {
    const block = new ContentBlock('content', 'path', 'api-key', 'host');
    const element = jQuery('<div>')[0];
    const dom = new DomContentBlock(element, block, null, null);
    expect(dom.isEditable()).toBe(false);
  });

  it('tells when the content block implements an upload', function () {
    const block = new ContentBlock('content', 'path', 'api-key', 'host');
    const element = jQuery('<div>')[0];
    const dom = new DomContentBlock(element, block, null, null);
    expect(dom.hasRenuoUpload()).toBe(false);
  });
});
