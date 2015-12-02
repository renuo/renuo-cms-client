class ContentBlockFinder {
  find():HTMLElement[] {
    const x = jQuery('[data-content-path]');
    return x.toArray();
  }
}
