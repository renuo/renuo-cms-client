interface RenuoUploadCallback {
  (event:RenuoUploadEvent): void;
}

interface RenuoUploadEvent {
  orginalName:string;
  cleanName:string;
  name:string;
  extension:string;
  size:string;
  publicUrl:string;
  filePath:string;
}

interface RenuoUploadStatic {
  (element:HTMLElement|JQuery, options:any, ...callback:RenuoUploadCallback[]): void;
  version:number;
}

declare var RenuoUpload:RenuoUploadStatic;
