///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="../models/content_block.ts"/>

describe('AjaxService', function () {
  function ajax_response(response:Object) {
    return jQuery.Deferred().resolve(response).promise();
  }

  const service = new AjaxService();
  const newContentBlock = AjaxServiceMockData.newContentBlock();
  const existingContentBlock1 = AjaxServiceMockData.existingContentBlock1();
  const existingContentBlock2 = AjaxServiceMockData.existingContentBlock2();
  const fakeRenuoUploadCredentials = AjaxServiceMockData.existingRenuoUploadCredentials();

  describe('#fetchContentBlocks', function () {
    it('fetches all content blocks with the right request method', function () {
      spyOn(service, 'currentTime').and.returnValue(742.244);
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.type).toBe('get');
        expect(request.dataType).toBe('json');
        return ajax_response([existingContentBlock1, existingContentBlock2]);
      });
      service.fetchContentBlocks('a-api-key', 'http://renuo-cms-client.dev', true).then(() => null);
    });

    it('fetches sets the correct url with caching', function () {
      spyOn(service, 'currentTime').and.returnValue(742.244);
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.url).toBe('http://renuo-cms-client.dev/v1/a-api-key/content_blocks?_=720');
        return ajax_response([]);
      });
      service.fetchContentBlocks('a-api-key', 'http://renuo-cms-client.dev', true).then(() => null);
    });

    it('fetches sets the correct url without caching', function () {
      spyOn(service, 'currentTime').and.returnValue(742.244);
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.url).toBe('http://renuo-cms-client.dev/v1/a-api-key/content_blocks?_=742');
        return ajax_response([]);
      });
      service.fetchContentBlocks('a-api-key', 'http://renuo-cms-client.dev', false).then(() => null);
    });

    it('calculates the cache time correctly with caching', function () {
      const spy = spyOn(service, 'currentTime');
      spy.and.returnValue(742.214);
      expect(service.cacheTime(true)).toBe(720);
      spy.and.returnValue(720.0);
      expect(service.cacheTime(true)).toBe(720);
      spy.and.returnValue(719.999);
      expect(service.cacheTime(true)).toBe(600);
    });

    it('calculates the cache time correctly without caching', function () {
      const spy = spyOn(service, 'currentTime');
      spy.and.returnValue(742.214);
      expect(service.cacheTime(false)).toBe(742);
    });

    it('fetches all existing content blocks', function () {
      spyOn(jQuery, 'ajax').and.returnValue(ajax_response({
        content_blocks: [existingContentBlock1, existingContentBlock2]
      }));
      service.fetchContentBlocks('a-api-key', 'my-h', true).then((result:AjaxContentBlocks) => {
        expect(result.content_blocks[0].api_key).toBe('api-key');
        expect(result.content_blocks[0].hasOwnProperty('api_host')).toBeFalsy();
        expect(result.content_blocks[0].content_path).toBe('my-path');
        expect(result.content_blocks[0].content).toBe('some content');
        expect(result.content_blocks[0].created_at).toBe(existingContentBlock1.created_at);
        expect(result.content_blocks[0].updated_at).toBe(existingContentBlock1.updated_at);

        expect(result.content_blocks[1].api_key).toBe('api-key');
        expect(result.content_blocks[1].hasOwnProperty('api_host')).toBeFalsy();
        expect(result.content_blocks[1].content_path).toBe('my-path2');
        expect(result.content_blocks[1].content).toBe('some different content');
        expect(result.content_blocks[1].created_at).toBe(existingContentBlock2.created_at);
        expect(result.content_blocks[1].updated_at).toBe(existingContentBlock2.updated_at);
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
        expect(parsed.content_block.api_key).toBeUndefined();
        expect(parsed.content_block.api_host).toBeUndefined();
        expect(parsed.content_block.version).toBe(5);
        expect(parsed.private_api_key).toBe('pk');
        expect(request.headers).toEqual({'X-HTTP-Method-Override': 'PUT'});
        return ajax_response(newContentBlock);
      });
      service.storeContentBlock(new ContentBlock('content', 'path', 'my-api-key', '//host.com', null, null, null, 5),
        'pk').then(() => {});
    });
  });

  describe('#getRenuoUploadCredentials', function () {
    it('gets the renuo upload credentials from the server', function () {
      spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
        expect(request.url).toBe('//host.com/v1/my-api-key/renuo_upload_credentials?private_api_key=pk');
        expect(request.type).toBe('get');
        expect(request.dataType).toBe('json');
        return ajax_response(fakeRenuoUploadCredentials);
      });
      service.getRenuoUploadCredentials(new ContentBlock('content', 'path', 'my-api-key', '//host.com'), 'pk').then((parsed) => {
        expect(parsed.renuo_upload_credentials.api_key).toBe('uploadKey');
        expect(parsed.renuo_upload_credentials.signing_url).toBe('http://some.thing');
      });
    });
  });
});
