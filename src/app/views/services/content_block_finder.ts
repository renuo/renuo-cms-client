class ContentBlockFinder {
  find():HTMLElement[] {
    return jQuery('[data-content-path]').toArray();
  }
}
