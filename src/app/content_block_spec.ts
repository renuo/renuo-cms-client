///<reference path="../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block.ts"/>

describe('ContentBlock', function () {
  it('contains spec with an expectation', function () {
    var c = new ContentBlock('content', 'path', 'api-key');
    expect(c.content).toEqual('content');
    expect(c.contentPath).toEqual('path');
    expect(c.apiKey).toEqual('api-key');
  });
});
