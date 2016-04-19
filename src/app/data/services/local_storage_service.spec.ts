///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="local_storage_service.ts"/>
///<reference path="../models/content_block.ts"/>


describe('LocalStorageService', function () {
  const service = new LocalStorageService();
  const contentBlock = new ContentBlock('some content', 'my-path', 'api-key', 'host', new Date(2015, 11, 30), new Date(2015, 12, 3));
  const contentBlock2 = new ContentBlock('some content 2', 'my-path-2', 'api-key', 'host', new Date(2015, 11, 30), new Date(2015, 12, 3));

  const contentBlocks = [contentBlock, contentBlock2];

  describe('The content block saver', function () {
    it('can save a contentBlock', function () {
      service.set(contentBlocks);
      expect(localStorage.getItem('renuo-cms-blocks')).toBeTruthy();
    });

    it('can find a contentBlock', function () {
      const spy = spyOn(localStorage, 'getItem');
      spy.and.returnValue(JSON.stringify(contentBlocks));

      const cb:ContentBlock = service.get(contentBlock);

      expect(cb.apiKey).toBe('api-key');
      expect(cb.apiHost).toBe('host');
      expect(cb.contentPath).toBe('my-path');
      expect(cb.content).toBe('some content');
      expect(cb.createdAt).toEqual(contentBlock.createdAt);
      expect(cb.updatedAt).toEqual(contentBlock.updatedAt);
    });
  });
});
