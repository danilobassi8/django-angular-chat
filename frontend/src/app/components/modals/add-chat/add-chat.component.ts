import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'modal-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss'],
})
export class AddChatComponent implements OnInit {
  newChatName = '';

  constructor() {}

  ngOnInit(): void {}
}
