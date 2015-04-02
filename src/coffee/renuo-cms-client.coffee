getApiKey = ->
  'Token token=772a91a136caa729fb8e09277c05310e'

getAllContentBlocks = ->
  $.ajax
    type: 'GET'
    url: 'http://localhost:3000/api/content_blocks.json'
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'Authorization', getApiKey()
      return
    dataType: 'json'
    success: (data) ->
      console.log data
      return
  return

getContentBlock = (id) ->
  $.ajax
    type: 'GET'
    url: 'http://localhost:3000/api/content_blocks/' + id + '.json'
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'Authorization', getApiKey()
      return
    dataType: 'json'
    success: (data) ->
      console.log data
      return
  return

drawContentBlock = (contentBlock) ->
  $('div[data-block=\'' + contentBlock.id + '\']').replaceWith '<div data-block=\'' + contentBlock.id + '\'></div>'
  contentBlockHolder = $('div[data-block=\'' + contentBlock.id + '\']')
  if contentBlockHolder.length > 0
    $(contentBlockHolder).addClass 'content-block'
    $(contentBlockHolder).append '<div class=\'toolbar\'><a class=\'edit\'>edit</a></div>'
    $(contentBlockHolder).append '<div class=\'content\'>' + contentBlock.content + '</div>'
  return

makeContentBlockEditable = (id, callback) ->
  $.ajax
    type: 'GET'
    url: 'http://localhost:3000/api/content_blocks/' + id + '.json'
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'Authorization', getApiKey()
      return
    dataType: 'json'
    success: (data) ->
      $('div[data-block=\'' + data.id + '\']').replaceWith '<div data-block=\'' + data.id + '\'></div>'
      contentBlockHolder = $('div[data-block=\'' + data.id + '\']')
      if contentBlockHolder.length > 0
        $(contentBlockHolder).addClass 'content-block'
        $(contentBlockHolder).append '<div class=\'toolbar\'><a class=\'save\'>save</a></div>'
        $(contentBlockHolder).append '<textarea id=\'block_' + data.id + '\'>' + data.content + '</textarea>'
        callback()
      return
  return

initializeContentBlocks = (callback) ->
  $.ajax
    type: 'GET'
    url: 'http://localhost:3000/api/content_blocks.json'
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'Authorization', getApiKey()
      return
    dataType: 'json'
    success: (data) ->
      $.each data, (index, value) ->
        drawContentBlock value
        callback()
        return
      return
  return

createContentBlock = (newContentPath, newContent) ->
  $.ajax
    type: 'POST'
    url: 'http://localhost:3000/api/content_blocks.json'
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'Authorization', getApiKey()
      return
    data:
      content_block:
        content_path: newContentPath
        content: newContent
    dataType: 'json'
    success: (msg) ->
      console.log msg
      return
  return

updateContentBlock = (id, newContent, callback) ->
  $.ajax
    type: 'PUT'
    url: 'http://localhost:3000/api/content_blocks/' + id + '.json'
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'Authorization', getApiKey()
      return
    data:
      content_block:
        content: newContent
    dataType: 'json'
    success: (msg) ->
      console.log msg
      return
  callback()
  return

deleteContentBlock = (id) ->
  $.ajax
    type: 'DELETE'
    url: 'http://localhost:3000/api/content_blocks/' + id + '.json'
    beforeSend: (xhr) ->
      xhr.setRequestHeader 'Authorization', getApiKey()
      return
    dataType: 'json'
    success: (msg) ->
      console.log msg
      return
  return

$(document).ready ->
  initializeContentBlocks ->
    $('a.edit').click ->
      editLink = this
      makeContentBlockEditable $(editLink).parent().parent().attr('data-block'), ->
        $('a.save').click ->
          saveLink = this
          newContent = $(saveLink).parent().parent().find('textarea').val()
          blockID = $(saveLink).parent().parent().attr('data-block')
          updateContentBlock blockID, newContent, ->
            location.reload()
            return
          return
        return
      return
    return
  return

$(document).ajaxError (event, jqxhr, settings, exception) ->
  if jqxhr.status == 401
    $('div.wrapper').empty()
    $('div.wrapper').append '<h1 class=\'error-message\'>Zugriff verweigert! (401)</h1>'
  return

