///<reference path="../editor_preparer.ts"/>
///<reference path="../../../../../typings/globals/ckeditor/index.d.ts"/>
///<reference path="ckeditor_upload_plugin.ts"/>
///<reference path="../../../data/services/i18n.ts"/>

class CkeditorPreparer implements EditorPreparer {
  constructor(private ckeditor:any = null) {
    jQuery('<style type="text/css">' +
      '@keyframes renuo-cms-flash-success {0% { background: default; } 50% { background: #d7eed7; } 100% { background: default; }}' +
      '@keyframes renuo-cms-flash-error {0% { background: default; } 50% { background: #f5d1d0; } 100% { background: default; }}' +
      '.renuo-cms-edit-success{animation-name: renuo-cms-flash-success; animation-duration: 1.5s;}' +
      '.renuo-cms-edit-error{animation-name: renuo-cms-flash-error; animation-duration: 1.5s;}' +
      '</style>').appendTo('head');
  }

  prepare(dom:DomContentBlock, editCallback:EditContentBlockCallback):void {
    if (this.ckeditor === null) this.ckeditor = CKEDITOR;

    if (jQuery(dom.element).attr('contenteditable') === 'true') return;

    jQuery(dom.element).attr('contenteditable', 'true');
    this.initCkeditor(dom, editCallback);
  }

  notifySave(dom:DomContentBlock, success:boolean, response:any):void {
    const cssClass = success ? 'success' : 'error';
    jQuery(dom.element).addClass(`renuo-cms-edit-${cssClass}`).delay(2000).queue(() =>
      jQuery(dom.element).removeClass(`renuo-cms-edit-${cssClass}`).dequeue());
    if (!success) {
      this.showErrorMessage(response.status);
    }
  }

  private showErrorMessage(status:number):void {
    const errorMessages:{[key:number]:string} = {
      409: 'cms.edit.message.conflict',
      401: 'cms.edit.message.unauthorized',
      0: 'cms.edit.message.no-connection'
    };
    const message = errorMessages[status];
    if (message) {
      alert(I18n.t(message));
    }
  }

  private initCkeditor(dom:DomContentBlock, editCallback:EditContentBlockCallback) {

    const editor = this.ckeditor.inline(dom.element, this.ckeditorConfig(dom.contentBlock));
    editor.on('blur', (event:CKEDITOR.eventInfo) => this.checkForUpdate(event, editCallback, dom));
    new CkeditorUploadPlugin(dom).registerPlugin(editor);
  };

  private checkForUpdate(event:CKEDITOR.eventInfo, editCallback:EditContentBlockCallback, dom:DomContentBlock) {
    if (event.editor.checkDirty()) {
      const newContent = event.editor.getData();
      event.editor.resetDirty();
      editCallback(dom, newContent);
    }
  };

  // this method would return a CKEDITOR.config, but it is not defined correctly
  private ckeditorConfig(block:ContentBlock):any {
    // TODO: ACF: http://sdk.ckeditor.com/samples/acf.html
    /*allowedContent: { 'b i li ul ol table thead tbody tr': true, 'h1 h2 h3 h4 p th td': {  styles: 'text-align,text-decoration' },
     a: {attributes: '!href,target'} img: { attributes: '!src,alt', styles: 'width,height', classes: 'left,right' } },*/
    return jQuery.extend({
      extraAllowedContent: {
        // Rule taken from https://github.com/ckeditor/ckeditor-dev/blob/bd5101a/plugins/image/plugin.js#L30
        img: {
          attributes: 'alt,!src',
          styles: 'border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width'
        }
      },
      toolbarGroups: [
        {name: 'styles', groups: ['styles']},
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
        {name: 'links', groups: ['links']},
        {name: 'insert', groups: ['insert']},
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']}
      ],
      removePlugins: 'bidi,font,forms,flash,horizontalrule,iframe',
      removeButtons: 'Source,Save,NewPage,Preview,Templates,Print,SelectAll,Form,Checkbox,Radio,TextField,Textarea,' +
      'Select,Button,HiddenField,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,' +
      'WidgetbootstrapAlert,WidgetbootstrapThreeCol,WidgetbootstrapTwoCol,WidgetbootstrapRightCol,WidgetbootstrapLeftCol,' +
      'Flash,ImageButton,Btgrid,Glyphicons,SpecialChar,Smiley,PageBreak,Iframe,Styles,Font,FontSize,TextColor,BGColor,' +
      'Maximize,ShowBlocks,About,Image',
      format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address'
    }, this.enterMethod(block));
  }

  enterMethod(block:ContentBlock):Object {
    if (block.shouldUseParagraphs()) return {};

    return {
      enterMode: CKEDITOR.ENTER_BR,
      shiftEnterMode: CKEDITOR.ENTER_P
    };
  }
}
