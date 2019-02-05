///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="local_storage_service.ts"/>
///<reference path="../models/content_block.ts"/>

describe('LocalStorageService', function () {
  const hash1 =  AjaxServiceMockData.existingContentBlocksHash1();
  const hash2 = AjaxServiceMockData.existingContentBlocksHash2();

  afterEach(function() {
    localStorage.clear();
  });

  describe('when localStorage is available', function () {
    const service = new LocalStorageService(localStorage);

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

    it('fetch returns an empty map if key does not exist', function () {
      const key = 'invalidKey';
      expect(service.fetch(key)).toEqual({});
    });

    it('catches QuotaExceededError', function () {
      const key = '2';
      const error = new Error('An error occurred');

      spyOn(localStorage, 'setItem').and.callFake(() => {
        throw error;
      });
      spyOn(console, 'error');

      expect(function() {
        service.put(key, hash1);
      }).not.toThrow();

      // it is not possible to mock the localStorage in firefox. Thats why we skip this test if it's run on firefox
      if (navigator.userAgent.toLowerCase().indexOf('firefox') < -1) {
        expect(console.error).toHaveBeenCalledWith(error);
      }
    });
  });

  describe('when localStorage is not available', function () {
    const service = new LocalStorageService(undefined);

    it('fetch returns and empty map if localStorage is null', function () {
      const key = '1';
      service.put(key, hash1);

      expect(service.fetch(key)).toEqual({});
    });
  });
});
