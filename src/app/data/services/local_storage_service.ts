///<reference path="../models/content_block.ts"/>

class LocalStorageService {
  static EXPIRATIONTIME = 5; //minutes
  private expiryDate:{[key: string]: Date} = {};

  fetch(key:string):AjaxContentBlocksHash {
    return JSON.parse(localStorage.getItem(key));
  }

  put(key:string, hash:AjaxContentBlocksHash) {
    if (this.isValid(key)) return;
    this.setExpiryDate(key);
    localStorage.setItem(key, JSON.stringify(hash));
  }

  private isValid(key: string) {
    return this.expiryDate[key] - Date.now() > 0;
  }

  private setExpiryDate(key: string) {
    const expiryDate = new Date;
    expiryDate.setMinutes ( expiryDate.getMinutes() + LocalStorageService.EXPIRATIONTIME );
    this.expiryDate[key] = expiryDate;
  }
}
