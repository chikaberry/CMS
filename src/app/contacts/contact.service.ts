import { Injectable, EventEmitter} from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private contacts: Contact[] = [];
  maxContactId : number;

  contactSelectedEvent = new EventEmitter <Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }


  getContacts():Contact[] {
    return this.contacts.slice();
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
    this.contactChangedEvent.next(this.contacts.slice());
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
  this.contactChangedEvent.next(this.contacts.slice());
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
this.contactChangedEvent.next(this.contacts.slice());

}
}



