import { File } from './file';

export class Item {
    id:number
    name:string
    icon:number
    file:number
    pdf:number
    level:number
    idfather:number
    flag:number;
    pdfObj=new File()
    iconObj=new File()
    fileObj=new File()
}
