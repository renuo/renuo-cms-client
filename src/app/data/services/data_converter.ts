///<reference path="../models/content_block.ts"/>

class DataConverter {
  convertJson(originalContentBlock:ContentBlock, rawData:any):ContentBlock {
    const cb = rawData.content_block;
    return new ContentBlock(cb.content, cb.content_path, cb.api_key, originalContentBlock.apiHost,
      cb.created_at, cb.updated_at);
  }
}
