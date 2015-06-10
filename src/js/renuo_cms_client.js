(function() {
  'use strict';
  var RenuoCmsClient,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  RenuoCmsClient = (function() {
    function RenuoCmsClient(apiKey, apiUrl) {
      this.apiKey = apiKey;
      this.apiUrl = apiUrl;
      this.authorizeAjax = __bind(this.authorizeAjax, this);
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
      return "Token token=" + this.apiKey;
    };

    RenuoCmsClient.prototype.getApiUrl = function() {
      return this.apiUrl;
    };

    RenuoCmsClient.prototype.initializeContentBlocks = function(callback) {
      return $.ajax({
        type: 'GET',
        url: this.getApiUrl() + 'content_blocks.json',
        beforeSend: this.authorizeAjax,
        dataType: 'json',
        success: (function(_this) {
          return function(data) {
            return $.each(data, function(index, value) {
              _this.drawContentBlock(value);
              return callback();
            });
          };
        })(this)
      });
    };

    RenuoCmsClient.prototype.getEmptyContentBlockHolder = function(id) {
      return $("div[data-block='" + id + "']").empty().addClass('content-block');
    };

    RenuoCmsClient.prototype.drawContentBlock = function(contentBlock) {
      var contentBlockHolder;
      contentBlockHolder = this.getEmptyContentBlockHolder(contentBlock.id);
      if (contentBlockHolder.length > 0) {
        contentBlockHolder.append($('<div>').addClass('toolbar').append($('<a>').addClass('edit').text('edit')));
        return contentBlockHolder.append($('<div>').addClass('content').html(contentBlock.content));
      }
    };

    RenuoCmsClient.prototype.getContentBlockForEdit = function(id, callback) {
      return $.ajax({
        type: 'GET',
        url: this.getApiUrl() + 'content_blocks/' + id + '.json',
        beforeSend: this.authorizeAjax,
        dataType: 'json',
        success: (function(_this) {
          return function(data) {
            return _this.makeContentBlockEditable(data, callback);
          };
        })(this)
      });
    };

    RenuoCmsClient.prototype.makeContentBlockEditable = function(data, callback) {
      var contentBlockHolder;
      contentBlockHolder = this.getEmptyContentBlockHolder(data.id);
      if (contentBlockHolder.length > 0) {
        contentBlockHolder.append($('<div>').addClass('toolbar').append($('<a>').addClass('save').text('save')));
        contentBlockHolder.append($('<textarea>').attr('id', 'block_' + data.id).html(data.content));
        return callback();
      }
    };

    RenuoCmsClient.prototype.createContentBlock = function(newContentPath, newContent) {
      return $.ajax({
        type: 'POST',
        url: this.getApiUrl() + 'content_blocks.json',
        beforeSend: this.authorizeAjax,
        data: {
          content_block: {
            content_path: newContentPath,
            content: newContent
          }
        },
        dataType: 'json'
      });
    };

    RenuoCmsClient.prototype.updateContentBlock = function(id, newContent) {
      return $.ajax({
        type: 'PUT',
        url: this.getApiUrl() + 'content_blocks/' + id + '.json',
        beforeSend: this.authorizeAjax,
        data: {
          content_block: {
            content: newContent
          }
        },
        dataType: 'json',
        success: function(msg) {
          return location.reload();
        }
      });
    };

    RenuoCmsClient.prototype.deleteContentBlock = function(id) {
      return $.ajax({
        type: 'DELETE',
        url: this.getApiUrl() + 'content_blocks/' + id + '.json',
        beforeSend: this.authorizeAjax,
        dataType: 'json'
      });
    };

    RenuoCmsClient.prototype.authorizeAjax = function(xhr) {
      return xhr.setRequestHeader('Authorization', this.getApiKey());
    };

    return RenuoCmsClient;

  })();

  window.renuoCmsClient = RenuoCmsClient;

}).call(this);
