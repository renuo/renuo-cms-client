'use strict'

describe 'RenuoCmsClient', ->

  it 'should can be instantiated', ->
    renuoCmsClient = new window.renuoCmsClient
    expect(renuoCmsClient).toExist()
