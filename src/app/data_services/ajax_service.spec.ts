///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="ajax_service.ts"/>

describe('AjaxService', function () {
  function ajax_response(response:Object) {
    return jQuery.Deferred().resolve(response).promise();
  }

  const newContentBlock = {
    content_block: {
      api_key: 'api-key',
      content_path: 'my-path',
      content: '',
      created_at: 0,
      updated_at: 0
    }
  };

  const createdAt = new Date(2015, 11, 30);
  const updatedAt = new Date(2015, 12, 3);

  const existingContentBlock = {
    content_block: {
      api_key: 'api-key',
      content_path: 'my-path',
      content: 'some content',
      created_at: createdAt,
      updated_at: updatedAt
    }
  };

  describe('#fetchContentBlock', function () {
    it('fetches a content block with the right request method', function () {
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.url).toBe('/v1/api-keyx/content_blocks/my-path');
        expect(request.type).toBe('get');
        expect(request.dataType).toBe('json');
        return ajax_response(newContentBlock);
      });
      const service = new AjaxService();
      service.fetchContentBlock('api-keyx', 'my-path').then(() => {
      });
    });

    it('fetches a new content block', function () {
      spyOn(jQuery, 'ajax').and.returnValue(ajax_response(newContentBlock));
      const service = new AjaxService();
      service.fetchContentBlock('api-key', 'my-path').then((result) => {
        expect(result.content_block.api_key).toBe('api-key');
        expect(result.content_block.content_path).toBe('my-path');
        expect(result.content_block.content).toBe('');
        expect(result.content_block.created_at).toBeFalsy();
        expect(result.content_block.updated_at).toBeFalsy();
      });
    });

    it('fetches an existing content block', function () {
      spyOn(jQuery, 'ajax').and.returnValue(ajax_response(existingContentBlock));
      const service = new AjaxService();
      service.fetchContentBlock('api-key', 'my-path').then((result) => {
        expect(result.content_block.api_key).toBe('api-key');
        expect(result.content_block.content_path).toBe('my-path');
        expect(result.content_block.content).toBe('some content');
        expect(result.content_block.created_at).toBe(createdAt);
        expect(result.content_block.updated_at).toBe(updatedAt);
      });
    });
  });

  describe('#storeContentBlock', function () {
    it('stores a content block on the server', function () {
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.url).toBe('/v1/my-api-key/content_blocks');
        expect(request.type).toBe('POST');
        expect(request.dataType).toBe('json');
        const parsed = JSON.parse(request.data);
        expect(parsed.content_block.content).toBe('content');
        expect(parsed.content_block.content_path).toBe('path');
        expect(parsed.content_block.api_key).toBe('my-api-key');
        return ajax_response(newContentBlock);
      });
      const service = new AjaxService();
      service.storeContentBlock(new ContentBlock('content', 'path', 'my-api-key')).then(() => {
      });
    });
  });
});
