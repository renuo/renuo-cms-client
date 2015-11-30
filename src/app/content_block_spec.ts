///<reference path="../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block.ts"/>

describe('ContentBlock', function () {
  it('contains spec with an expectation', function () {
    var block = new ContentBlock('content', 'path', 'api-key');
    expect(block.content).toBe('content');
    expect(block.contentPath).toBe('path');
    expect(block.apiKey).toBe('api-key');
  });
});
