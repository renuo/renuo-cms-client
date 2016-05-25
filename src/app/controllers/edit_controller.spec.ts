///<reference path="../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../data/models/content_block.ts"/>
///<reference path="../views/models/dom_content_block.ts"/>
///<reference path="edit_controller.ts"/>
///<reference path="../views/editors/ckeditor/ckeditor_preparer.ts"/>
///<reference path="../views/editors/ckeditor/ckeditor_loader.ts"/>
///<reference path="../views/helpers/script_loader.ts"/>
///<reference path="../views/editors/upload/upload_loader.ts"/>
///<reference path="../data/models/renuo_upload_credentials.ts"/>

describe('EditController', function () {
  const block = new ContentBlock('content', 'path', 'api-key', 'host', new Date(2015, 10, 1), new Date(2015, 10, 1),
    'default');
  const element = jQuery('<div>')[0];
  const dom = new DomContentBlock(element, block, 'private-key', new RenuoUploadCredentials('', ''));
  const preparer:EditorPreparer = new CkeditorPreparer();
  const editorLoader:EditorLoader = new CkeditorLoader(new ScriptLoader());
  const uploadLoader = new UploadLoader(new ScriptLoader(), new CSSInjector());
  const dataService = new DataService(null);
  const controller = new EditController(dataService, editorLoader, uploadLoader, preparer);

  it('prepares an element for editing', function () {
    spyOn(preparer, 'prepare');
    const loaderSpy = spyOn(editorLoader, 'loadEditor');
    const uploadSpy = spyOn(uploadLoader, 'loadUpload');
    const deferredEditor = jQuery.Deferred();
    const deferredUpload = jQuery.Deferred();
    loaderSpy.and.returnValue(deferredEditor.promise());
    uploadSpy.and.returnValue(deferredUpload.promise());

    controller.prepareEdit(dom);

    expect(editorLoader.loadEditor).toHaveBeenCalled();
    expect(preparer.prepare).not.toHaveBeenCalled();
    deferredEditor.resolve();
    expect(preparer.prepare).not.toHaveBeenCalled();
    deferredUpload.resolve();

    expect(preparer.prepare).toHaveBeenCalledWith(dom, jasmine.any(Function));
    expect(loaderSpy.calls.count()).toBe(1);
    expect(uploadSpy.calls.count()).toBe(1);
    controller.prepareEdit(dom);
    expect(loaderSpy.calls.count()).toBe(1);
    expect(uploadSpy.calls.count()).toBe(1);
  });

  // cannot be tested?
  // it('loads the upload', function () {
  // });

  it('edits a dom element successfully', function () {
    const deferred = jQuery.Deferred();
    spyOn(preparer, 'notifySave');
    const dataServiceSpy = spyOn(dataService, 'storeContent');
    dataServiceSpy.and.returnValue(deferred);
    controller.editContent(dom, 'this is new content');
    const newContentBlock = new ContentBlock('this is new content', block.contentPath, block.apiKey, block.apiHost,
      block.createdAt, block.updatedAt, block.defaultContent);
    expect(dataServiceSpy).toHaveBeenCalledWith(newContentBlock, 'private-key');
    expect(preparer.notifySave).not.toHaveBeenCalled();
    deferred.resolve('');
    expect(preparer.notifySave).toHaveBeenCalledWith(dom, true);
  });

  it('edits a dom element unsuccessfully', function () {
    const deferred = jQuery.Deferred();
    spyOn(preparer, 'notifySave');
    const dataServiceSpy = spyOn(dataService, 'storeContent');
    dataServiceSpy.and.returnValue(deferred);
    controller.editContent(dom, 'this is new content');
    const newContentBlock = new ContentBlock('this is new content', block.contentPath, block.apiKey, block.apiHost,
      block.createdAt, block.updatedAt, block.defaultContent);
    expect(dataServiceSpy).toHaveBeenCalledWith(newContentBlock, 'private-key');
    expect(preparer.notifySave).not.toHaveBeenCalled();
    deferred.reject();
    expect(preparer.notifySave).toHaveBeenCalledWith(dom, false);
  });
});
