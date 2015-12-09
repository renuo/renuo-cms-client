class ContentBlockDrawer {
  draw(dom:DomContentBlock) {
    if (dom.contentBlock.content === '' && dom.contentBlock.isNew()) return;

    dom.element.innerHTML = dom.contentBlock.content;
  }
}
