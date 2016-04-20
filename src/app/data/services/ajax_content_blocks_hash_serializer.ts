///<reference path="../models/ajax_content_blocks_hash.ts"/>

class AjaxContentBlocksHashSerializer {
  stringify(hash:AjaxContentBlocksHash):string {
    return JSON.stringify(hash);
  }

  parse(hash:string):AjaxContentBlocksHash {
    const parsedHash = JSON.parse(hash);

    for (const key in parsedHash) {
      if (parsedHash.hasOwnProperty(key)) {
        parsedHash[key].created_at = new Date(parsedHash[key].created_at);
        parsedHash[key].updated_at = new Date(parsedHash[key].updated_at);
      }
    }
    return <AjaxContentBlocksHash>parsedHash;
  }
}
