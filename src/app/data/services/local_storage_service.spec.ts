///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="local_storage_service.ts"/>
///<reference path="../models/content_block.ts"/>

describe('LocalStorageService', function () {
  const service = new LocalStorageService();
  const hash1 =  AjaxServiceMockData.existingContentBlocksHash1();
  const hash2 = AjaxServiceMockData.existingContentBlocksHash2();

  describe('The content block saver', function () {
    afterEach(function() {
      localStorage.clear();
    });

    it('can save a hash and it gets only updated if it is expired', function () {
      const key = '1';
      service.put(key, hash1);

      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash1));

      service.put(key, hash2);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash1));
    });

    it('can save a hash and it gets updated if it is expired', function () {
      const key = '2';
      const timestampSpy = spyOn(service, 'timestamp');

      timestampSpy.and.returnValue(0);
      service.put(key, hash1);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash1));

      timestampSpy.and.returnValue(LocalStorageService.EXPIRATIONTIME - 1);
      service.put(key, hash2);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash1));

      timestampSpy.and.returnValue(LocalStorageService.EXPIRATIONTIME + 1);
      service.put(key, hash2);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash2));
    });

    it('can load a hash', function () {
      const key = '3';
      localStorage.setItem(key, JSON.stringify(hash1));
      expect(service.fetch(key)).toEqual(hash1);
    });
  });
});
