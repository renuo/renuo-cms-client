///<reference path="content_block_service.ts"/>
///<reference path="content_block.ts"/>
///<reference path="zblock.ts"/>

const service = new ContentBlockService();
var content = service.loadContent('some-path');
console.log(content);
var zblock = new Zblock()
