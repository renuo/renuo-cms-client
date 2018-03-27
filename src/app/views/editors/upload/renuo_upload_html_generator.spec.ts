///<reference path="../../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="renuo_upload_html_generator.ts"/>

describe('RenuoUploadHtmlGenerator', function () {
  class RenuoUploadEventMock implements RenuoUploadEvent {
    constructor(public publicUrl:string, public extension:string, public cleanName:string) {
    }
  }

  // tslint:disable:no-inferrable-types
  function element(publicUrl:string, extension:string, cleanName:string = 'Some description') {
    // tslint:enable:no-inferrable-types
    const event = new RenuoUploadEventMock(publicUrl, extension, cleanName);
    return new RenuoUploadHtmlGenerator(event).generateElement();
  }

  describe('generate image', function () {
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
    });

    it('sets the source attribute for an image', function () {
      expect((element('//some.com/some.jpg', 'jpg') as HTMLImageElement).src).toEqual('http://some.com/some.jpg');
    });

    it('ignores upper and lower cases in file extensions', function () {
      expect(element('//something.com/some.JPG', 'JPG')).toEqual(jasmine.any(HTMLImageElement));
      expect(element('//something.com/some.Jpg', 'Jpg')).toEqual(jasmine.any(HTMLImageElement));
      expect(element('//something.com/some.JpG', 'JpG')).toEqual(jasmine.any(HTMLImageElement));
    });

    describe('thumborPath', () => {
      it('redirects renuo-upload links to thumbor', () => {
        const testElement:HTMLImageElement = element('//example.com/o/some.JPG', 'JPG') as HTMLImageElement;
        expect(testElement.src).toEqual('https://example.com/t/x/u/o/some.JPG');
      });

      it('does not redirect if is not renuo upload', () => {
        const testElement:HTMLImageElement = element('//example.com/some.JPG', 'JPG') as HTMLImageElement;
        expect(testElement.src).toEqual('http://example.com/some.JPG');
      });
    });
  });

  describe('generate other file', function () {
    it('converts everything but a file upload event to a link', function () {
      expect(element('//something.com/some.pdf', 'pdf')).toEqual(jasmine.any(HTMLAnchorElement));
      expect(element('//something.com/some.png', 'xlsx')).toEqual(jasmine.any(HTMLAnchorElement));
      expect(element('//something.com/some.gif', 'docx')).toEqual(jasmine.any(HTMLAnchorElement));
      expect(element('//something.com/some.gif', 'zip')).toEqual(jasmine.any(HTMLAnchorElement));
    });

    it('sets the source attribute for a file', function () {
      expect((element('//some.com/some.pdf', 'pdf') as HTMLAnchorElement).href).toEqual('http://some.com/some.pdf');
    });

    it('sets an inner text for a file', function () {
      expect((element('//some.com/some.pdf', 'pdf') as HTMLAnchorElement).innerText).toEqual('Some description');
    });

    it('ignores upper and lower cases in file extensions', function () {
      expect(element('//something.com/some.PdF', 'PdF')).toEqual(jasmine.any(HTMLAnchorElement));
    });

    it('does not redirect to renuo-upload-proxy if is not an image', () => {
      const testElement:HTMLAnchorElement = element('//example.com/o/some.pdf', 'pdf') as HTMLAnchorElement;
      expect(testElement.href).toEqual('http://example.com/o/some.pdf');
    });
  });
});
