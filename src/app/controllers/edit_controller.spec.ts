///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../data/models/content_block.ts"/>
///<reference path="../views/models/dom_content_block.ts"/>
///<reference path="edit_controller.ts"/>
///<reference path="../views/editors/ckeditor/ckeditor_preparer.ts"/>
///<reference path="../views/editors/ckeditor/ckeditor_loader.ts"/>

describe('EditController', function () {
  it('edits an element', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    const element = $('<div>')[0];
    const dom = new DomContentBlock(element, block, 'private-key');
    const preparer:EditorPreparer = new CkeditorPreparer();
    const loader = new CkeditorLoader();
    const controller = new EditController(loader, preparer);

    spyOn(preparer, 'prepare');
    const loaderSpy = spyOn(loader, 'loadEditor');
    const deferred = jQuery.Deferred();
    loaderSpy.and.returnValue(deferred.promise());

    controller.prepareEdit(dom);

    expect(loader.loadEditor).toHaveBeenCalled();
    expect(preparer.prepare).not.toHaveBeenCalled();

    deferred.resolve();

    expect(preparer.prepare).toHaveBeenCalledWith(dom);
    expect(loaderSpy.calls.count()).toBe(1);

    controller.prepareEdit(dom);

    expect(loaderSpy.calls.count()).toBe(1);
  });
});
