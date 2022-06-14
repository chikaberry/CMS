
import { Injectable , EventEmitter } from '@angular/core';
import { MOCKMESSAGES} from './MOCKMESSAGES'
import { Message} from './message.model'


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChanged = new EventEmitter <Message[]>();
  private messages: Message [] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.messageChanged.emit(this.messages.slice())
  }
  
  
}
