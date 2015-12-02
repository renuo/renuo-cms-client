class DataConverter {
  convertJson(rawData:any):ContentBlock {
    const cb = rawData.content_block;
    return new ContentBlock(cb.content, cb.content_path, cb.api_key, cb.created_at, cb.updated_at);
  }
}
