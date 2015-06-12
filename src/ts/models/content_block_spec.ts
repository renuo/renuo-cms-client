///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="content_block.ts"/>

describe("ContentBlock", function () {
  var contentBlock:ContentBlock
  var mockData = {}

  beforeEach(function() {
    mockData = { id: faker.random.number(), content: faker.lorem.paragraphs(),
      contentPath: faker.address.streetAddress() }
    contentBlock = new ContentBlock(mockData.id, mockData.content, mockData.contentPath)
  })

  it("can be initialized", function () {
    expect(contentBlock).not.toBe(null)
  })

  it("has the correct id", function () {
    expect(contentBlock.id).toBe(mockData.id)
  })

  it("has the correct content", function () {
    expect(contentBlock.content).toBe(mockData.content)
  })

  it("has the correct content path", function () {
    expect(contentBlock.contentPath).toBe(mockData.contentPath)
  })
})
