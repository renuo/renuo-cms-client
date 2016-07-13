///<reference path="../models/content_block.ts"/>
///<reference path="ajax_content_blocks_hash_serializer.ts"/>

class LocalStorageService {
  static EXPIRATIONTIME:number = 1000 * 60 * 60; // 1h in ms
  private expiryDate:{[key:string]:number} = {};
  private serializer:AjaxContentBlocksHashSerializer = new AjaxContentBlocksHashSerializer();

  fetch(key:string):AjaxContentBlocksHash {
    if (this.isExpired(key)) {
      return {};
    }
    const result = this.serializer.parse(localStorage.getItem(key));
    return result ? result : {};
  }

  put(key:string, hash:AjaxContentBlocksHash) {
    try {
      localStorage.setItem(key, this.serializer.stringify(hash));
      this.setExpiryDate(key);
    } catch (error) {
      if( console && console.error) {
        console.error(error);
      }
    }
  }

  private isExpired(key:string) {
    return this.expiryDate[key] <= this.timestamp();
  }

  private setExpiryDate(key:string) {
    this.expiryDate[key] = this.timestamp() + LocalStorageService.EXPIRATIONTIME;
  }

  public timestamp():number {
    return Date.now();
  }
}
