///<reference path="../../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../../../../typings/ckeditor/ckeditor.d.ts"/>
///<reference path="ckeditor_preparer.ts"/>
///<reference path="../edit_content_block_callback.ts"/>

describe('CkeditorPreparer', function () {
  const block = new ContentBlock('content', 'path', 'api-key', 'host');
  const element = jQuery('<div>')[0];
  const dom = new DomContentBlock(element, block, 'private-key');

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
    it('sets the contenteditable on the element', function () {
      expect(jQuery(element).attr('contenteditable')).toBeFalsy();
      preparer.prepare(dom, callback);
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