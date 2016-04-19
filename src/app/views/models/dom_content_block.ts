class DomContentBlock {
  constructor(public element:HTMLElement, public contentBlock:ContentBlock, public privateApiKey:string,
              public renuoUploadCredentials:RenuoUploadCredentials) {
  }

  isEditable():boolean {
    return this.privateApiKey !== null;
  }

  hasRenuoUpload():boolean {
    return this.renuoUploadCredentials !== null;
  }
}
