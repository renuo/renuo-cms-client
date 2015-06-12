class DependencyInjectionContainer {
  objects = {}

  constructor() {
    this.objects[AjaxService] = new AjaxService('url') // TODO: set per config class
    this.objects[DomService] = new DomService()
  }

  get(className:any) {
    return this.objects[className]
  }
}
