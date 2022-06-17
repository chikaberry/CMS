import { Injectable, EventEmitter} from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter <Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  getContacts():Contact[] {
    return this.contacts.slice();
  }

  //The ContactService also needs a method to find a specific Contact object in the contacts array
  getContact(id: string): Contact{
    return this.contacts.find((contact)=> contact.id === id);
  }

  constructor() { 
    this.contacts = MOCKCONTACTS;
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
}
