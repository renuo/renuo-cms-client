class ContentBlockDrawer {
  draw(dom:DomContentBlock) {
    if (dom.contentBlock.content === '' && dom.contentBlock.isNew()) return;

    dom.element.innerHTML = dom.contentBlock.content;

    const version = dom.contentBlock.version;
    if (version) {
      const dataAttribute = document.createAttribute('data-version');
      dataAttribute.value = version.toString();
      dom.element.attributes.setNamedItem(dataAttribute);
    }
  }

  update(dom:DomContentBlock, data:{content_block:AjaxContentBlock}) {
    const version = data.content_block.version;
    if (version) {
      const dataAttribute = document.createAttribute('data-version');
      dataAttribute.value = version.toString();
      dom.element.attributes.setNamedItem(dataAttribute);
      dom.contentBlock.version = version;
    }
  }
}
