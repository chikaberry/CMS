import { EventEmitter, Injectable  } from '@angular/core';

import { Document } from './document.model';
import { Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documents : Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject <Document[]>();
  maxDocumentId: number;

  constructor(private http:HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId();
    
   }
   getDocuments(){
     //return this.documents.slice();
     this.http.get('https://cms-2022-default-rtdb.firebaseio.com/documents.json')
     .subscribe((documents: Document[]) => {
       console.log (documents)
       this.documents = documents;
       this.maxDocumentId = this.getMaxId()
       this.documentChangedEvent.next(this.documents.slice());
     }, (error) => {
       console.log(error)
     
     })
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
    this.storeDocument();
  
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
  this.storeDocument();
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
this.storeDocument()
}


storeDocument(){
  const documents = JSON.stringify(this.documents);
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-control-Allow-Origin', '*');
  this.http.put('https://cms-2022-default-rtdb.firebaseio.com/documents.json', documents, {headers: headers})
  .subscribe(data => this.documentChangedEvent.next(this.documents.slice()));
}














}
 

