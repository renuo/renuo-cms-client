class RenuoUploadHtmlGenerator {
  constructor(private event:RenuoUploadEvent) {
  }

  generateElement():HTMLImageElement|HTMLLinkElement {
    // if (this.event.extension === 'jpg') return this.imageElement();
    if (this.isImage()) return this.imageElement();
    return null;
  }

  private isImage() {
    const imageExtensions = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'tiff', 'jp2', 'ico'];
      return imageExtensions.indexOf(this.event.extension) > -1;
  };

  private imageElement():HTMLImageElement {
    const element = new Image();
    return element;
  }
}
