interface RenuoUploadCallback {
  (event:RenuoUploadEvent): void;
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
  (element:HTMLElement|JQuery, options:any, ...callback:RenuoUploadCallback[]): void;
  version:number;
}

declare var RenuoUpload:RenuoUploadStatic;
