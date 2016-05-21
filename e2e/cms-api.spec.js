"use strict";

describe('renuo cms api', function () {
  browser.ignoreSynchronization = true;

  beforeEach(function() {
    browser.get('http://localhost:8080/travis.html');
  });

  it('connects to the site and selects an element', function () {
    var el = element(by.css('[data-content-path="some/path/to/some/content"]'));
    expect(el.getAttribute('data-api-key')).toEqual('aValidApiKey');
  });

  it('loads some content', function () {
    var el = element(by.css('[data-content-path="a"]'));
    el.getText().then(function (text) {
      var newContent = text + 'x';
      expect(el.getText()).not.toEqual(newContent);
      el.click();
      browser.sleep(5000);
      el.sendKeys('x');
      expect(el.getText()).toEqual(newContent);
      var el2 = element(by.css('[data-content-path="even-more-content"]'));
      el2.click();
      browser.sleep(5000);

      browser.get('http://localhost:8080/travis.html?t=2');
      var newEl = element(by.css('[data-content-path="a"]'));
      expect(newEl.getText()).toEqual(newContent);
    });
  });
});
