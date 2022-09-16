import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessage } from '../models/Message';

// TODO: remove
const BACKEND_URL = '127.0.0.1:8000';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  /** reference to the web sockets by room */
  private webSockets: Map<string, WebSocketSubject<any>> = new Map();
  /** Were messages will be sent */
  public messageSubscription: Subject<any> = new Subject();

  public fakeUserID = Math.random() * 200; // TODO: change with a real id

  constructor() {}

  enterRoom(roomName: string) {
    if (this.webSockets.get(roomName)) {
      console.log('already in this room');
    } else {
      console.log('adding ws');
      const ws = webSocket(`ws://${BACKEND_URL}/ws/chat/${roomName}/`);
      this.webSockets.set(roomName, ws);
      ws.subscribe((res: any) => this.onMessageReceived(roomName, res));
    }
  }

  exitRoom(roomName: string) {
    this.webSockets.get(roomName)?.unsubscribe();
    this.webSockets.delete(roomName);
  }

  emit(roomName: string, message: string) {
    this.webSockets.get(roomName)?.next({ message, user: this.fakeUserID });
  }

  onMessageReceived(room: string, res: ChatMessage) {
    console.log(res);
    this.messageSubscription.next({ room, message: res });
  }
}
