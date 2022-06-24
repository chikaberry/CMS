
import { Injectable , EventEmitter } from '@angular/core';
import { MOCKMESSAGES} from './MOCKMESSAGES';
import { Message} from './message.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChanged = new EventEmitter <Message[]>();
  private messages: Message [] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) { 
    // this.messages = MOCKMESSAGES;
  }

  

  getMessage(id: string){
  this.messages.forEach(message => {
    if(id == message.id)
  {
  return message;
  }
  else{
    return null
  }
});
}

  addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages()
  }

  getMaxId(){

    let maxId = 0;
  
    this.messages.forEach(message => {
      let currId = parseInt(message.id);
      if (currId > maxId)
      {
        maxId = currId;}
  
      
      });
    
      return maxId
   }

   getMessages(){
    //return this.contacts.slice();
    this.http.get('https://cms-2022-default-rtdb.firebaseio.com/messages.json')
     .subscribe((messages: Message[]) => {
       console.log (messages)
       this.messages = messages;
       this.maxMessageId = this.getMaxId()
       this.messageChanged.emit(this.messages.slice())
     }, (error) => {
       console.log(error)
     
     })
    }
  

    storeMessages(){
      const messages = JSON.stringify(this.messages);
      const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-control-Allow-Origin', '*');
      this.http.put('https://cms-2022-default-rtdb.firebaseio.com/messages.json', messages, {headers: headers} )
      .subscribe(data => this.messageChanged.emit(this.messages.slice()));
    }





















  
  
}
