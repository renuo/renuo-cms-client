///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="dom_service.ts"/>
///<reference path="../models/content_block.ts"/>

describe('DomService', function () {
  var domService:DomService, contentBlock:ContentBlock

  var getDomContentBlock = function (contentBlock:ContentBlock) {
    return $("div[data-block='" + contentBlock.id + "']")
  }

  var clearText = function (text:string) {
    return text.replace(/(\r\n|\n|\r)/gm,"")
  }

  beforeEach(function () {
    domService = new DomService()
    contentBlock = new ContentBlock(faker.random.number(), faker.lorem.paragraphs(), faker.address.streetAddress())
    $('<div>').attr('data-block', contentBlock.id).appendTo('body')
  })

  afterEach(function () {
    getDomContentBlock(contentBlock).remove()
  })

  it('can init the dom service', function () {
    expect(new DomService()).not.toBe(null)
  })

  it('can get a contentBlockHolder based on a contentBlock', function () {
    expect(domService.emptyContentBlock(contentBlock)).toBeDefined()
    expect(domService.emptyContentBlock(contentBlock).data('block')).toBe(contentBlock.id)
    expect(getDomContentBlock(contentBlock).children().length).toBe(0)
  })

  it('can draw a contentBlock if a contentBlockHolder exists', function () {
    expect(domService.emptyContentBlock(contentBlock).hasClass('content-block')).toBe(true)
    domService.drawContentBlock(contentBlock);

    var domContentBlock = getDomContentBlock(contentBlock)

    expect(domContentBlock.hasClass('content-block')).toBe(true)
    expect(domContentBlock.find('.toolbar').is('div')).toBe(true)
    expect(domContentBlock.find('a').hasClass('edit')).toBe(true)
    expect(domContentBlock.find('a').text()).toBe('edit')
    expect(domContentBlock.find('.content').is('div')).toBe(true)
    expect(clearText(domContentBlock.find('.content').html())).toEqual(clearText(contentBlock.content))
  })

  it('can make a drawn ContentBlock editable if a contentBlockHolder exists', function () {
    domService.drawContentBlock(contentBlock)
    domService.makeContentBlockEditable(contentBlock)

    var domContentBlock = getDomContentBlock(contentBlock)

    expect(domContentBlock.hasClass('content-block')).toBe(true)
    expect(domContentBlock.find('.toolbar').is('div')).toBe(true)
    expect(domContentBlock.find('a').hasClass('save')).toBe(true)
    expect(domContentBlock.find('a').text()).toBe('save')
    expect(domContentBlock.find('textarea').attr('id')).toBe('block_' + contentBlock.id)
    expect(clearText(domContentBlock.find('textarea').html())).toEqual(clearText(contentBlock.content))
  })
})
