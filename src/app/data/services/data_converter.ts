///<reference path="../models/content_block.ts"/>
///<reference path="../models/ajax_content_blocks.ts"/>
///<reference path="../models/ajax_content_block.ts"/>

class DataConverter {
  convertJson(originalContentBlock:ContentBlock, cb:AjaxContentBlock):ContentBlock {
    return new ContentBlock(cb.content, cb.content_path, cb.api_key, originalContentBlock.apiHost,
      cb.created_at, cb.updated_at, originalContentBlock.defaultContent);
  }

  extractObjectFromHash(originalContentBlock:ContentBlock, rawAjaxArray:AjaxContentBlocksHash):ContentBlock {
    const rawData = rawAjaxArray[originalContentBlock.contentPath];
    return rawData ? this.convertJson(originalContentBlock, rawData) : originalContentBlock;
  }

  convertJsonObjectToHash(rawJsonObject:AjaxContentBlocks):AjaxContentBlocksHash {
    const hash:AjaxContentBlocksHash = {};

    return rawJsonObject.content_blocks.reduce((map, jsonContentBlock) => {
      map[jsonContentBlock.content_path] = jsonContentBlock;
      return map;
    }, hash);
  }
}
