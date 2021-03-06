///<reference path="../data/models/ajax_content_block.ts"/>
///<reference path="../data/models/ajax_renuo_upload_credentials.ts"/>

class AjaxServiceMockData {
  public static newContentBlock():AjaxContentBlock {
    return {
      api_key: 'api-key',
      content_path: 'my-path',
      content: '',
      created_at: new Date(0),
      updated_at: new Date(0),
      version: null
    };
  }

  public static existingContentBlock1():AjaxContentBlock {
    return {
      api_key: 'api-key',
      content_path: 'my-path',
      content: 'some content',
      created_at: new Date(2015, 11, 30),
      updated_at: new Date(2015, 12, 3),
      version: 10
    };
  }

  public static existingContentBlock2():AjaxContentBlock {
    return {
      api_key: 'api-key',
      content_path: 'my-path2',
      content: 'some different content',
      created_at: new Date(2015, 11, 30),
      updated_at: new Date(2015, 12, 3),
      version: 20
    };
  }

  public static existingRenuoUploadCredentials():AjaxRenuoUploadCredentials {
    return {
      renuo_upload_credentials: {
        api_key: 'uploadKey',
        signing_url: 'http://some.thing'}
    };
  }

  public static existingContentBlocksHash1():AjaxContentBlocksHash {
    return {
      'my-path': AjaxServiceMockData.existingContentBlock1(),
      'my-path2': AjaxServiceMockData.existingContentBlock2()
    };
  }

  public static existingContentBlocksHash2():AjaxContentBlocksHash {
    return {
      'my-path3': AjaxServiceMockData.existingContentBlock2(),
      'my-path4': AjaxServiceMockData.existingContentBlock1()
    };
  }
}
