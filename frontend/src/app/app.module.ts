import { AddChatComponent } from './components/modals/add-chat/add-chat.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatManagerComponent } from './components/chat-manager/chat-manager.component';
import { ChatComponent } from './components/chat-manager/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { TabsSelectorComponent } from './components/chat-manager/tabs-selector/tabs-selector.component';
import { ChangeThemeComponent } from './components/modals/change-theme/change-theme.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatManagerComponent,
    ChatComponent,
    TabsSelectorComponent,
    AddChatComponent,
    ChangeThemeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
