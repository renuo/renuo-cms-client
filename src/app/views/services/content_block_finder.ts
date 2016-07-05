class ContentBlockFinder {
  find():HTMLElement[] {
    return jQuery('[data-content-path]').toArray();
  }

  find_by(contentPath:String):HTMLElement[] {
    return jQuery("[data-content-path='" + contentPath + "']").toArray();
  }
}
