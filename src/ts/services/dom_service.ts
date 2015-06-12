///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../models/content_block.ts"/>

class DomService {

  public emptyContentBlock(contentBlock:ContentBlock):JQuery {
    return jQuery("div[data-block='" + contentBlock.id + "']").empty().addClass('content-block')
  }

  public drawContentBlock(contentBlock:ContentBlock) {
    var contentBlockHolder = this.emptyContentBlock(contentBlock)
    contentBlockHolder.append(jQuery('<div>').addClass('toolbar').append(jQuery('<a>').addClass('edit').text('edit')))
    contentBlockHolder.append(jQuery('<div>').addClass('content').html(contentBlock.content))
  }

  public makeContentBlockEditable(contentBlock:ContentBlock) {
    var contentBlockHolder = this.emptyContentBlock(contentBlock)
    contentBlockHolder.append(jQuery('<div>').addClass('toolbar').append(jQuery('<a>').addClass('save').text('save')))
    contentBlockHolder.append(jQuery('<textarea>').attr('id', 'block_' + contentBlock.id).html(contentBlock.content))
  }

  // TODO: Test
  public addEditEventListener(contentBlock:ContentBlock, callback:any) {
    jQuery("div[data-block='" + contentBlock.id + "'] .edit").on('click', function () {
      callback(contentBlock)
    })
  }

  public addSaveEventListener(contentBlock:ContentBlock, callback:any) {
    jQuery("div[data-block='" + contentBlock.id + "'] .save").on('click', function () {
      contentBlock.content = jQuery(this).find('.content').html()
      callback(contentBlock)
    })
  }
}
