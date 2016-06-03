///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="../../mocks/ajax_service_mock_data.ts"/>
///<reference path="data_converter.ts"/>
///<reference path="../models/renuo_upload_credentials.ts"/>
///<reference path="../models/ajax_renuo_upload_credentials.ts"/>

describe('DataConverter', function () {
  const service = new DataConverter();
  const rawData1 = AjaxServiceMockData.existingContentBlock1();
  const rawData2 = AjaxServiceMockData.existingContentBlock2();
  const contentBlock1 = new ContentBlock('1', 'my-path', '-', '//some.host', null, null, '-1');
  const contentBlock2 = new ContentBlock('2', 'my-path2', '-', '//some.host', null, null, '-2');
  const nonExistingContentBlock = new ContentBlock('3', 'you-shall-not-pass', '-', '//some.host', null, null, '-3');

  it('loads a content block', function () {
    const block:ContentBlock = service.convertJson(contentBlock1, rawData1);

    expect(block.content).toBe('some content');
    expect(block.contentPath).toBe('my-path');
    expect(block.apiKey).toBe('api-key');
    expect(block.apiHost).toBe('//some.host');
    expect(block.createdAt).toEqual(new Date(2015, 11, 30));
    expect(block.updatedAt).toEqual(new Date(2015, 12, 3));
    expect(block.defaultContent).toEqual('-1');
  });

  it('extracts the correct content block', function () {
    const blocks:AjaxContentBlocksHash = {'my-path': rawData1, 'my-path2': rawData2};
    const block1:ContentBlock = service.extractObjectFromHash(contentBlock1, blocks);
    expect(block1.content).toEqual('some content');
    expect(block1.defaultContent).toEqual('-1');
    const block2:ContentBlock = service.extractObjectFromHash(contentBlock2, blocks);
    expect(block2.content).toEqual('some different content');
    expect(block2.defaultContent).toEqual('-2');
    const block3:ContentBlock = service.extractObjectFromHash(nonExistingContentBlock, blocks);
    expect(block3).toBe(nonExistingContentBlock);
    expect(block3.defaultContent).toEqual('-3');
  });

  it('converts the content blocks to hashes', function () {
    const blocks:AjaxContentBlocks = {content_blocks: [rawData1, rawData2]};
    const hash = service.convertJsonObjectToHash(blocks);
    expect(hash).toEqual({'my-path': rawData1, 'my-path2': rawData2});
  });

  it('converts the renuo upload credentials ajax response to an object', function () {
    const credentials:AjaxRenuoUploadCredentials = {renuo_upload_credentials: {api_key: 'some', signing_url: 'other'}};
    const object:RenuoUploadCredentials = service.convertJsonObjectToCredentials(credentials);
    expect(object.apiKey).toEqual('some');
    expect(object.signingUrl).toEqual('other');
  });
});
