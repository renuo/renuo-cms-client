///<reference path="../../../../typings/jasmine/jasmine.d.ts"/>
///<reference path="content_block_drawer.ts"/>

describe('ContentBlockDrawer', function () {
  const drawer = new ContentBlockDrawer();

  it('draws simple text', function () {
    const element = jQuery('<div>')[0];
    const dom = new DomContentBlock(element, new ContentBlock('content', 'my-path', 'api-key'));
    drawer.draw(dom);
    expect(element.innerHTML).toBe('content');
  });

  it('draws more complex html', function () {
    const element = jQuery('<div>')[0];
    const dom = new DomContentBlock(element, new ContentBlock('<h1>Title</h1>', 'my-path', 'api-key'));
    drawer.draw(dom);
    expect(element.innerHTML).toBe('<h1>Title</h1>');
  });
});
