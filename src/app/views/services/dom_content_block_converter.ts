///<reference path="../models/dom_content_block.ts"/>

class DomContentBlockConverter {
  convert(element:HTMLElement):DomContentBlock {
    const contentPath = this.valueOf(element, 'content-path');
    const apiKey = this.valueOf(element, 'api-key');
    const apiHost = this.valueOf(element, 'api-host');
    const privateApiKey = this.extractPrivateApiKey(element);
    return new DomContentBlock(element, new ContentBlock(null, contentPath, apiKey, apiHost), privateApiKey);
  }

  private extractPrivateApiKey(element:HTMLElement):string {
    const privateApiKey = this.valueOf(element, 'private-api-key');
    return privateApiKey === '' ? null : privateApiKey;
  };

  private valueOf(element:HTMLElement, attributeName:string):string {
    const attr = element.attributes.getNamedItem(`data-${attributeName}`);
    return attr === null ? null : attr.value;
  };

  createNewBlock(domContentBlock:DomContentBlock, existingBlock:ContentBlock):DomContentBlock {
    return new DomContentBlock(domContentBlock.element, existingBlock, domContentBlock.privateApiKey);
  }
}
