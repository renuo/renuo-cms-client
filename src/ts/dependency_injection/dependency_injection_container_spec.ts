///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="dependency_injection_container.ts"/>

// TODO: look if a better way exists to test it
describe("DependencyInjectionContainer", function () {
  var dic:DependencyInjectionContainer

  beforeEach(function() {
    dic = new DependencyInjectionContainer()
  })

  it("can be initialized", function () {
    expect(dic).not.toBe(null)
  })

  it("initialize the AjaxService", function () {
    expect(dic.objects[AjaxService]).toBeDefined()
  })

  it("initialize the DomService", function () {
    expect(dic.objects[DomService]).toBeDefined()
  })

  it("can get back the right service", function () {
    expect(dic.get(AjaxService)).toBeDefined()
    expect(dic.get(DomService)).toBeDefined()
  })
})
