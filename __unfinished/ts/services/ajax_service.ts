///<reference path='../../../typings/tsd.d.ts'/>
///<reference path='../models/content_block.ts'/>

class AjaxService {
  url:string

  constructor(url:string) {
    this.url = url
  }

  selectContentBlocks(callback:any) {
    jQuery.ajax({
      type: 'GET',
      url: this.getUrl(),
      success: callback
    })
  }

  selectContentBlock(id:number, callback:any) {
    jQuery.ajax({
      type: 'GET',
      url: this.getUrl(id),
      success: callback
    })
  }

  createContentBlock(contentBlock:ContentBlock, callback:any) {
    jQuery.ajax({
      type: 'POST',
      url: this.getUrl(),
      success: callback,
      data: this.getData(contentBlock),
      dataType: 'json'
    })
  }

  updateContentBlock(contentBlock:ContentBlock, callback:any) {
    jQuery.ajax({
      type: 'PUT',
      url: this.getUrl(contentBlock.id),
      success: callback,
      data: this.getData(contentBlock),
      dataType: 'json'
    })
  }

  deleteContentBlock(contentBlock:ContentBlock, callback:any) {
    jQuery.ajax({
      type: 'DELETE',
      url: this.getUrl(contentBlock.id),
      success: callback
    })
  }

  getUrl(id?:number) {
    var url = this.url + 'api/content_blocks'
    if(typeof id === 'number') { url += '/' + id }
    url += '.json'
    return url
  }

  getData(contentBlock:ContentBlock) {
    var data = {
      content_block: {
        content: contentBlock.content,
        content_path: contentBlock.contentPath
      }
    }
    return data
  }
}
