import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {DocumentService} from '../document.service';
import {Subscription} from 'rxjs';
import {Document} from '../document.model';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;
  subscription: Subscription;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {}




  ngOnInit() {
    this.subscription =this.route.params.subscribe
    ((params: Params) => { 
      this.id = params['id']
      if(this.id == null)
    {
    this.editMode = false;
     
  }

    this.originalDocument = this.documentService.getDocument(this.id);
 
  if (this.originalDocument ==null) 
  {
    return
  }
  this.editMode = true;
  this.slForm.setValue({
    name: this.originalDocument.name,
    description: this.originalDocument.description,
    url: this.originalDocument.url,
  })
  this.document = JSON.parse(JSON.stringify(this.originalDocument));
  
})}




onCancel(){
  this.router.navigate(['/documents'], {relativeTo:this.route})
}
  
onSubmit(form:NgForm){
  let value = form.value;
  let newDocument = new Document(value.id,value.name,value.description,value.url, null)
  if (this.editMode)
{
this.documentService.updateDocument(this.originalDocument, newDocument);
}
  else {
  
this.documentService.addDocument(newDocument);
}
  this.router.navigate(['/documents'], {relativeTo: this.route});
}

ngOnDestroy(): void {
this.subscription.unsubscribe();
}





}
