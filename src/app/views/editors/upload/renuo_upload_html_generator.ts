class RenuoUploadHtmlGenerator {
  constructor(private event:RenuoUploadEvent) {
  }

  generateElement():HTMLImageElement|HTMLAnchorElement {
    if (this.isImage()) return this.imageElement();
    return  this.anchorElement();
  }

  private isImage() {
    const imageExtensions = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'tiff', 'jp2', 'ico'];
      return imageExtensions.indexOf(this.event.extension) > -1;
  };

  private imageElement():HTMLImageElement {
    const element = document.createElement('img');
    element.setAttribute('src', this.event.publicUrl);
    return element;
  }

  private anchorElement():HTMLAnchorElement {
    const element = document.createElement('a');
    element.setAttribute('src', this.event.publicUrl);
    element.innerHTML = 'Link to File';
    return element;
  }
}
