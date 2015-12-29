///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="data_converter.ts"/>

describe('DataConverter', function () {
  const service = new DataConverter();
  const rawData1 = AjaxServiceMockData.existingContentBlock1();
  const rawData2 = AjaxServiceMockData.existingContentBlock2();
  const contentBlock1 = new ContentBlock('-', 'my-path', '-', '//some.host', null, null);
  const contentBlock2 = new ContentBlock('-', 'my-path2', '-', '//some.host', null, null);
  const nonExistingContentBlock = new ContentBlock('-', 'you-shall-not-pass', '-', '//some.host', null, null);

  it('loads a content block', function () {
    const block:ContentBlock = service.convertJson(contentBlock1, rawData1);

    expect(block.content).toBe('some content');
    expect(block.contentPath).toBe('my-path');
    expect(block.apiKey).toBe('api-key');
    expect(block.apiHost).toBe('//some.host');
    expect(block.createdAt).toEqual(new Date(2015, 11, 30));
    expect(block.updatedAt).toEqual(new Date(2015, 12, 3));
  });

  it('extracts the correct content block', function () {
    const block1:ContentBlock = service.convertJsonFromArray(contentBlock1, {content_blocks: [rawData1, rawData2]});
    expect(block1.content).toEqual('some content');
    const block2:ContentBlock = service.convertJsonFromArray(contentBlock2, {content_blocks: [rawData1, rawData2]});
    expect(block2.content).toEqual('some different content');
    const block3:ContentBlock = service.convertJsonFromArray(nonExistingContentBlock, {content_blocks: [rawData1, rawData2]});
    expect(block3).toBe(nonExistingContentBlock);
  });
});
