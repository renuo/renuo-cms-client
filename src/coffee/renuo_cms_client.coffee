'use strict'

class RenuoCmsClient

  constructor: ->
    @initializeContentBlocks =>
      $('a.edit').click =>
        # TODO: Fix this hack!
        `var editLink = this`
        @getContentBlockForEdit $(editLink).parent().parent().attr('data-block'), =>
          $('a.save').click =>
            `var saveLink = this`
            newContent = $(saveLink).parent().parent().find('textarea').val()
            blockID = $(saveLink).parent().parent().attr('data-block')
            @updateContentBlock blockID, newContent

  getApiKey: ->
    'Token token=772a91a136caa729fb8e09277c05310e'

  getApiUrl: ->
    'http://localhost:3000/api/'

  initializeContentBlocks: (callback) ->
    $.ajax
      type: 'GET'
      url: @getApiUrl() + 'content_blocks.json'
      beforeSend: (xhr) =>
        xhr.setRequestHeader 'Authorization', @getApiKey()
      dataType: 'json'
      success: (data) =>
        $.each data, (index, value) =>
          console.log value
          @drawContentBlock value
          callback()

  drawContentBlock: (contentBlock) ->
    $('div[data-block=\'' + contentBlock.id + '\']').replaceWith '<div data-block=\'' + contentBlock.id + '\'></div>'
    contentBlockHolder = $('div[data-block=\'' + contentBlock.id + '\']')
    if contentBlockHolder.length > 0
      $(contentBlockHolder).addClass 'content-block'
      $(contentBlockHolder).append '<div class=\'toolbar\'><a class=\'edit\'>edit</a></div>'
      $(contentBlockHolder).append '<div class=\'content\'>' + contentBlock.content + '</div>'

  getContentBlockForEdit: (id, callback) ->
    $.ajax
      type: 'GET'
      url: @getApiUrl() + 'content_blocks/' + id + '.json'
      beforeSend: (xhr) =>
        xhr.setRequestHeader 'Authorization', @getApiKey()
      dataType: 'json'
      success: (data) =>
        console.log data
        @makeContentBlockEditable(data, callback)

  makeContentBlockEditable: (data, callback) ->
    $('div[data-block=\'' + data.id + '\']').replaceWith '<div data-block=\'' + data.id + '\'></div>'
    contentBlockHolder = $('div[data-block=\'' + data.id + '\']')
    if contentBlockHolder.length > 0
      $(contentBlockHolder).addClass 'content-block'
      $(contentBlockHolder).append '<div class=\'toolbar\'><a class=\'save\'>save</a></div>'
      $(contentBlockHolder).append '<textarea id=\'block_' + data.id + '\'>' + data.content + '</textarea>'
      callback()

  # POST to API to create a new ContentBlock
  createContentBlock: (newContentPath, newContent) ->
    $.ajax
      type: 'POST'
      url: @getApiUrl() + 'content_blocks.json'
      beforeSend: (xhr) =>
        xhr.setRequestHeader 'Authorization', @getApiKey()
      data:
        content_block:
          content_path: newContentPath
          content: newContent
      dataType: 'json'
      success: (msg) ->
        console.log msg

  # PUT to API to update ContentBlock content column
  updateContentBlock: (id, newContent) ->
    $.ajax
      type: 'PUT'
      url: @getApiUrl() + 'content_blocks/' + id + '.json'
      beforeSend: (xhr) =>
        xhr.setRequestHeader 'Authorization', @getApiKey()
      data:
        content_block:
          content: newContent
      dataType: 'json'
      success: (msg) ->
        console.log msg
        location.reload()

  # DELETE to API to delete ContentBlock
  deleteContentBlock: (id) ->
    $.ajax
      type: 'DELETE'
      url: @getApiUrl() + 'content_blocks/' + id + '.json'
      beforeSend: (xhr) =>
        xhr.setRequestHeader 'Authorization', @getApiKey()
      dataType: 'json'
      success: (msg) ->
        console.log msg

window.renuoCmsClient = RenuoCmsClient
