///<reference path="../../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="renuo_upload_html_generator.ts"/>

describe('RenuoUploadHtmlGenerator', function () {
  class RenuoUploadEventMock implements RenuoUploadEvent {
    constructor(public publicUrl:string, public extension:string) {
    }
  }

  function element(publicUrl:string, extension:string) {
    const event = new RenuoUploadEventMock(publicUrl, extension);
    return new RenuoUploadHtmlGenerator(event).generateElement();
  }

  it('converts an image upload event to an image', function () {
    expect(element('//something.com/some.jpg', 'jpg')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.png', 'png')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.gif', 'gif')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.jpeg', 'jpeg')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.bmp', 'bmp')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.tiff', 'tiff')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.jp2', 'jp2')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.ico', 'ico')).toEqual(jasmine.any(HTMLImageElement));
    expect(element('//something.com/some.zip', 'zip')).not.toEqual(jasmine.any(HTMLImageElement));
    //expect(element('//something.com/some.jpeg', 'jpeg')).toEqual(jasmine.any(HTMLImageElement));
  });

  it('converts everything but an image upload event to a link', function () {
    expect(element('//something.com/some.pdf', 'pdf')).toEqual(jasmine.any(HTMLAnchorElement));
    expect(element('//something.com/some.png', 'xlsx')).toEqual(jasmine.any(HTMLAnchorElement));
    expect(element('//something.com/some.gif', 'docx')).toEqual(jasmine.any(HTMLAnchorElement));
    expect(element('//something.com/some.gif', 'zip')).toEqual(jasmine.any(HTMLAnchorElement));
  });
});
