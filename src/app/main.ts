///<reference path="services/content_block_service.ts"/>
///<reference path="models/content_block.ts"/>

const service = new ContentBlockService();
const content = service.loadContent('some-path');
