///<reference path="../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="view_controller.ts"/>
///<reference path="../views/services/content_block_finder.ts"/>
///<reference path="../data/models/content_block.ts"/>
///<reference path="../views/models/dom_content_block.ts"/>

describe('ViewController', function () {
  it('initializes the contents', function () {
    const elements:HTMLElement[] = [
      jQuery('<div data-content-path="my-path" data-api-host="host" data-api-key="my-key"></div>')[0],
      jQuery('<div data-content-path="editable-path" data-api-host="host" data-api-key="my-key" data-private-api-key="PK"></div>')[0]
    ];

    const finder = new ContentBlockFinder();
    const converter = new DomContentBlockConverter();
    const dataService = new DataService(null);
    const drawer = new ContentBlockDrawer();
    const editController = new EditController(null, null, null, null);
    const controller = new ViewController(finder, converter, dataService, drawer, editController);

    const domContent1:DomContentBlock = converter.convert(elements[0]);
    const domContent2:DomContentBlock = converter.convert(elements[1]);

    spyOn(finder, 'find').and.returnValue(elements);
    spyOn(converter, 'convert').and.callThrough();
    const editControllerSpy = spyOn(editController, 'prepareEdit');
    editControllerSpy.and.callFake((dom:DomContentBlock) => {
      expect(dom.contentBlock.contentPath).toBe('editable-path');
    });

    spyOn(dataService, 'loadEditableContent').and.callFake((cb:ContentBlock) => {
      const d = new Date(2015, 11, 21);
      const filledCb = new ContentBlock(`real content ${cb.contentPath}`, cb.contentPath, cb.apiKey, cb.apiHost, d, d);
      const editableCb = new EditableContentBlock(filledCb, null);
      return jQuery.Deferred().resolve(editableCb).promise();
    });

    spyOn(dataService, 'loadReadonlyContent').and.callFake((cb:ContentBlock) => {
      const d = new Date(2015, 11, 21);
      const filledCb = new ContentBlock(`real content ${cb.contentPath}`, cb.contentPath, cb.apiKey, cb.apiHost, d, d);
      return jQuery.Deferred().resolve(filledCb).promise();
    });

    spyOn(dataService, 'loadReadonlyContentFromCache').and.callFake((cb:ContentBlock) => {
      const d = new Date(2015, 11, 21);
      return new ContentBlock(`cached content ${cb.contentPath}`, cb.contentPath, cb.apiKey, cb.apiHost, d, d);
    });

    const drawerSpy = spyOn(drawer, 'draw').and.stub();

    controller.init();

    expect(finder.find).toHaveBeenCalled();
    expect(converter.convert).toHaveBeenCalledWith(elements[0]);
    expect(converter.convert).toHaveBeenCalledWith(elements[1]);
    expect(dataService.loadReadonlyContent).toHaveBeenCalledWith(domContent1.contentBlock);
    expect(dataService.loadEditableContent).toHaveBeenCalledWith(domContent2.contentBlock, domContent2.privateApiKey);
    expect(drawer.draw).toHaveBeenCalled();
    expect(editControllerSpy.calls.count()).toBe(1);
    expect(editController.prepareEdit).toHaveBeenCalled();

    const drawFirstDom = drawerSpy.calls.first().args[0];
    expect(drawFirstDom.contentBlock.content).toBe(`cached content ${drawFirstDom.contentBlock.contentPath}`);
    const drawSecondDom = drawerSpy.calls.mostRecent().args[0];
    expect(drawSecondDom.contentBlock.content).toBe(`real content ${drawSecondDom.contentBlock.contentPath}`);
  });

  it('initializes the contents of specified content-blocks', function () {
    const elements:HTMLElement[] = [
      jQuery('<div data-content-path="my-path" data-api-host="host" data-api-key="my-key"></div>')[0],
      jQuery('<div data-content-path="editable-path" data-api-host="host" data-api-key="my-key" data-private-api-key="PK"></div>')[0]
    ];

    const finder = new ContentBlockFinder();
    const converter = new DomContentBlockConverter();
    const dataService = new DataService(null);
    const drawer = new ContentBlockDrawer();
    const editController = new EditController(null, null, null, null);
    const controller = new ViewController(finder, converter, dataService, drawer, editController);

    const domContent1:DomContentBlock = converter.convert(elements[0]);
    const domContent2:DomContentBlock = converter.convert(elements[1]);

    spyOn(finder, 'find').and.returnValue(elements);
    spyOn(converter, 'convert').and.callThrough();
    const editControllerSpy = spyOn(editController, 'prepareEdit');
    editControllerSpy.and.callFake((dom:DomContentBlock) => {
      expect(dom.contentBlock.contentPath).toBe('editable-path');
    });

    spyOn(dataService, 'loadEditableContent').and.callFake((cb:ContentBlock) => {
      const d = new Date(2015, 11, 21);
      const filledCb = new ContentBlock(`real content ${cb.contentPath}`, cb.contentPath, cb.apiKey, cb.apiHost, d, d);
      const editableCb = new EditableContentBlock(filledCb, null);
      return jQuery.Deferred().resolve(editableCb).promise();
    });

    spyOn(dataService, 'loadReadonlyContent').and.callFake((cb:ContentBlock) => {
      const d = new Date(2015, 11, 21);
      const filledCb = new ContentBlock(`real content ${cb.contentPath}`, cb.contentPath, cb.apiKey, cb.apiHost, d, d);
      return jQuery.Deferred().resolve(filledCb).promise();
    });

    spyOn(dataService, 'loadReadonlyContentFromCache').and.callFake((cb:ContentBlock) => {
      const d = new Date(2015, 11, 21);
      return new ContentBlock(`cached content ${cb.contentPath}`, cb.contentPath, cb.apiKey, cb.apiHost, d, d);
    });

    const drawerSpy = spyOn(drawer, 'draw').and.stub();

    controller.init(elements);

    expect(finder.find).not.toHaveBeenCalled();
    expect(converter.convert).toHaveBeenCalledWith(elements[0]);
    expect(converter.convert).toHaveBeenCalledWith(elements[1]);
    expect(dataService.loadReadonlyContent).toHaveBeenCalledWith(domContent1.contentBlock);
    expect(dataService.loadEditableContent).toHaveBeenCalledWith(domContent2.contentBlock, domContent2.privateApiKey);
    expect(drawer.draw).toHaveBeenCalled();
    expect(editControllerSpy.calls.count()).toBe(1);
    expect(editController.prepareEdit).toHaveBeenCalled();

    const drawFirstDom = drawerSpy.calls.first().args[0];
    expect(drawFirstDom.contentBlock.content).toBe(`cached content ${drawFirstDom.contentBlock.contentPath}`);
    const drawSecondDom = drawerSpy.calls.mostRecent().args[0];
    expect(drawSecondDom.contentBlock.content).toBe(`real content ${drawSecondDom.contentBlock.contentPath}`);
  });
});
