///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="../models/content_block.ts"/>

describe('AjaxService', function () {
  function ajax_response(response:Object) {
    return jQuery.Deferred().resolve(response).promise();
  }

  const service = new AjaxService();
  const newContentBlock = AjaxServiceMockData.newContentBlock();
  const existingContentBlock = AjaxServiceMockData.existingContentBlock();

  describe('#fetchContentBlock', function () {
    it('fetches a content block with the right request method', function () {
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.url).toBe('http://renuo-cms-client.dev/v1/api-keyx/content_blocks/my-path');
        expect(request.type).toBe('get');
        expect(request.dataType).toBe('json');
        return ajax_response(newContentBlock);
      });
      service.fetchContentBlock(new ContentBlock('', 'my-path', 'api-keyx', 'http://renuo-cms-client.dev')).then(() => {
      });
    });

    it('fetches a new content block', function () {
      spyOn(jQuery, 'ajax').and.returnValue(ajax_response(newContentBlock));
      service.fetchContentBlock(new ContentBlock('', 'my-path', 'api-keyx', 'host')).then((result) => {
        expect(result.content_block.api_key).toBe('api-key');
        expect(result.content_block.api_host).toBeUndefined();
        expect(result.content_block.content_path).toBe('my-path');
        expect(result.content_block.content).toBe('');
        expect(result.content_block.created_at).toBeFalsy();
        expect(result.content_block.updated_at).toBeFalsy();
      });
    });

    it('fetches an existing content block', function () {
      spyOn(jQuery, 'ajax').and.returnValue(ajax_response(existingContentBlock));
      service.fetchContentBlock(new ContentBlock('', 'my-path', 'api-keyx', 'my-h')).then((result) => {
        expect(result.content_block.api_key).toBe('api-key');
        expect(result.content_block.api_host).toBeUndefined();
        expect(result.content_block.content_path).toBe('my-path');
        expect(result.content_block.content).toBe('some content');
        expect(result.content_block.created_at).toBe(existingContentBlock.content_block.created_at);
        expect(result.content_block.updated_at).toBe(existingContentBlock.content_block.updated_at);
      });
    });
  });

  describe('#storeContentBlock', function () {
    it('stores a content block on the server', function () {
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.url).toBe('//host.com/v1/my-api-key/content_blocks');
        expect(request.type).toBe('POST');
        expect(request.dataType).toBe('json');
        const parsed = JSON.parse(request.data);
        expect(parsed.content_block.content).toBe('content');
        expect(parsed.content_block.content_path).toBe('path');
        expect(parsed.content_block.api_key).toBe('my-api-key');
        expect(parsed.content_block.api_host).toBeFalsy();
        expect(parsed.private_api_key).toBe('pk');
        return ajax_response(newContentBlock);
      });
      service.storeContentBlock(new ContentBlock('content', 'path', 'my-api-key', '//host.com'), 'pk').then(() => {
      });
    });
  });
});
