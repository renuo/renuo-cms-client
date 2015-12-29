///<reference path="../models/content_block.ts"/>

class DataConverter {
  convertJson(originalContentBlock:ContentBlock, cb:any):ContentBlock {
    return new ContentBlock(cb.content, cb.content_path, cb.api_key, originalContentBlock.apiHost,
      cb.created_at, cb.updated_at);
  }

  convertJsonFromArray(originalContentBlock:ContentBlock, rawAjaxArray:any):ContentBlock {
    const rawDataArray:any[] = rawAjaxArray.content_blocks;
    const rawData = rawDataArray.filter((cb) => cb.content_path === originalContentBlock.contentPath)[0];
    return rawData ? this.convertJson(originalContentBlock, rawData) : originalContentBlock;
  }
}
