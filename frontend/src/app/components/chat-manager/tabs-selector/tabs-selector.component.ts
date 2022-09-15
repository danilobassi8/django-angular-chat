import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs-selector',
  templateUrl: './tabs-selector.component.html',
  styleUrls: ['./tabs-selector.component.scss'],
})
export class TabsSelectorComponent implements OnInit {
  @Input() openChats: string[] = [];
  @Input() activeChat: string = '';

  @Output() tabClosed = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  closeTab(ev: Event, chat: string) {
    // to avoid triggering default anchor actions (routing)
    ev.preventDefault();
    ev.stopPropagation();
    this.tabClosed.emit(chat);
  }

}
