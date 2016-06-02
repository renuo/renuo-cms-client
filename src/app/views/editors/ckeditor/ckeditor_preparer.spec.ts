///<reference path="../../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="../../../../../typings/globals/ckeditor/index.d.ts"/>
///<reference path="ckeditor_preparer.ts"/>
///<reference path="../edit_content_block_callback.ts"/>
///<reference path="../../../data/models/renuo_upload_credentials.ts"/>

describe('CkeditorPreparer', function () {
  jasmine.Ajax.install();
  new ScriptLoader().loadScript('/renuo-upload-mock').then(null);
  const testResponse = {status: 200, responseText: 'var CKEDITOR={"version":"yay-a-mock"};'};
  jasmine.Ajax.requests.mostRecent().respondWith(testResponse);
  jasmine.Ajax.uninstall();

  const blockWithParagraphs = new ContentBlock('<p>content</p>', 'path', 'api-key', 'host', null, null, '');
  const blockWithoutParagraphs = new ContentBlock('content', 'path', 'api-key', 'host', null, null, 'no paragraphs');
  const element = jQuery('<div>')[0];
  const dom = new DomContentBlock(element, blockWithParagraphs, 'private-key', new RenuoUploadCredentials('', ''));

  const spy = jasmine.createSpy('ckeditor');
  let calledEventName:string;
  let calledListenerFunction:(event:CKEDITOR.eventInfo) => void;

  const onStub = jasmine.createSpy('onStub',
    function (eventName:string, listenerFunction:(event:CKEDITOR.eventInfo) => void) {
      calledEventName = eventName;
      calledListenerFunction = listenerFunction;
    });
  onStub.and.callThrough();

  const fakeCkeditor = {
    inline: spy.and.returnValue({
      on: onStub
    })
  };
  const preparer = new CkeditorPreparer(fakeCkeditor);
  const callback:EditContentBlockCallback = jasmine.createSpy('callback');

  describe('#prepare', function () {
    it('sets the correct enter method', function () {
      expect(preparer.enterMethod(blockWithParagraphs)).toEqual({});
      expect(preparer.enterMethod(blockWithoutParagraphs)).toEqual({
        enterMode: CKEDITOR.ENTER_BR,
        shiftEnterMode: CKEDITOR.ENTER_P
      });
    });

    it('sets the contenteditable on the element', function () {
      expect(jQuery(element).attr('contenteditable')).toBeFalsy();
      preparer.prepare(dom, callback);
      expect(spy.calls.count()).toBe(1);
      preparer.prepare(dom, callback);
      expect(spy.calls.count()).toBe(1);
      expect(jQuery(element).attr('contenteditable')).toBe('true');
    });

    it('prepares a content for editing', function () {
      expect(fakeCkeditor.inline).toHaveBeenCalledWith(dom.element, jasmine.any(Object));
      expect(onStub).toHaveBeenCalledWith('blur', jasmine.any(Function));
      expect(calledEventName).toBe('blur');
      expect(calledListenerFunction).toEqual(jasmine.any(Function));
    });

    it('does not call the save callback when the editor ist not dirty', function () {
      const event:any = {
        editor: {
          checkDirty: () => false
        }
      };
      expect(callback).not.toHaveBeenCalled();
      calledListenerFunction(event);
      expect(callback).not.toHaveBeenCalled();
    });

    it('calls the callback when the editor is dirty', function () {
      let resetCalled = false;
      const event:any = {
        editor: {
          checkDirty: () => true,
          getData: () => 'bla bla bla new content',
          resetDirty: () => resetCalled = true
        }
      };
      expect(callback).not.toHaveBeenCalled();
      expect(resetCalled).toBeFalsy();
      calledListenerFunction(event);
      expect(callback).toHaveBeenCalledWith(dom, 'bla bla bla new content');
      expect(resetCalled).toBeTruthy();
    });

    describe('#notifySave', function () {
      it('runs an animation', function () {
        // TODO: test the animation?
        preparer.notifySave(dom, true);
        preparer.notifySave(dom, false);
      });
    });
  });
});
