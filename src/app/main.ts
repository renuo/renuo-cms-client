///<reference path="data/models/content_block.ts"/>
///<reference path="data/services/ajax_service.ts"/>
///<reference path="data/services/data_service.ts"/>
///<reference path="views/editors/ckeditor/ckeditor_loader.ts"/>
///<reference path="views/services/content_block_finder.ts"/>
///<reference path="views/services/dom_content_block_converter.ts"/>
///<reference path="views/drawers/content_block_drawer.ts"/>
///<reference path="controllers/view_controller.ts"/>
///<reference path="views/editors/ckeditor/ckeditor_preparer.ts"/>
///<reference path="controllers/edit_controller.ts"/>
///<reference path="views/helpers/script_loader.ts"/>
///<reference path="views/helpers/css_injector.ts"/>

(function () {
  const initContentBlocks = function () {
    const dataService = new DataService(new AjaxService());
    const scriptLoader = new ScriptLoader();
    const cssInjector = new CSSInjector();
    const controller = new ViewController(
      new ContentBlockFinder(),
      new DomContentBlockConverter(),
      dataService,
      new ContentBlockDrawer(),
      new EditController(
        dataService,
        new CkeditorLoader(scriptLoader),
        new UploadLoader(scriptLoader, cssInjector),
        new CkeditorPreparer(),
        new ContentBlockDrawer()
      )
    );
    controller.init();

    jQuery(document).on('renuo-cms-reload', function () {
      controller.init();
    });
  };
  jQuery(initContentBlocks);
})();
