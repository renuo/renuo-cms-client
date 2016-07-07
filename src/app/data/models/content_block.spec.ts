///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="content_block.ts"/>

describe('ContentBlock', function () {

  const createdAt = new Date(2015, 10, 20);
  const updatedAt = new Date(2015, 10, 22);

  it('constructs the object correctly', function () {
    const block = new ContentBlock('content', 'path', 'api-key', 'host');
    expect(block.content).toBe('content');
    expect(block.contentPath).toBe('path');
    expect(block.apiKey).toBe('api-key');
    expect(block.apiHost).toBe('host');
  });

  it('constructs the object correctly with updateAt and createdAt', function () {
    const block = new ContentBlock('content', 'path', 'api-key', 'my-host', createdAt, updatedAt);
    expect(block.content).toBe('content');
    expect(block.contentPath).toBe('path');
    expect(block.apiKey).toBe('api-key');
    expect(block.apiHost).toBe('my-host');
    expect(block.createdAt).toEqual(createdAt);
    expect(block.updatedAt).toEqual(updatedAt);
  });

  it('returns if the content block is new or not', function () {
    const existingBlock = new ContentBlock('content', 'path', 'api-key', 'my-host', createdAt, updatedAt);
    expect(existingBlock.isNew()).toEqual(false);
    const newBlock = new ContentBlock('content', 'path', 'api-key', 'my-host', null, null);
    expect(newBlock.isNew()).toEqual(true);
  });

  it('sets the default content correctly', function () {
    const existingBlock2 = new ContentBlock('content', 'path', 'api-key', 'my-host', createdAt, updatedAt, 'default');
    expect(existingBlock2.defaultContent).toEqual('default');
    const existingBlock3 = new ContentBlock('content', 'path', 'api-key', 'my-host');
    expect(existingBlock3.defaultContent).toEqual(null);
  });

  it('sets the version correctly', function () {
    const existingBlock2 = new ContentBlock('content', 'path', 'api-key', 'my-host', createdAt, updatedAt, 'xyz', 15);
    expect(existingBlock2.version).toEqual(15);
    const existingBlock3 = new ContentBlock('content', 'path', 'api-key', 'my-host');
    expect(existingBlock3.version).toEqual(null);
  });

  it('knows if the content should be rendered as paragraph or not', function(){
    expect(new ContentBlock('', '', '', '', createdAt, updatedAt, '').shouldUseParagraphs()).toEqual(true);
    expect(new ContentBlock('', '', '', '', createdAt, updatedAt, 'some text').shouldUseParagraphs()).toEqual(false);
    expect(new ContentBlock('', '', '', '', createdAt, updatedAt, '<p>yay</p>').shouldUseParagraphs()).toEqual(true);
  });

  it('replaces . with - in the content path', function(){
    expect(new ContentBlock('', 'some.path', '', '', createdAt, updatedAt, '').contentPath).toEqual('some-path');
    expect(new ContentBlock('', 'x..a...z', '', '', createdAt, updatedAt, '').contentPath).toEqual('x--a---z');
  });
});
