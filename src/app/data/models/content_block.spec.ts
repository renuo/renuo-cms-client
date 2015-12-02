///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block.ts"/>

describe('ContentBlock', function () {
  it('constructs the object correctly', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    expect(block.content).toBe('content');
    expect(block.contentPath).toBe('path');
    expect(block.apiKey).toBe('api-key');
  });

  it('constructs the object correctly with updateAt and createdAt', function () {
    const block = new ContentBlock('content', 'path', 'api-key', new Date(2015, 10, 20), new Date(2015, 10, 22));
    expect(block.content).toBe('content');
    expect(block.contentPath).toBe('path');
    expect(block.apiKey).toBe('api-key');
    expect(block.createdAt).toEqual(new Date(2015, 10, 20));
    expect(block.updatedAt).toEqual(new Date(2015, 10, 22));
  });
});
