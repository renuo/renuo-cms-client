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
    element.src = this.thumborPath(this.event.publicUrl);
    return element;
  }

  private thumborPath(imageUrl:string) {
    const index = imageUrl.indexOf('/o/');
    if (index === -1) {
      return imageUrl;
    }
    const filePath = imageUrl.slice(index);
    const host = imageUrl.slice(0, index);
    return `https:${host}/t/x/u${filePath}`;
  }

  private anchorElement():HTMLAnchorElement {
    const element = document.createElement('a');
    element.href = this.event.publicUrl;
    element.innerText = this.event.cleanName;
    return element;
  }
}
