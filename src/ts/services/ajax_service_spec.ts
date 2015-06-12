///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="ajax_service.ts"/>
///<reference path="../models/content_block.ts"/>

describe("AjaxService", function () {
  var ajaxService:AjaxService
  var baseUrl:string
  var urlWithParam:string
  var urlWithoutParam:string
  var mockData = {}

  beforeEach(function(){
    baseUrl = 'https://' + faker.internet.domainName() + '/'
    ajaxService = new AjaxService(baseUrl)
    mockData = {
      id: faker.random.number(),
      content: faker.lorem.paragraphs(),
      contentPath: faker.address.streetAddress()
    }
    urlWithParam = baseUrl + 'api/content_blocks.json'
    urlWithoutParam = baseUrl + 'api/content_blocks/' + mockData.id + '.json'
  })

  it("can be initialized", function () {
    expect(ajaxService).not.toBe(null)
  })

  it("has the correct url", function () {
    expect(ajaxService.url).toBe(baseUrl)
  })

  it("builds the correct url without parameter", function () {
    expect(ajaxService.getUrl()).toBe(urlWithParam)
  })

  it("builds the correct url with parameter", function () {
    expect(ajaxService.getUrl(mockData.id)).toBe(urlWithoutParam)
  })

  it("extracts the correct data of a content block", function () {
    var contentBlock = new ContentBlock(mockData.id, mockData.content, mockData.contentPath)
    var expectedResult = {
          content_block: {
            content: contentBlock.content,
            content_path: contentBlock.contentPath
          }
        }

    expect(ajaxService.getData(contentBlock)).toEqual(expectedResult)
  })

  it("can create a new GET request to receive all content blocks", function () {
    $.mockjax({
      url: urlWithParam,
      dataType: 'json',
      responseText: [mockData]
    })

    var callback = function (data) {
      expect(data[0].id).toBe(mockData.id)
      expect(data[0].content).toBe(mockData.content)
      expect(data[0].contentPath).toBe(mockData.contentPath)
    }

    spyOn($, 'ajax')

    ajaxService.selectContentBlocks(callback)

    expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET')
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(urlWithParam)
    expect($.ajax.calls.mostRecent().args[0].success).toEqual(callback)
  })

  it("can create a new GET request to receive one content block", function () {
    $.mockjax({
      url: urlWithoutParam,
      dataType: 'json',
      responseText: mockData
    })

    var callback = function (data) {
      expect(data.id).toBe(mockData.id)
      expect(data.content).toBe(mockData.content)
      expect(data.contentPath).toBe(mockData.contentPath)
    }

    spyOn($, 'ajax')

    ajaxService.selectContentBlock(mockData.id, callback)

    expect($.ajax.calls.mostRecent().args[0].type).toEqual('GET')
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(urlWithoutParam)
    expect($.ajax.calls.mostRecent().args[0].success).toEqual(callback)
  })

  it("can create a new POST request for creating a content block", function () {
    $.mockjax({
      url: urlWithParam
    })

    var callback = function (data) {
    }

    spyOn($, 'ajax')

    ajaxService.createContentBlock(new ContentBlock(mockData.id, mockData.content, mockData.contentPath), callback)

    expect($.ajax.calls.mostRecent().args[0].type).toEqual('POST')
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(urlWithParam)
    expect($.ajax.calls.mostRecent().args[0].success).toEqual(callback)
  })


  it("can create a new PUT request for updating a content block", function () {
    $.mockjax({
      url: urlWithoutParam
    })

    var callback = function (data) {
    }

    spyOn($, 'ajax')

    ajaxService.updateContentBlock(new ContentBlock(mockData.id, mockData.content, mockData.contentPath), callback)

    expect($.ajax.calls.mostRecent().args[0].type).toEqual('PUT')
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(urlWithoutParam)
    expect($.ajax.calls.mostRecent().args[0].success).toEqual(callback)
  })


  it("can create a new DELETE request for deleting a content block", function () {
    $.mockjax({
      url: urlWithoutParam
    })

    var callback = function (data) {
    }

    spyOn($, 'ajax')

    ajaxService.deleteContentBlock(new ContentBlock(mockData.id, mockData.content, mockData.contentPath), callback)

    expect($.ajax.calls.mostRecent().args[0].type).toEqual('DELETE')
    expect($.ajax.calls.mostRecent().args[0].url).toEqual(urlWithoutParam)
    expect($.ajax.calls.mostRecent().args[0].success).toEqual(callback)
  })
})
