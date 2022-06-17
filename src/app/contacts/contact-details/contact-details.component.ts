import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import{ ContactService} from '../contact.service';

@Component({
  selector: 'cms-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
   @Input() contact: Contact;
  id: string

  constructor(private contactService: ContactService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=> {
      this.id = params['id'];
      this.contact = this.contactService.getContact(this.id);
    }
    )
 
}

onDelete(){
  this.contactService.deleteContact(this.contact);
  this.router.navigateByUrl('contacts');
}
}
