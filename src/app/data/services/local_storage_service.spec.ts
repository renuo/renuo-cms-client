///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="local_storage_service.ts"/>
///<reference path="../models/content_block.ts"/>


describe('LocalStorageService', function () {
  const service = new LocalStorageService();
  const hash = { blub: 'blub' };
  const key = 'blub';

  describe('The content block saver', function () {
    it('can save a hash', function () {
      service.put(key, hash);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(hash));
    });

    it('can load a hash', function () {
      const spy = spyOn(localStorage, 'getItem');
      spy.and.returnValue(JSON.stringify(hash));

      expect(service.fetch(key)).toEqual(hash);
    });
  });
});
