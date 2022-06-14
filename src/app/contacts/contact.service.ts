import { Injectable, EventEmitter} from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter <Contact>();

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
}
