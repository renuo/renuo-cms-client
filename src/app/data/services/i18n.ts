class I18n {
  private static translations:{[key:string]:string} = {
    'cms.edit.message.conflict': 'Could not save the content. A newer Version already exists on the server.'
  };

  static t(key:string):string {
    return I18n.translations[key];
  }
}
