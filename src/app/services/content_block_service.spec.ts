///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block_service.ts"/>
///<reference path="../models/content_block.ts"/>

describe('ContentBlockService', function () {
  it('loads an empty content block when no block exists', function () {
    const service = new ContentBlockService();
    const block:ContentBlock = service.loadContent('my-path');
    expect(block.content).toBe('');
    expect(block.contentPath).toBe('my-path');
    expect(block.apiKey).toBe('');
  });
});