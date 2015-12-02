class ContentBlockDrawer {
  draw(dom:DomContentBlock) {
    dom.element.innerHTML = dom.contentBlock.content;
  }
}
