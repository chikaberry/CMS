import { Component,  OnInit, Output } from '@angular/core'
import { concat, Subscription } from 'rxjs'
import { Contact } from '../contact.model'
import {ContactService} from '../contact.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  private Subscription: Subscription 
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.Subscription =this.contactService.contactChangedEvent.subscribe(
      (contact:Contact[]) => {
        this.contacts=contact;
      }
    )
  }


  
}
