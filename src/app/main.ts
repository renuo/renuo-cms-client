///<reference path="data/models/content_block.ts"/>
///<reference path="data/services/ajax_service.ts"/>
///<reference path="data/services/data_service.ts"/>

const service = new DataService(new AjaxService('http://renuo-cms-api.dev:3000'));
const content = service.loadContent(new ContentBlock('', 'some-path', 'my-path'));
content.then((x) => console.log(x));
