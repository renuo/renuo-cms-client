///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="i18n.ts"/>

describe('I18n', function () {
  describe('#t', function () {
    it('returns a translated string for a given key',  function () {
      expect(typeof I18n.t('cms.edit.message.conflict')).toEqual('string');
    });
  });
});
