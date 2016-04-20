///<reference path="../models/content_block.ts"/>
///<reference path="ajax_content_blocks_hash_serializer.ts"/>

class LocalStorageService {
  static EXPIRATIONTIME = 2592000000; //ms (30 days)
  private expiryDate:{[key: string]: number} = {};
  private serializer = new AjaxContentBlocksHashSerializer();

  fetch(key:string):AjaxContentBlocksHash {
    return this.serializer.parse(localStorage.getItem(key));
  }

  put(key:string, hash:AjaxContentBlocksHash) {
    if (this.isValid(key)) return;
    this.setExpiryDate(key);
    localStorage.setItem(key, this.serializer.stringify(hash));
  }

  private isValid(key:string) {
    return this.expiryDate[key] - this.timestamp() > 0;
  }

  private setExpiryDate(key:string) {
    this.expiryDate[key] = this.timestamp() + LocalStorageService.EXPIRATIONTIME;
  }

  private timestamp():number {
    return Date.now();
  }
}
