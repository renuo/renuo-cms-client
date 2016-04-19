///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="local_storage_service.ts"/>
///<reference path="../models/content_block.ts"/>


describe('LocalStorageService', function () {
  const service = new LocalStorageService();
  const hash = { blub: 'blub' };
  const hash2 = { blub: 'blub2' };
  const key = 'blub';

  describe('The content block saver', function () {
    it('can save a hash and it gets only updated if it is expired', function () {
      service.put(key, hash);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash));

      service.put(key, hash2);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash));
    });

    it('can save a hash and it gets updated if it is expired', function () {
      service.put(key, hash);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash));

      spyOn(service, 'isValid').and.returnValue(false);

      service.put(key, hash2);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash2));
    });

    it('can load a hash', function () {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(hash));
      expect(service.fetch(key)).toEqual(hash);
    });
  });
});
