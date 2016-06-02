///<reference path="../../../../typings/globals/jasmine/index.d.ts"/>
///<reference path="renuo_upload_credentials.ts"/>

describe('RenuoUploadCredentials', function () {

  it('hasCredentials works correctly', function () {
    expect(new RenuoUploadCredentials('', '').hasCredentials()).toBe(false);
    expect(new RenuoUploadCredentials(null, null).hasCredentials()).toBe(false);
    expect(new RenuoUploadCredentials('a', '').hasCredentials()).toBe(false);
    expect(new RenuoUploadCredentials('', 'b').hasCredentials()).toBe(false);
    expect(new RenuoUploadCredentials('a', 'b').hasCredentials()).toBe(true);
  });
});
