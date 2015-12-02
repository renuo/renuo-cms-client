///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../data/models/content_block.ts"/>
///<reference path="../views/models/dom_content_block.ts"/>
///<reference path="edit_controller.ts"/>
///<reference path="../views/editors/ckeditor/ckeditor_preparer.ts"/>

describe('EditController', function () {
  it('edits an element', function () {
    const block = new ContentBlock('content', 'path', 'api-key');
    const element = $('<div>')[0];
    const dom = new DomContentBlock(element, block, 'private-key');
    const preparer:EditorPreparer = new CkeditorPreparer();
    const controller = new EditController(preparer);

    spyOn(preparer, 'prepare');
    controller.prepareEdit(dom);
    expect(preparer.prepare).toHaveBeenCalledWith(dom);
  });
});
