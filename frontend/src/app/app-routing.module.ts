import { ChatManagerComponent } from './components/chat-manager/chat-manager.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'chat/welcome', pathMatch: 'full' },
  { path: 'chat/:activeChat', component: ChatManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
