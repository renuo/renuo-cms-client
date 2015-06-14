///<reference path='../../../typings/tsd.d.ts'/>
///<reference path='content_block.ts'/>
declare var faker

describe('ContentBlock', function () {
  var contentBlock:ContentBlock
  var mockData = {}

  beforeEach(function() {
    mockData = { id: faker.random.number(), content: faker.lorem.paragraphs(),
      contentPath: faker.address.streetAddress() }
    contentBlock = new ContentBlock((<any>mockData).id, (<any>mockData).content, (<any>mockData).contentPath)
  })

  it('can be initialized', function () {
    expect(contentBlock).not.toBe(null)
  })

  it('has the correct id', function () {
    expect(contentBlock.id).toBe((<any>mockData).id)
  })

  it('has the correct content', function () {
    expect(contentBlock.content).toBe((<any>mockData).content)
  })

  it('has the correct content path', function () {
    expect(contentBlock.contentPath).toBe((<any>mockData).contentPath)
  })
})
