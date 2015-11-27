///<reference path='../services/ajax_service.ts'/>
///<reference path='../services/dom_service.ts'/>

class DependencyInjectionContainer {
  objects = {}

  constructor() {
    this.objects[<any>AjaxService] = new AjaxService('url') // TODO: set per config class
    this.objects[<any>DomService] = new DomService()
  }

  get(className:any) {
    return this.objects[className]
  }
}
