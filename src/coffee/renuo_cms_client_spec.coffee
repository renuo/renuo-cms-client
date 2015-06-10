'use strict'

describe 'RenuoCmsClient', ->
  renuoCmsClient = undefined

  beforeEach ->
    renuoCmsClient = new RenuoCmsClient('772a91a136caa729fb8e09277c05310e', 'http://localhost:3000/api/')
    $("<div data-block='1'></div>").appendTo('body')

  afterEach ->
    $("div[data-block='1']").remove()

  it 'can be instantiated', ->
    expect(renuoCmsClient).toExist()

  it 'can return a valid base url when calling `getApiUrl`', ->
    expect(renuoCmsClient.getApiUrl()).toMatch(/http/i)

  it 'can return a valid api token when calling `getApiKey`', ->
    expect(renuoCmsClient.getApiKey()).toMatch(/Token token=/i)

  it 'can draw a ContentBlock from a div with the id as a [data-block]', ->
    expect($("div[data-block='1']")).not.toHaveClass('content-block')
    renuoCmsClient.drawContentBlock({id: 1, content_path: '/foo/bar', content: 'Hello World'})
    expect($("div[data-block='1']")).toHaveClass('content-block')

  it 'can make a drawn ContentBlock editable', ->
    renuoCmsClient.drawContentBlock({id: 1, content_path: '/foo/bar', content: 'Hello World'})
    renuoCmsClient.makeContentBlockEditable {id: 1, content_path: '/foo/bar', content: 'Hello World'}, -> true
    expect($("textarea#block_1")).toBeInDOM()

  it 'can GET a ContentBlocks information from the API by passing its id to `getContentBlockForEdit`', ->
    spyOn $, 'ajax'
    renuoCmsClient.getContentBlockForEdit '1', -> true
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual("#{renuoCmsClient.getApiUrl()}content_blocks/1.json")
    expect($.ajax.calls.mostRecent().args[0]['type']).toEqual('GET')

  it 'can PUT to the API to update a ContentBlocks information by calling `updateContentBlock`', ->
    spyOn $, 'ajax'
    renuoCmsClient.updateContentBlock('1', 'foo bar')
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual("#{renuoCmsClient.getApiUrl()}content_blocks/1.json")
    expect($.ajax.calls.mostRecent().args[0]['type']).toEqual('PUT')

  it 'can DELETE a ContentBlock in the API by calling `deleteContentBlock`', ->
    spyOn $, 'ajax'
    renuoCmsClient.deleteContentBlock('1')
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual("#{renuoCmsClient.getApiUrl()}content_blocks/1.json")
    expect($.ajax.calls.mostRecent().args[0]['type']).toEqual('DELETE')
