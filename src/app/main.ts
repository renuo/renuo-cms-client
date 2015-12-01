///<reference path="services/content_block_service.ts"/>
///<reference path="models/content_block.ts"/>
///<reference path="data_services/ajax_service.ts"/>

const service = new ContentBlockService(new AjaxService('http://renuo-cms-api.dev:3000'));
const content = service.loadContent('some-path', 'my-path');
content.then((x) => console.log(x));
