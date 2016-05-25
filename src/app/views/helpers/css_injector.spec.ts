///<reference path="../../../../typings/browser/ambient/jasmine/index.d.ts"/>
///<reference path="../../../../typings/browser/ambient/ckeditor/index.d.ts"/>
///<reference path="css_injector.ts"/>
///<reference path="../editors/upload/renuo_upload.d.ts"/>

describe('CSSInjector', function () {
  const injector = new CSSInjector();

  it('loads css files to the header', function () {
    const cssFileUrl = 'https://test.example';
    expect($('link[href="${cssFileUrl}"]').length).toEqual(0);
    injector.addCSSToHead(cssFileUrl);
    expect($(`link[href="${cssFileUrl}"]`).length).toEqual(1);
  });

  it('loads the dropzone css files', function () {
    const spy = spyOn(injector, 'addCSSToHead');
    injector.loadDropzoneCSS('4.3.0');
    expect(spy).toHaveBeenCalledWith('//cdn.jsdelivr.net/dropzone/4.3.0/basic.min.css');
    expect(spy).toHaveBeenCalledWith('//cdn.jsdelivr.net/dropzone/4.3.0/dropzone.min.css');
  });

  it('calls the load pending on the version given', function () {
    const spy = spyOn(injector, 'addCSSToHead');
    injector.loadDropzoneCSS('4.4.0');
    expect(spy).toHaveBeenCalledWith('//cdn.jsdelivr.net/dropzone/4.4.0/basic.min.css');
    expect(spy).toHaveBeenCalledWith('//cdn.jsdelivr.net/dropzone/4.4.0/dropzone.min.css');
  });
});
