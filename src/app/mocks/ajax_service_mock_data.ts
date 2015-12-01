class AjaxServiceMockData {
  public static newContentBlock() {
    return {
      content_block: {
        api_key: 'api-key',
        content_path: 'my-path',
        content: '',
        created_at: 0,
        updated_at: 0
      }
    };
  }

  public static existingContentBlock() {
    return {
      content_block: {
        api_key: 'api-key',
        content_path: 'my-path',
        content: 'some content',
        created_at: new Date(2015, 11, 30),
        updated_at: new Date(2015, 12, 3)
      }
    };
  }
}
