///<reference path="../../../../typings/browser/ambient/jquery/index.d.ts"/>
///<reference path="../editors/editor_loader.ts"/>

class CSSInjector {
  addCSSToHead(url:string): void {
    jQuery('<link>', {rel: 'stylesheet', type: 'text/css', 'href': url}).appendTo('head');
  }

  loadDropzoneCSS(): void {
    this.addCSSToHead('//cdn.jsdelivr.net/dropzone/4.3.0/basic.min.css');
    this.addCSSToHead('//cdn.jsdelivr.net/dropzone/4.3.0/dropzone.min.css');
  }
}
