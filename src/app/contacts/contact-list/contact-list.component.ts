import { Component,  OnDestroy,  OnInit, Output } from '@angular/core'
import { concat, Subscription } from 'rxjs'
import { Contact } from '../contact.model'
import {ContactService} from '../contact.service';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription 
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  this.contactService.getContacts();
    this.subscription =this.contactService.contactChangedEvent.subscribe(
      (contact:Contact[]) => {
        this.contacts=contact;
      }
    )
  }
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

search(value: string) {

  this.term = value;
  
  }



}
