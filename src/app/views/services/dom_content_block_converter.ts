///<reference path="../models/dom_content_block.ts"/>
///<reference path="../../data/models/editable_content_block.ts"/>

class DomContentBlockConverter {
  convert(element:HTMLElement):DomContentBlock {
    const contentPath = this.valueOf(element, 'content-path');
    const apiKey = this.valueOf(element, 'api-key');
    const apiHost = this.valueOf(element, 'api-host');
    const privateApiKey = this.extractPrivateApiKey(element);
    const defaultContent = this.extractDefaultContent(element);
    const contentBlock = new ContentBlock('', contentPath, apiKey, apiHost, null, null, defaultContent);
    return new DomContentBlock(element, contentBlock, privateApiKey, null);
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
    return new DomContentBlock(domContentBlock.element, existingBlock, domContentBlock.privateApiKey, null);
  }

  createNewEditableBlock(domContentBlock:DomContentBlock, existingBlock:EditableContentBlock):DomContentBlock {
    return new DomContentBlock(domContentBlock.element, existingBlock.contentBlock, domContentBlock.privateApiKey,
      existingBlock.renuoUploadCredentials);
  }

  private extractDefaultContent(element:HTMLElement):string {
    return element.innerHTML;
  }
}
