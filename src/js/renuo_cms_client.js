(function() {
  'use strict';
  var RenuoCmsClient;

  RenuoCmsClient = (function() {
    function RenuoCmsClient() {
      this.initializeContentBlocks((function(_this) {
        return function() {
          return $('a.edit').click(function() {
            var editLink = this;
            return _this.getContentBlockForEdit($(editLink).parent().parent().attr('data-block'), function() {
              return $('a.save').click(function() {
                var saveLink = this;
                var blockID, newContent;
                newContent = $(saveLink).parent().parent().find('textarea').val();
                blockID = $(saveLink).parent().parent().attr('data-block');
                return _this.updateContentBlock(blockID, newContent);
              });
            });
          });
        };
      })(this));
    }

    RenuoCmsClient.prototype.getApiKey = function() {
      return 'Token token=772a91a136caa729fb8e09277c05310e';
    };

    RenuoCmsClient.prototype.getApiUrl = function() {
      return 'http://localhost:3000/api/';
    };

    RenuoCmsClient.prototype.initializeContentBlocks = function(callback) {
      return $.ajax({
        type: 'GET',
        url: this.getApiUrl() + 'content_blocks.json',
        beforeSend: (function(_this) {
          return function(xhr) {
            return xhr.setRequestHeader('Authorization', _this.getApiKey());
          };
        })(this),
        dataType: 'json',
        success: (function(_this) {
          return function(data) {
            return $.each(data, function(index, value) {
              console.log(value);
              _this.drawContentBlock(value);
              return callback();
            });
          };
        })(this)
      });
    };

    RenuoCmsClient.prototype.drawContentBlock = function(contentBlock) {
      var contentBlockHolder;
      $('div[data-block=\'' + contentBlock.id + '\']').replaceWith('<div data-block=\'' + contentBlock.id + '\'></div>');
      contentBlockHolder = $('div[data-block=\'' + contentBlock.id + '\']');
      if (contentBlockHolder.length > 0) {
        $(contentBlockHolder).addClass('content-block');
        $(contentBlockHolder).append('<div class=\'toolbar\'><a class=\'edit\'>edit</a></div>');
        return $(contentBlockHolder).append('<div class=\'content\'>' + contentBlock.content + '</div>');
      }
    };

    RenuoCmsClient.prototype.getContentBlockForEdit = function(id, callback) {
      return $.ajax({
        type: 'GET',
        url: this.getApiUrl() + 'content_blocks/' + id + '.json',
        beforeSend: (function(_this) {
          return function(xhr) {
            return xhr.setRequestHeader('Authorization', _this.getApiKey());
          };
        })(this),
        dataType: 'json',
        success: (function(_this) {
          return function(data) {
            console.log(data);
            return _this.makeContentBlockEditable(data, callback);
          };
        })(this)
      });
    };

    RenuoCmsClient.prototype.makeContentBlockEditable = function(data, callback) {
      var contentBlockHolder;
      $('div[data-block=\'' + data.id + '\']').replaceWith('<div data-block=\'' + data.id + '\'></div>');
      contentBlockHolder = $('div[data-block=\'' + data.id + '\']');
      if (contentBlockHolder.length > 0) {
        $(contentBlockHolder).addClass('content-block');
        $(contentBlockHolder).append('<div class=\'toolbar\'><a class=\'save\'>save</a></div>');
        $(contentBlockHolder).append('<textarea id=\'block_' + data.id + '\'>' + data.content + '</textarea>');
        return callback();
      }
    };

    RenuoCmsClient.prototype.createContentBlock = function(newContentPath, newContent) {
      return $.ajax({
        type: 'POST',
        url: this.getApiUrl() + 'content_blocks.json',
        beforeSend: (function(_this) {
          return function(xhr) {
            return xhr.setRequestHeader('Authorization', _this.getApiKey());
          };
        })(this),
        data: {
          content_block: {
            content_path: newContentPath,
            content: newContent
          }
        },
        dataType: 'json',
        success: function(msg) {
          return console.log(msg);
        }
      });
    };

    RenuoCmsClient.prototype.updateContentBlock = function(id, newContent) {
      return $.ajax({
        type: 'PUT',
        url: this.getApiUrl() + 'content_blocks/' + id + '.json',
        beforeSend: (function(_this) {
          return function(xhr) {
            return xhr.setRequestHeader('Authorization', _this.getApiKey());
          };
        })(this),
        data: {
          content_block: {
            content: newContent
          }
        },
        dataType: 'json',
        success: function(msg) {
          console.log(msg);
          return location.reload();
        }
      });
    };

    RenuoCmsClient.prototype.deleteContentBlock = function(id) {
      return $.ajax({
        type: 'DELETE',
        url: this.getApiUrl() + 'content_blocks/' + id + '.json',
        beforeSend: (function(_this) {
          return function(xhr) {
            return xhr.setRequestHeader('Authorization', _this.getApiKey());
          };
        })(this),
        dataType: 'json',
        success: function(msg) {
          return console.log(msg);
        }
      });
    };

    return RenuoCmsClient;

  })();

  window.renuoCmsClient = RenuoCmsClient;

}).call(this);
