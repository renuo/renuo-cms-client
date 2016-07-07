///<reference path="edit_content_block_callback.ts"/>
///<reference path="../models/dom_content_block.ts"/>

interface EditorPreparer {
  prepare(dom:DomContentBlock, callback:EditContentBlockCallback):void;
  notifySave(dom:DomContentBlock, success:boolean, response:any):void;
}
