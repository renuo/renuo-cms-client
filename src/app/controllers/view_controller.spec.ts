///<reference path="../../../typings/jasmine/jasmine.d.ts"/>
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
    const editController = new EditController(null, null, null);
    const controller = new ViewController(finder, converter, dataService, drawer, editController);

    const domContent1:DomContentBlock = converter.convert(elements[0]);
    const domContent2:DomContentBlock = converter.convert(elements[1]);

    spyOn(finder, 'find').and.returnValue(elements);
    spyOn(converter, 'convert').and.callThrough();
    const editControllerSpy = spyOn(editController, 'prepareEdit');
    editControllerSpy.and.callFake((dom:DomContentBlock) => {
      expect(dom.contentBlock.contentPath).toBe('editable-path');
    });
    const newContentBlocks:ContentBlock[] = [];
    spyOn(dataService, 'loadContent').and.callFake((cb:ContentBlock) => {
      const d = new Date(2015, 11, 21);
      const filledCb = new ContentBlock(`new content ${cb.contentPath}`, cb.contentPath, cb.apiKey, cb.apiHost, d, d);
      newContentBlocks.push(filledCb);
      return jQuery.Deferred().resolve(filledCb).promise();
    });
    spyOn(drawer, 'draw').and.callFake((dom:DomContentBlock) => {
      expect(dom.contentBlock.content).toBe(`new content ${dom.contentBlock.contentPath}`);
    });

    controller.init();

    expect(finder.find).toHaveBeenCalled();
    expect(converter.convert).toHaveBeenCalledWith(elements[0]);
    expect(converter.convert).toHaveBeenCalledWith(elements[1]);
    expect(dataService.loadContent).toHaveBeenCalledWith(domContent1.contentBlock);
    expect(dataService.loadContent).toHaveBeenCalledWith(domContent2.contentBlock);
    expect(drawer.draw).toHaveBeenCalled();
    expect(editController.prepareEdit).toHaveBeenCalled();
    expect(editControllerSpy.calls.count()).toBe(1);
  });
});
