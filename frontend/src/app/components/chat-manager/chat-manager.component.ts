import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-manager',
  templateUrl: './chat-manager.component.html',
  styleUrls: ['./chat-manager.component.scss'],
})
export class ChatManagerComponent implements OnInit {
  constructor() {}

  openChats = ['hola', 'hi', 'en'];
  activeChat = this.openChats[0];
  chatMessages: Map<string, any[]> = new Map();

  currentMsg = '';
  counter = this.openChats.length + 1;

  ngOnInit(): void {}

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

  sendMsg(active: string, currentMsg: string) {
    this.currentMsg = '';
    this.appendMessageToChat(active, currentMsg);
  }

  appendMessageToChat(chat: string, msg: string) {
    const msgs = this.chatMessages.get(chat) || [];
    msgs.push(msg);
    this.chatMessages.set(chat, msgs);
  }
}
