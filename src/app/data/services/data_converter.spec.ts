///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="data_converter.ts"/>

describe('DataConverter', function () {
  it('loads a content block', function () {
    const service = new DataConverter();
    const rawData = AjaxServiceMockData.existingContentBlock();
    const contentBlock = new ContentBlock('-', '-', '-', '//some.host', null, null);
    const block:ContentBlock = service.convertJson(contentBlock, rawData);

    expect(block.content).toBe('some content');
    expect(block.contentPath).toBe('my-path');
    expect(block.apiKey).toBe('api-key');
    expect(block.apiHost).toBe('//some.host');
    expect(block.createdAt).toEqual(new Date(2015, 11, 30));
    expect(block.updatedAt).toEqual(new Date(2015, 12, 3));
  });
});
