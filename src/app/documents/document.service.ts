import { EventEmitter, Injectable  } from '@angular/core';
import { MOCKDOCUMENTS} from './mockdocuments';
import { Document } from './document.model';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents : Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject <Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }
   getDocuments(): Document[]{
     return this.documents.slice();

   }

   getDocument(id: string): Document{
     return this.documents.find((document)=> document.id === id);
   }

   deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  
 }

 getMaxId(){

  let maxid = 0;

  this.documents.forEach(document => {
    let currentId = parseInt(document.id);
    if (currentId > maxid)
    {
      maxid =currentId;}

    });
      
  return maxid }

addDocument(newDocument: Document){
  if (!newDocument)
  {
    return
  }
  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString()
  this.documents.push(newDocument);
  this.documentChangedEvent.next(this.documents.slice());
}

updateDocument(originalDocument: Document, newDocument: Document){
if (!originalDocument || newDocument){
  return
} 
 const pos = this.documents.indexOf(originalDocument)
if (pos < 0 ) {
  return;
}
newDocument.id = originalDocument.id;
this.documents[pos] = newDocument;
this.documentChangedEvent.next(this.documents.slice());

}



}
 

