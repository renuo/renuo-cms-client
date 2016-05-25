///<reference path="../models/content_block.ts"/>
///<reference path="ajax_content_blocks_hash_serializer.ts"/>

class LocalStorageService {
  static EXPIRATIONTIME = 1000 * 60 * 60; // 1h in ms
  private expiryDate:{[key: string]: number} = {};
  private serializer = new AjaxContentBlocksHashSerializer();

  fetch(key:string):AjaxContentBlocksHash {
    return this.serializer.parse(localStorage.getItem(key));
  }

  put(key:string, hash:AjaxContentBlocksHash) {
    if (this.skipStoring(key)) return;

    this.setExpiryDate(key);
    localStorage.setItem(key, this.serializer.stringify(hash));
  }

  private skipStoring(key:string) {
    return this.expiryDate[key] - this.timestamp() > 0;
  }

  private setExpiryDate(key:string) {
    this.expiryDate[key] = this.timestamp() + LocalStorageService.EXPIRATIONTIME;
  }

  private timestamp():number {
    return Date.now();
  }
}
