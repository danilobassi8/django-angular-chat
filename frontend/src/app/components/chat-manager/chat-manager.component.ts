import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-chat-manager',
  templateUrl: './chat-manager.component.html',
  styleUrls: ['./chat-manager.component.scss'],
})
export class ChatManagerComponent implements OnInit {
  openChats: string[] = ['chat', 'chat2'];
  chatMessages: Map<string, any[]> = new Map();

  currentMsg = '';
  activeChat = '';
  counter = this.openChats.length + 1;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data: ParamMap) => {
      this.activeChat = data.get('activeChat') || 'welcome';
      if (!this.openChats.includes(this.activeChat)) {
        this.openChats.push(this.activeChat);
      }

      this.chatService.enterRoom(this.activeChat);
    });
  }

  closeTab(event: MouseEvent, toRemove: string) {
    this.openChats = this.openChats.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
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
    this.appendMessageToChat(activeChat, currentMsg);
  }

  appendMessageToChat(chat: string, msg: string) {
    const msgs = this.chatMessages.get(chat) || [];
    msgs.push(msg);
    this.chatMessages.set(chat, msgs);
  }
}
