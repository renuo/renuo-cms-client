class I18n {
  private static translations:{[key:string]:string} = {
    'cms.edit.message.conflict': 'Could not save the content. A newer Version already exists on the server.',
    'cms.edit.message.unauthorized': 'You are not authorized to change the content of this block.',
    'cms.edit.message.no-connection': 'No connection to the server. Either you are offline or the server is down.'
  };

  static t(key:string):string {
    return I18n.translations[key];
  }
}
