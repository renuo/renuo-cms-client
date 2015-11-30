///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="ajax_service.ts"/>

describe('AjaxService', function () {
  function ajax_response(response:Object) {
    return jQuery.Deferred().resolve(response).promise();
  }

  const createdAt = new Date(2015, 11, 30);
  const updatedAt = new Date(2015, 12, 3);

  const newContentBlock = {
    content_block: {
      api_key: 'api-key',
      content_path: 'my-path',
      content: '',
      created_at: 0,
      updated_at: 0
    }
  };

  const existingContentBlock = {
    content_block: {
      api_key: 'api-key',
      content_path: 'my-path',
      content: 'some content',
      created_at: createdAt,
      updated_at: updatedAt
    }
  };

  it('Fetches a content block with the right request method', function () {
    spyOn(jQuery, 'ajax').and.callFake(function (request:any) {
      expect(request.url).toBe('/v1/api-key/content_blocks/my-path');
      expect(request.type).toBe('get');
      expect(request.dataType).toBe('json');
      return ajax_response(newContentBlock);
    });
    const service = new AjaxService('api-key');
    service.fetch('my-path').then((result) => {
    });
  });

  it('Fetches a new content block', function () {
    spyOn(jQuery, 'ajax').and.returnValue(ajax_response(newContentBlock));
    const service = new AjaxService('api-key');
    service.fetch('my-path').then((result) => {
      expect(result.content_block.api_key).toBe('api-key');
      expect(result.content_block.content_path).toBe('my-path');
      expect(result.content_block.content).toBe('');
      expect(result.content_block.created_at).toBeFalsy();
      expect(result.content_block.updated_at).toBeFalsy();
    });
  });

  it('Fetches an existing content block', function () {
    spyOn(jQuery, 'ajax').and.returnValue(ajax_response(existingContentBlock));
    const service = new AjaxService('api-key');
    service.fetch('my-path').then((result) => {
      expect(result.content_block.api_key).toBe('api-key');
      expect(result.content_block.content_path).toBe('my-path');
      expect(result.content_block.content).toBe('some content');
      expect(result.content_block.created_at).toBe(createdAt);
      expect(result.content_block.updated_at).toBe(updatedAt);
    });
  });
});
