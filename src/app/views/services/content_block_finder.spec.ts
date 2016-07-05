///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="content_block_finder.ts"/>

describe('ContentBlockFinder', function () {
  const finder = new ContentBlockFinder();
  let testDiv:JQuery;

  beforeEach(function () {
    testDiv = jQuery('<div></div>');
    jQuery('body').append(testDiv);
  });

  afterEach(function () {
    testDiv.remove();
  });

  it('finds a single content block', function () {
    testDiv.append('<div data-content-path="my-path" data-api-key="my-key"></div>');
    const elements:HTMLElement[] = finder.find();
    expect(elements.length).toBe(1);
    expect(elements[0].attributes.getNamedItem('data-content-path').value).toBe('my-path');
    expect(elements[0].attributes.getNamedItem('data-api-key').value).toBe('my-key');
  });

  it('finds multiple content blocks', function () {
    testDiv.append('<div data-content-path="my-path" data-api-key="my-key"></div>')
      .append('<div data-content-path="other-path" data-api-key="my-key"></div>')
      .append('<div data-content-path="xxx-path" data-api-key="my-key"></div>');
    const elements:HTMLElement[] = finder.find();
    expect(elements.length).toBe(3);
    const pairs = elements.map((x) => x.attributes).map((x) =>
      [x.getNamedItem('data-content-path').value, x.getNamedItem('data-api-key').value]);
    expect(pairs).toContain(['my-path', 'my-key']);
    expect(pairs).toContain(['other-path', 'my-key']);
    expect(pairs).toContain(['xxx-path', 'my-key']);
  });

  it('finds given content block', function () {
    testDiv.append('<div data-content-path="my-path" data-api-key="my-key"></div>')
      .append('<div data-content-path="other-path" data-api-key="my-key"></div>')
      .append('<div data-content-path="xxx-path" data-api-key="my-key"></div>');
    const elements:HTMLElement[] = finder.find_by('other-path');
    expect(elements.length).toBe(1);
    expect(elements[0].attributes.getNamedItem('data-content-path').value).toBe('other-path');
    expect(elements[0].attributes.getNamedItem('data-api-key').value).toBe('my-key');
  });
});
