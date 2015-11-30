///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block.ts"/>

describe('ContentBlock', function () {
  it('constructs the object correctly', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    expect(block.content).toBe('content');
    expect(block.contentPath).toBe('path');
    expect(block.apiKey).toBe('api-key');
  });
});
