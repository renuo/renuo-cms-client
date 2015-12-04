///<reference path="../../../../typings/tsd.d.ts"/>

class DomContentBlock {
  constructor(public element:HTMLElement, public contentBlock:ContentBlock, public privateApiKey:string) {
  }

  isEditable():boolean {
    return this.privateApiKey !== null;
  }
}
