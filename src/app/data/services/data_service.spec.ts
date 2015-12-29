///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="data_service.ts"/>
///<reference path="../models/content_block.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>

describe('DataService', function () {
  const contentBlock = new ContentBlock('', 'my-path', 'api-key', 'host');

  it('loads a content block', function () {
    const ajaxService = new AjaxService();
    const blocks = {
      content_blocks: [AjaxServiceMockData.existingContentBlock1(), AjaxServiceMockData.existingContentBlock2()]
    };
    const spy = spyOn(ajaxService, 'fetchContentBlocks');
    spy.and.callFake(
      () => jQuery.Deferred().resolve(blocks).promise());

    const service = new DataService(ajaxService);
    service.loadContent(contentBlock).then(function (block:ContentBlock) {
      expect(block.content).toBe('some content');
      expect(block.contentPath).toBe('my-path');
      expect(block.apiKey).toBe('api-key');
      expect(block.apiHost).toBe('host');
      expect(block.createdAt).toEqual(new Date(2015, 11, 30));
      expect(block.updatedAt).toEqual(new Date(2015, 12, 3));
    });
    expect(ajaxService.fetchContentBlocks).toHaveBeenCalledWith(contentBlock.apiKey, contentBlock.apiHost);
    expect(spy.calls.count()).toBe(1);
    service.loadContent(contentBlock);
    expect(spy.calls.count()).toBe(1);
  });

  it('stores a content block', function () {
    const ajaxService = new AjaxService();
    spyOn(ajaxService, 'storeContentBlock').and.callFake(
      () => jQuery.Deferred().resolve({content_block: AjaxServiceMockData.existingContentBlock1()}).promise());

    const service = new DataService(ajaxService);
    service.storeContent(contentBlock, 'pk');
    expect(ajaxService.storeContentBlock).toHaveBeenCalledWith(contentBlock, 'pk');
  });
});
