import { ThemeService } from './../../../services/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss'],
})
export class ChangeThemeComponent implements OnInit {
  availableThemes: string[] = [];

  constructor(public theme: ThemeService) {}

  ngOnInit(): void {
    this.availableThemes = this.theme.availables;
  }

  getThemeClass(theme: string) {
    // TODO: add if active class
    const obj: any = {};
    obj[`theme-${theme}`] = true;
    return { ...obj };
  }

  changeTheme(theme: string) {
    this.theme.current = theme;
  }
}
