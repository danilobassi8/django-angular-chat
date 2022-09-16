import { ChatService } from './../../services/chat.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

const DEFAULT_WELCOME_CHANNEL = 'welcome';

@Component({
  selector: 'app-chat-manager',
  templateUrl: './chat-manager.component.html',
  styleUrls: ['./chat-manager.component.scss'],
})
export class ChatManagerComponent implements OnInit, OnChanges {
  openChats: string[] = ['a', 'b', 'c', 'd', 'e'];
  chatMessages: Map<string, any[]> = new Map();

  currentMsg = '';
  activeChat = '';
  counter = this.openChats.length + 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnChanges(change: SimpleChanges) {
    console.log({ change });
  }

  ngOnInit(): void {
    // subscribe to Web socket messages
    this.chatService.messageSubscription.subscribe(({ room, message }) => {
      this.addMessageToChat(room, message);
    });

    this.route.paramMap.subscribe((data: ParamMap) => {
      this.activeChat = data.get('activeChat') || DEFAULT_WELCOME_CHANNEL;
      if (!this.openChats.includes(this.activeChat)) {
        this.openChats.push(this.activeChat);
      }

      this.chatService.enterRoom(this.activeChat);
    });
  }

  onTabClosed(chatName: string) {
    // if no chat to redirect, go to the welcome channel
    const index = this.openChats.findIndex((e) => e === chatName);

    if (index == -1) return;

    this.openChats.splice(index, 1);

    if (this.activeChat == chatName) {
      // pick a new room
      let newChatRoom: string;
      if (this.openChats[index]) {
        newChatRoom = this.openChats[index];
      } else {
        newChatRoom = index !== 0 ? this.openChats[index - 1] : DEFAULT_WELCOME_CHANNEL;
      }
      this.router.navigateByUrl(`/chat/${newChatRoom}`);
    }
    this.chatService.exitRoom(chatName);
  }

  addTab(event: MouseEvent) {
    this.openChats.push((this.counter++).toString());
    event.preventDefault();
  }

  getChatMessages(chatName: string) {
    return this.chatMessages.get(chatName) || [];
  }

  sendMsg(activeChat: string, currentMsg: string) {
    this.currentMsg = '';
    this.chatService.emit(activeChat, currentMsg);
  }

  private addMessageToChat(room: string, message: string) {
    if (room === this.activeChat) {
      const msgs = this.chatMessages.get(room) || [];
      msgs.push(message);
      this.chatMessages.set(room, msgs);
    }
  }
}
