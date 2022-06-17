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

  constructor() {
    this.documents = MOCKDOCUMENTS;
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
 
}
