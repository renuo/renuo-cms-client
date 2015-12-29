///<reference path="../models/content_block.ts"/>
///<reference path="../models/ajax_content_blocks.ts"/>
///<reference path="../models/ajax_content_block.ts"/>

class DataConverter {
  convertJson(originalContentBlock:ContentBlock, cb:any):ContentBlock {
    return new ContentBlock(cb.content, cb.content_path, cb.api_key, originalContentBlock.apiHost,
      cb.created_at, cb.updated_at);
  }

  extractObjectFromHash(originalContentBlock:ContentBlock, rawAjaxArray:{[id: string]: AjaxContentBlock}):ContentBlock {
    const rawData = rawAjaxArray[originalContentBlock.contentPath];
    return rawData ? this.convertJson(originalContentBlock, rawData) : originalContentBlock;
  }

  convertJsonObjectToHash(rawJsonObject:AjaxContentBlocks):{[id: string]: AjaxContentBlock} {
    const hash:{[id: string]: AjaxContentBlock} = {};
    const rawJsonArray = rawJsonObject.content_blocks;

    return rawJsonArray.reduce(function (map, jsonContentBlock) {
      map[jsonContentBlock.content_path] = jsonContentBlock;
      return map;
    }, hash);
  }
}
