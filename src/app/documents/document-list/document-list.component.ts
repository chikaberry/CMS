import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document} from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("1", "Ram", "Good Good", "url" ,null),
    new Document("2", "Ram", "Life is hard", "url", null),
    new Document("3", "Ram", "Good life", "url", null),
    new Document("4", "Ram", "Easy life", "url" ,null),

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document:Document){
    this.selectedDocumentEvent.emit(document);
  }
}
