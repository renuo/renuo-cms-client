///<reference path="../../../../typings/globals/jquery/index.d.ts"/>
///<reference path="../editors/editor_loader.ts"/>

class CSSInjector {
  addCSSToHead(url:string):void {
    jQuery('<link>', {rel: 'stylesheet', type: 'text/css', 'href': url}).appendTo('head');
  }

  loadDropzoneCSS(dropzoneVersion:string):void {
    this.addCSSToHead(`//cdn.jsdelivr.net/dropzone/${dropzoneVersion}/basic.min.css`);
    this.addCSSToHead(`//cdn.jsdelivr.net/dropzone/${dropzoneVersion}/dropzone.min.css`);
  }
}
