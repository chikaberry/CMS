import { Injectable} from '@angular/core';
import { Contact } from './contact.model';
import { Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private contacts: Contact[] = [];
  maxContactId : number;

 
  contactChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) { 
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
  }


  getContacts(){
    //return this.contacts.slice();
    this.http.get('https://cms-2022-default-rtdb.firebaseio.com/contacts.json')
     .subscribe((contacts: Contact[]) => {
       console.log (contacts)
       this.contacts = contacts;
       this.maxContactId = this.getMaxId()
       this.contactChangedEvent.next(this.contacts.slice());
     }, (error) => {
       console.log(error)
     
     });
    }
  

  //The ContactService also needs a method to find a specific Contact object in the contacts array
  getContact(id: string): Contact{
    return this.contacts.find((contact)=> contact.id === id);
  }

  

  deleteContact(contact:Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.storeContact();
  }

 getMaxId(){

  let maxId = 0;

  this.contacts.forEach(contact => {
    let currId = parseInt(contact.id);
    if (currId > maxId)
    {
      maxId = currId;}

    
    });
  
    return maxId
 }



 addContact(newContact:Contact) {

  if(!newContact)

  {
    return
  }
  this.maxContactId++;
  newContact.id = this.maxContactId.toString()
  this.contacts.push(newContact);
  this.storeContact();
}


updateContact(originalContact: Contact, newContact: Contact){
if (!originalContact || newContact){
  return
} 
 const pos = this.contacts.indexOf(originalContact)
if (pos < 0 ) {
  return;
}
newContact.id = originalContact.id;
this.contacts[pos] = newContact;
this.storeContact();

}


storeContact(){
  const contacts = JSON.stringify(this.contacts);
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-control-Allow-Origin', '*');
  this.http.put('https://cms-2022-default-rtdb.firebaseio.com/contacts.json', contacts, {headers: headers} )
  .subscribe(data => this.contactChangedEvent.next(this.contacts.slice()));
}





}



