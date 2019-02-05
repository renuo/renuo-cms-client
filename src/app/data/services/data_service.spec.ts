///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="data_service.ts"/>
///<reference path="../models/content_block.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="../models/editable_content_block.ts"/>

describe('DataService', function () {
  const contentBlock = new ContentBlock('', 'my-path', 'api-key', 'host');

  describe('The content block loader', function () {
    const ajaxService = new AjaxService();
    const blocks = {
      content_blocks: [AjaxServiceMockData.existingContentBlock1(), AjaxServiceMockData.existingContentBlock2()]
    };

    it('loads a readonly content block', function () {
      const spy = spyOn(ajaxService, 'fetchContentBlocks');
      spy.and.callFake(() => jQuery.Deferred().resolve(blocks).promise());

      const service = new DataService(ajaxService);
      service.loadReadonlyContent(contentBlock).then((block:ContentBlock) => {
        expect(block.content).toBe('some content');
        expect(block.contentPath).toBe('my-path');
        expect(block.apiKey).toBe('api-key');
        expect(block.apiHost).toBe('host');
        expect(block.createdAt).toEqual(new Date(2015, 11, 30));
        expect(block.updatedAt).toEqual(new Date(2015, 12, 3));
      });
      expect(ajaxService.fetchContentBlocks).toHaveBeenCalledWith(contentBlock.apiKey, contentBlock.apiHost, true);
      expect(spy.calls.count()).toBe(1);
      service.loadReadonlyContent(contentBlock);
      expect(spy.calls.count()).toBe(1);
    });

    it('loads an editable content block without caching', function () {
      const contentBlocksSpy = spyOn(ajaxService, 'fetchContentBlocks');
      contentBlocksSpy.and.callFake(() => jQuery.Deferred().resolve(blocks).promise());

      const renuoUploadCredentialsSpy = spyOn(ajaxService, 'getRenuoUploadCredentials');
      const credentials:AjaxRenuoUploadCredentials = {
        renuo_upload_credentials: {
          api_key: 'upload-api-key',
          signing_url: 'signing-url'
        }
      };
      renuoUploadCredentialsSpy.and.callFake(() => jQuery.Deferred().resolve(credentials).promise());

      const service = new DataService(ajaxService);
      service.loadEditableContent(contentBlock, 'pk').then((block:EditableContentBlock) => {
        expect(block.contentBlock.content).toBe('some content');
        expect(block.contentBlock.contentPath).toBe('my-path');
        expect(block.contentBlock.apiKey).toBe('api-key');
        expect(block.contentBlock.apiHost).toBe('host');
        expect(block.contentBlock.updatedAt).toEqual(new Date(2015, 12, 3));
        expect(block.contentBlock.createdAt).toEqual(new Date(2015, 11, 30));
        expect(block.renuoUploadCredentials.apiKey).toEqual('upload-api-key');
        expect(block.renuoUploadCredentials.signingUrl).toEqual('signing-url');
      });
      expect(ajaxService.fetchContentBlocks).toHaveBeenCalledWith(contentBlock.apiKey, contentBlock.apiHost, false);
      expect(contentBlocksSpy.calls.count()).toBe(1);
      expect(renuoUploadCredentialsSpy.calls.count()).toBe(1);
      service.loadEditableContent(contentBlock, 'pk').then((block:EditableContentBlock) => {});
      expect(contentBlocksSpy.calls.count()).toBe(1);
      expect(renuoUploadCredentialsSpy.calls.count()).toBe(1);
    });

    it('returns the same block on local storage cache miss', function() {
      localStorage.clear();

      const service = new DataService(ajaxService);
      const block = service.loadReadonlyContentFromCache(contentBlock);
      expect(block).toBe(contentBlock);
    });

    it('fetches a content block from the local storage', function() {
      const contentBlocksSpy = spyOn(ajaxService, 'fetchContentBlocks');
      contentBlocksSpy.and.callFake(() => jQuery.Deferred().resolve(blocks).promise());

      const service = new DataService(ajaxService);

      service.loadReadonlyContent(contentBlock).then((requestedBlock) => {
        const cachedBlock = service.loadReadonlyContentFromCache(requestedBlock);

        expect(cachedBlock).not.toBe(requestedBlock);
        expect(cachedBlock.content).toEqual(requestedBlock.content);
        expect(cachedBlock.contentPath).toEqual(requestedBlock.contentPath);
        expect(cachedBlock.apiKey).toEqual(requestedBlock.apiKey);
        expect(cachedBlock.apiHost).toEqual(requestedBlock.apiHost);
        expect(cachedBlock.createdAt).toEqual(requestedBlock.createdAt);
        expect(cachedBlock.updatedAt).toEqual(requestedBlock.updatedAt);
      });
    });
  });

  it('stores a content block', function () {
    const ajaxContentBlock = AjaxServiceMockData.existingContentBlock1();
    const existingContentBlock = AjaxServiceMockData.existingContentBlock1();

    const ajaxService = new AjaxService();
    spyOn(ajaxService, 'storeContentBlock').and.callFake(
      () => jQuery.Deferred().resolve({content_block: ajaxContentBlock}).promise());

    const localStorageService = new LocalStorageService(localStorage);
    spyOn(localStorageService, 'put');
    spyOn(localStorageService, 'fetch').and.returnValue({'my-path2': existingContentBlock});

    const service = new DataService(ajaxService, localStorageService);
    service.storeContent(contentBlock, 'pk');
    expect(ajaxService.storeContentBlock).toHaveBeenCalledWith(contentBlock, 'pk');

    const expectedCacheValue = {'my-path': ajaxContentBlock, 'my-path2': existingContentBlock};
    expect(localStorageService.put).toHaveBeenCalledWith('host|api-key|true', expectedCacheValue);
    expect(localStorageService.put).toHaveBeenCalledWith('host|api-key|false', expectedCacheValue);
  });

  it('calculates the cache key correctly', function () {
    const dataService = new DataService(null);
    expect(dataService.cacheKey(contentBlock, false)).toEqual('host|api-key|false');
    expect(dataService.cacheKey(contentBlock, true)).toEqual('host|api-key|true');
  });
});
