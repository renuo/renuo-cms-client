class I18n {
  private static translations:{[key:string]:string} = {
    'cms.edit.message.conflict': 'Could not save the content. A newer Version already exists on the server.',
    'cms.edit.message.unauthorized': 'Could not save the content. You are not authorized to change it.',
    'cms.edit.message.no-connection': 'Could not save the content. No connection to the server.'
  };

  static t(key:string):string {
    return I18n.translations[key];
  }
}
