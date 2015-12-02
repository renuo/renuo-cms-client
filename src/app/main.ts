///<reference path="data/models/content_block.ts"/>
///<reference path="data/services/ajax_service.ts"/>
///<reference path="data/services/data_service.ts"/>
///<reference path="views/editors/ckeditor/ckeditor_loader.ts"/>
///<reference path="views/services/content_block_finder.ts"/>
///<reference path="views/services/dom_content_block_converter.ts"/>
///<reference path="views/drawers/content_block_drawer.ts"/>
///<reference path="controllers/views_controller.ts"/>

(function () {
  const initContentBlocks = function () {
    const controller = new ViewController(
      new ContentBlockFinder(),
      new DomContentBlockConverter(),
      new DataService(new AjaxService('//renuo-cms-api.dev:3000')),
      new ContentBlockDrawer()
    );
    controller.init();
  };
  jQuery(initContentBlocks);
  jQuery(document).on('renuo-cms-reload', initContentBlocks);
})();
