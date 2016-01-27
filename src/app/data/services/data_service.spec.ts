///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
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
      service.loadEditableContent(contentBlock, 'pk').then((block:EditableContentBlock) => {
      });
      expect(renuoUploadCredentialsSpy.calls.count()).toBe(1);
    });
  });

  it('stores a content block', function () {
    const ajaxService = new AjaxService();
    spyOn(ajaxService, 'storeContentBlock').and.callFake(
      () => jQuery.Deferred().resolve({content_block: AjaxServiceMockData.existingContentBlock1()}).promise());

    const service = new DataService(ajaxService);
    service.storeContent(contentBlock, 'pk');
    expect(ajaxService.storeContentBlock).toHaveBeenCalledWith(contentBlock, 'pk');
  });

  it('calculates the cache key correctly', function () {
    const dataService = new DataService(null);
    expect(dataService.cacheKey(contentBlock, false)).toEqual('host|api-key|false');
    expect(dataService.cacheKey(contentBlock, true)).toEqual('host|api-key|true');
  });
});
