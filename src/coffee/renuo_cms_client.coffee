'use strict'

class RenuoCmsClient

  constructor: (@apiKey, @apiUrl) ->
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
    "Token token=#{@apiKey}"

  getApiUrl: ->
    @apiUrl

  initializeContentBlocks: (callback) ->
    $.ajax
      type: 'GET'
      url: @getApiUrl() + 'content_blocks.json'
      beforeSend: @authorizeAjax
      dataType: 'json'
      success: (data) =>
        $.each data, (index, value) =>
          @drawContentBlock value
          callback()

  getEmptyContentBlockHolder: (id) ->
    $("div[data-block='" + id + "']").empty().addClass('content-block')

  drawContentBlock: (contentBlock) ->
    contentBlockHolder = @getEmptyContentBlockHolder(contentBlock.id)
    if contentBlockHolder.length > 0
      contentBlockHolder.append($('<div>').addClass('toolbar').append($('<a>').addClass('edit').text('edit')))
      contentBlockHolder.append($('<div>').addClass('content').html(contentBlock.content))

  getContentBlockForEdit: (id, callback) ->
    $.ajax
      type: 'GET'
      url: @getApiUrl() + 'content_blocks/' + id + '.json'
      beforeSend: @authorizeAjax
      dataType: 'json'
      success: (data) =>
        @makeContentBlockEditable(data, callback)

  makeContentBlockEditable: (data, callback) ->
    contentBlockHolder = @getEmptyContentBlockHolder(data.id)
    if contentBlockHolder.length > 0
      contentBlockHolder.append($('<div>').addClass('toolbar').append($('<a>').addClass('save').text('save')))
      contentBlockHolder.append($('<textarea>').attr('id', 'block_' + data.id).html(data.content))
      callback()

  # POST to API to create a new ContentBlock
  createContentBlock: (newContentPath, newContent) ->
    $.ajax
      type: 'POST'
      url: @getApiUrl() + 'content_blocks.json'
      beforeSend: @authorizeAjax
      data:
        content_block:
          content_path: newContentPath
          content: newContent
      dataType: 'json'

  # PUT to API to update ContentBlock content column
  updateContentBlock: (id, newContent) ->
    $.ajax
      type: 'PUT'
      url: @getApiUrl() + 'content_blocks/' + id + '.json'
      beforeSend: @authorizeAjax
      data:
        content_block:
          content: newContent
      dataType: 'json'
      success: (msg) ->
        location.reload()

  # DELETE to API to delete ContentBlock
  deleteContentBlock: (id) ->
    $.ajax
      type: 'DELETE'
      url: @getApiUrl() + 'content_blocks/' + id + '.json'
      beforeSend: @authorizeAjax
      dataType: 'json'

  authorizeAjax: (xhr) =>
    xhr.setRequestHeader 'Authorization', @getApiKey()

window.renuoCmsClient = RenuoCmsClient
