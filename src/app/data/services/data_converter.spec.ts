///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="data_converter.ts"/>

describe('DataConverter', function () {
  it('loads a content block', function () {
    const service = new DataConverter();
    const rawData = AjaxServiceMockData.existingContentBlock();
    const block:ContentBlock = service.convertJson(rawData);

    expect(block.content).toBe('some content');
    expect(block.contentPath).toBe('my-path');
    expect(block.apiKey).toBe('api-key');
    expect(block.createdAt).toEqual(new Date(2015, 11, 30));
    expect(block.updatedAt).toEqual(new Date(2015, 12, 3));
  });
});
