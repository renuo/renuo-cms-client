///<reference path="../models/content_block.ts"/>

class LocalStorageService {
  fetch(key:string):AjaxContentBlocksHash {
    return JSON.parse(localStorage.getItem(key));
  }

  put(key:string, hash:AjaxContentBlocksHash) {
    localStorage.setItem(key, JSON.stringify(hash));
  }
}
