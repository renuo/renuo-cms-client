///<reference path="../models/content_block.ts"/>
///<reference path="ajax_content_blocks_hash_serializer.ts"/>

class LocalStorageService {
  static EXPIRATIONTIME:number = 1000 * 60 * 60; // 1h in ms
  private expiryDate:{[key:string]:number} = {};
  private serializer:AjaxContentBlocksHashSerializer = new AjaxContentBlocksHashSerializer();

  fetch(key:string):AjaxContentBlocksHash {
    const result = this.serializer.parse(localStorage.getItem(key));
    return result ? result : {};
  }

  put(key:string, hash:AjaxContentBlocksHash) {
    if (this.skipStoring(key)) return;

    this.setExpiryDate(key);
    try {
      localStorage.setItem(key, this.serializer.stringify(hash));
    } catch (error) {
      if( console && console.error) {
        console.error(error);
      }
    }
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
