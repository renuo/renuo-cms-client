///<reference path="data/models/content_block.ts"/>
///<reference path="data/services/ajax_service.ts"/>
///<reference path="data/services/data_service.ts"/>
///<reference path="views/editors/ckeditor/ckeditor_loader.ts"/>

jQuery(function () {
  const service = new DataService(new AjaxService('//renuo-cms-api.dev:3000'));
  const content = service.loadContent(new ContentBlock('', 'some-path', 'my-path'));
  let c = console;
  content.then((x) => c.log(x));
  const loader = new CkeditorLoader();
  loader.loadEditor().then(() => c.log(CKEDITOR.version));
});
