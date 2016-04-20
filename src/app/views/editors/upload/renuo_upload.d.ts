interface RenuoUploadCallback {
  (event:RenuoUploadEvent):void;
}

interface RenuoUploadEvent {
  cleanName:string;
  extension:string;
  publicUrl:string;
  // filePath:string;
  // name:string;
  // orginalName:string;
  // size:string;
}

interface RenuoUploadStatic {
  new(element:HTMLElement|JQuery, options:any, ...callback:RenuoUploadCallback[]):void;
  version:number;
}

declare var RenuoUpload:RenuoUploadStatic;

interface Window {
  RenuoUpload:RenuoUploadStatic;
}

declare module CKEDITOR {
  module dialog {
    module definition {
      /* tslint:disable:class-name */
      interface button {
        /* tslint:enable:class-name */
        icon?:string;
      }
    }
  }
}
