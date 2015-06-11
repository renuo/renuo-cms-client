///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="dom_service.ts"/>
///<reference path="../models/content_block.ts"/>

describe('DomService', function () {
  var domService:DomService, contentBlock:ContentBlock;

  beforeEach(function () {
    domService = new DomService();
    contentBlock = new ContentBlock(1, 'Foo Bar');
    $("<div data-block='1'></div>").appendTo('body');
  });

  afterEach(function () {
    $("div[data-block='1']").remove();
  });

  it('can init the dom service', function () {
    expect(new DomService()).not.toBe(null);
  });

  it('can get a contentBlockHolder based on a contentBlock', function () {
    expect(domService.emptyContentBlock(contentBlock)).toBeDefined();
    expect(domService.emptyContentBlock(contentBlock).attr('data-block')).toBe('1');
  });

  it('can draw a contentBlock', function () {
    expect(domService.emptyContentBlock(contentBlock).hasClass('content-block')).toBe(true);
    domService.drawContentBlock(contentBlock);
    expect($("div[data-block='1']").hasClass('content-block')).toBe(true);
  });

  it('can make a drawn ContentBlock editable', function () {
    domService.drawContentBlock(contentBlock);
    domService.makeContentBlockEditable(contentBlock);
    expect($('textarea#block_1')).toBeDefined();
  });
});
