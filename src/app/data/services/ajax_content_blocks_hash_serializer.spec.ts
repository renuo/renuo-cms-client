///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="ajax_content_blocks_hash_serializer.ts"/>

describe('AjaxContentBlocksHashSerializer', function () {
  const service = new AjaxContentBlocksHashSerializer();
  const hash = AjaxServiceMockData.existingContentBlocksHash1();

  describe('The ajax content blocks serializer', function () {
    it('can stringify & parse a AjaxContentBlocksHash', function () {
      const stringified = service.stringify(hash);
      const parsed = service.parse(stringified);

      expect(parsed['my-path'].api_key).toBe(hash['my-path'].api_key);
      expect(parsed['my-path'].content_path).toBe(hash['my-path'].content_path);
      expect(parsed['my-path'].content).toBe(hash['my-path'].content);
      expect(parsed['my-path'].created_at).toEqual(hash['my-path'].created_at);
      expect(parsed['my-path'].updated_at).toEqual(hash['my-path'].updated_at);
    });
  });
});
