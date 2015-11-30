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

  it('Fetches a content block', function () {
    spyOn(jQuery, 'ajax').and.callFake(function(request:any) {
      expect(request.url).toBe('/v1/api-key/content_blocks/my-path');
      expect(request.type).toBe('get');
      expect(request.dataType).toBe('json');
      return ajax_response(newContentBlock);
    });
    const service = new AjaxService('api-key');
    service.fetch('my-path').then((result) => {
      expect(result.content_block.api_key).toBe('api-key');
      expect(result.content_block.content_path).toBe('my-path');
      expect(result.content_block.content).toBe('');
    });
  });
});
