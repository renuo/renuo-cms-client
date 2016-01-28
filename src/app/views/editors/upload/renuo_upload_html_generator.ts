class RenuoUploadHtmlGenerator {
  constructor(private event:RenuoUploadEvent) {
  }

  generateElement():HTMLImageElement|HTMLAnchorElement {
    if (this.isImage()) return this.imageElement();
    return this.anchorElement();
  }

  private isImage() {
    const imageExtensions = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'tiff', 'jp2', 'ico'];
    return imageExtensions.indexOf(this.event.extension.toLowerCase()) > -1;
  };

  private imageElement():HTMLImageElement {
    const element = new Image();
    element.src = this.event.publicUrl;
    return element;
  }

  private anchorElement():HTMLAnchorElement {
    const element = document.createElement('a');
    element.href = this.event.publicUrl;
    element.innerText = this.event.cleanName;
    return element;
  }
}
