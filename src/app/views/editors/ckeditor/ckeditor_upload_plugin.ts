///<reference path="../upload/renuo_upload_html_generator.ts"/>
///<reference path="../upload/renuo_upload.d.ts"/>
class CkeditorUploadPlugin {
  constructor(private domContentBlock:DomContentBlock) {
  }

  registerPlugin(editor:CKEDITOR.editor) {
    if (!this.domContentBlock.hasRenuoUpload()) return true;

    editor.addCommand('renuoUpload', {
      exec: (editor) => {
        this.openDropzone(editor);
        return true;
      }
    });
    editor.ui.addButton('uploadButton', {
      label: 'File/Image Upload',
      command: 'renuoUpload',
      toolbar: 'insert',
      icon: 'imagebutton'
    });
  }

  private closeDropzone():void {
    jQuery('#dropzone-overlay').remove();
  }

  private openDropzone(editor:CKEDITOR.editor):void {
    const dropzoneOverlay = jQuery(`<div id="dropzone-overlay"></div>`);
    const dropzoneContainer = jQuery(`<div class="dropzone-container"></div>`);
    const dropzone = jQuery('<div></div>');
    const renuoUploadCredentials = this.domContentBlock.renuoUploadCredentials;
    dropzone.addClass('renuo-upload dz-clickable').attr('data-apikey', renuoUploadCredentials.apiKey)
      .attr('data-signingurl', renuoUploadCredentials.signingUrl);
    dropzoneOverlay.append(dropzoneContainer);
    dropzoneContainer.append(dropzone);
    jQuery('body').append(dropzoneOverlay);
    jQuery('<style type="text/css">' +
      '#dropzone-overlay { top: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,.7); z-index: 10000; ' +
      'position: fixed; cursor: pointer; }' +
      '.dropzone, .dropzone.dz-drag-hover { height:100%; border: none; }' +
      '.dropzone-container { top: 25%; left: 25%; position: absolute; width: 50vw; border-radius: 5px; ' +
      'height: 50vh; padding:1em; background: #fff; z-index: 10001; margin: auto; cursor: default; }' +
      '.dz-default { height:100%; border: 3px dashed #ccc; }' +
      '.dropzone .dz-preview { width: 100%; }' +
      '.dropzone .dz-default.dz-message { margin:0px; }' +
      '.dropzone .dz-preview .dz-image { margin: auto; }' +
      '.dz-default span { font-size: 2em; text-align: center; margin-top:3em; display: inline-block; }' +
      '</style>').appendTo('head');

    jQuery(dropzoneOverlay).click((event) => {
      if ($(event.target).attr('id') !== 'dropzone-overlay') return;
      this.closeDropzone();
    });

    const dropzoneOptions = {
      acceptedFiles: 'image/*,application/pdf',
      uploadMultiple: false,
      maxFiles: 1,
      dictDefaultMessage: 'Ziehen Sie eine Bild-Datei oder ein PDF hier herein, oder klicken Sie hier um '
      + 'die Datei hochzuladen.',
      dictFallbackMessage: 'Sie verwenden einen veralteten Browser was das verwenden des Uploads verhindert.',
      dictInvalidFileType: 'Hier können nur Bild-Dateien hochgeladen werden.',
      dictFileTooBig: 'Die Datei ist zu gross.'
    };
    const upload = new window.RenuoUpload(jQuery(dropzone), dropzoneOptions, (event:RenuoUploadEvent) => {
      const htmlElement:HTMLElement = new RenuoUploadHtmlGenerator(event).generateElement();
      const domElement = new CKEDITOR.dom.element(htmlElement);
      editor.insertElement(domElement);
      this.closeDropzone();
    });
  }


}
