class RenuoUploadCredentials {
  constructor(public apiKey:string, public signingUrl:string) {
  }

  hasCredentials():boolean {
    return this.apiKey !== null && this.apiKey.length > 0 && this.signingUrl !== null && this.signingUrl.length > 0;
  }
}
