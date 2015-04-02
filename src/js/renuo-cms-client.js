(function() {
  var createContentBlock, deleteContentBlock, drawContentBlock, getAllContentBlocks, getApiKey, getContentBlock, initializeContentBlocks, makeContentBlockEditable, updateContentBlock;

  getApiKey = function() {
    return 'Token token=772a91a136caa729fb8e09277c05310e';
  };

  getAllContentBlocks = function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/api/content_blocks.json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', getApiKey());
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);
      }
    });
  };

  getContentBlock = function(id) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/api/content_blocks/' + id + '.json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', getApiKey());
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);
      }
    });
  };

  drawContentBlock = function(contentBlock) {
    var contentBlockHolder;
    $('div[data-block=\'' + contentBlock.id + '\']').replaceWith('<div data-block=\'' + contentBlock.id + '\'></div>');
    contentBlockHolder = $('div[data-block=\'' + contentBlock.id + '\']');
    if (contentBlockHolder.length > 0) {
      $(contentBlockHolder).addClass('content-block');
      $(contentBlockHolder).append('<div class=\'toolbar\'><a class=\'edit\'>edit</a></div>');
      $(contentBlockHolder).append('<div class=\'content\'>' + contentBlock.content + '</div>');
    }
  };

  makeContentBlockEditable = function(id, callback) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/api/content_blocks/' + id + '.json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', getApiKey());
      },
      dataType: 'json',
      success: function(data) {
        var contentBlockHolder;
        $('div[data-block=\'' + data.id + '\']').replaceWith('<div data-block=\'' + data.id + '\'></div>');
        contentBlockHolder = $('div[data-block=\'' + data.id + '\']');
        if (contentBlockHolder.length > 0) {
          $(contentBlockHolder).addClass('content-block');
          $(contentBlockHolder).append('<div class=\'toolbar\'><a class=\'save\'>save</a></div>');
          $(contentBlockHolder).append('<textarea id=\'block_' + data.id + '\'>' + data.content + '</textarea>');
          callback();
        }
      }
    });
  };

  initializeContentBlocks = function(callback) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/api/content_blocks.json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', getApiKey());
      },
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, value) {
          drawContentBlock(value);
          callback();
        });
      }
    });
  };

  createContentBlock = function(newContentPath, newContent) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/content_blocks.json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', getApiKey());
      },
      data: {
        content_block: {
          content_path: newContentPath,
          content: newContent
        }
      },
      dataType: 'json',
      success: function(msg) {
        console.log(msg);
      }
    });
  };

  updateContentBlock = function(id, newContent, callback) {
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/api/content_blocks/' + id + '.json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', getApiKey());
      },
      data: {
        content_block: {
          content: newContent
        }
      },
      dataType: 'json',
      success: function(msg) {
        console.log(msg);
      }
    });
    callback();
  };

  deleteContentBlock = function(id) {
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/api/content_blocks/' + id + '.json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', getApiKey());
      },
      dataType: 'json',
      success: function(msg) {
        console.log(msg);
      }
    });
  };

  $(document).ready(function() {
    initializeContentBlocks(function() {
      $('a.edit').click(function() {
        var editLink;
        editLink = this;
        makeContentBlockEditable($(editLink).parent().parent().attr('data-block'), function() {
          $('a.save').click(function() {
            var blockID, newContent, saveLink;
            saveLink = this;
            newContent = $(saveLink).parent().parent().find('textarea').val();
            blockID = $(saveLink).parent().parent().attr('data-block');
            updateContentBlock(blockID, newContent, function() {
              location.reload();
            });
          });
        });
      });
    });
  });

  $(document).ajaxError(function(event, jqxhr, settings, exception) {
    if (jqxhr.status === 401) {
      $('div.wrapper').empty();
      $('div.wrapper').append('<h1 class=\'error-message\'>Zugriff verweigert! (401)</h1>');
    }
  });

}).call(this);
