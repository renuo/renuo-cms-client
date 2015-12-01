///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block_service.ts"/>
///<reference path="../models/content_block.ts"/>
///<reference path="../mocks/ajax_service_mock_data.ts"/>

describe('ContentBlockService', function () {
  it('loads an empty content block when no block exists', function () {
    const ajaxService = new AjaxService();
    spyOn(ajaxService, 'fetchContentBlock').and.callFake(function (apiKey:string, contentPath:string) {
      expect(apiKey).toBe('api-key');
      expect(contentPath).toBe('my-path');
      return jQuery.Deferred(() => {
        return AjaxServiceMockData.existingContentBlock();
      });
    });

    const service = new ContentBlockService(ajaxService);
    service.loadContent('api-key', 'my-path').then(function (block:ContentBlock) {
      expect(block.content).toBe('some content');
      expect(block.contentPath).toBe('my-path');
      expect(block.apiKey).toBe('api-key');
      expect(block.createdAt).toEqual(new Date(2015, 11, 30));
      expect(block.updatedAt).toEqual(new Date(2015, 12, 3));
    });
  });
});
