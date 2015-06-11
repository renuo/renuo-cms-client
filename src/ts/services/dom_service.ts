///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../models/content_block.ts"/>

class DomService {

  public emptyContentBlock(contentBlock:ContentBlock):JQuery {
    return jQuery("div[data-block='" + contentBlock.id + "']").empty().addClass('content-block')
  }

  public drawContentBlock(contentBlock:ContentBlock) {
    var contentBlockHolder = this.emptyContentBlock(contentBlock)
    if (contentBlockHolder.length > 0) {
      contentBlockHolder.append(jQuery('<div>').addClass('toolbar').append($('<a>').addClass('edit').text('edit')))
      contentBlockHolder.append(jQuery('<div>').addClass('content').html(contentBlock.content))
    }
  }

  public makeContentBlockEditable(contentBlock:ContentBlock) {
    var contentBlockHolder = this.emptyContentBlock(contentBlock)
    if (contentBlockHolder.length > 0) {
      contentBlockHolder.append($('<div>').addClass('toolbar').append($('<a>').addClass('save').text('save')))
      contentBlockHolder.append($('<textarea>').attr('id', 'block_' + contentBlock.id).html(contentBlock.content))
    }
  }
}
