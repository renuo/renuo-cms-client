///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="content_block_drawer.ts"/>

describe('ContentBlockDrawer', function () {
  const drawer = new ContentBlockDrawer();

  it('draws simple text', function () {
    const element = jQuery('<div>')[0];
    const dom = new DomContentBlock(element, new ContentBlock('content', 'my-path', 'api-key', 'host'), null, null);
    drawer.draw(dom);
    expect(element.innerHTML).toBe('content');
  });

  it('draws more complex html', function () {
    const element = jQuery('<div>')[0];
    const dom = new DomContentBlock(element, new ContentBlock('<h1>Title</h1>', 'my-path', 'api-key', 'host'), null, null);
    drawer.draw(dom);
    expect(element.innerHTML).toBe('<h1>Title</h1>');
  });

  it('draws the default content when the content block is new', function () {
    const element = jQuery('<div><strong>Here</strong> is some default content</div>')[0];
    const dom = new DomContentBlock(element, new ContentBlock('', 'my-path', 'api-key', 'host'), null, null);
    drawer.draw(dom);
    expect(element.innerHTML).toBe('<strong>Here</strong> is some default content');
  });

  it('draws the empty content when the content block is not new but empty', function () {
    const element = jQuery('<div><strong>Here</strong> is some default content</div>')[0];
    const contentBlock = new ContentBlock('', 'my-path', 'api-key', 'host', new Date(2015, 1, 1), new Date(2015, 1, 1));
    const dom = new DomContentBlock(element, contentBlock, null, null);
    drawer.draw(dom);
    expect(element.innerHTML).toBe('');
  });

  it('sets the version', function () {
    const element = jQuery('<div>')[0];
    const contentBlock = new ContentBlock('', 'my-path', 'api-key', 'host', new Date(2015, 1, 1), new Date(2015, 1, 1),
      null, 44);
    const dom = new DomContentBlock(element, contentBlock, null, null);
    drawer.draw(dom);
    expect(element.attributes.getNamedItem(`data-version`).value).toBe('44');
  });

  it('does not set a version if not available', function () {
    const element = jQuery('<div>')[0];
    const contentBlock = new ContentBlock('', 'my-path', 'api-key', 'host', new Date(2015, 1, 1), new Date(2015, 1, 1));
    const dom = new DomContentBlock(element, contentBlock, null, null);
    drawer.draw(dom);
    expect(element.attributes.getNamedItem(`data-version`)).toBe(null);
  });

  describe('#update', function () {
    it('updates the dom element if a version is provided', function () {
      const element = jQuery('<div>')[0];
      const contentBlock = {version: 38} as ContentBlock;
      const dom = new DomContentBlock(element, contentBlock, null, null);
      const data = {content_block: {} as AjaxContentBlock};
      data.content_block.version = 39;
      drawer.update(dom, data);
      expect(contentBlock.version).toBe(39);
      expect(element.attributes.getNamedItem(`data-version`).value).toBe('39');
    });

    it('does not fail if no version is provided', function () {
      const dom = {} as DomContentBlock;
      const data = {content_block: {} as AjaxContentBlock};
      drawer.update(dom, data);
    });
  });
});
