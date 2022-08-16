import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public availables = [
    'default',
    "united",
    'lux',
    'superhero',
    'vapor',
    'cyborg',
    'sketchy',
    'quartz',
    'morph',
  ];
  public static default = 'default';
  public theme = new BehaviorSubject(this.current);
  public URLPrefix = environment.production ? '' : ''; // NOTE: Could differ if you deploy it somewhere

  private themePrefix = 'theme_';
  private readonly style: HTMLLinkElement;

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);

    if (localStorage.getItem('theme') !== undefined) {
      this.style.href = `${this.URLPrefix}/${this.current}.css`;
    }
  }

  public get current(): string {
    return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public set current(value: string) {
    const newStyleHref = `${this.URLPrefix}/${this.themePrefix}${value}.css`;

    fetch(newStyleHref, { mode: 'no-cors' })
      .then((res) => {
        localStorage.setItem('theme', value);
        this.style.href = newStyleHref;
        this.theme.next(value);
      })
      .catch((error) => {
        // if can't fetch the styles css, DO NOT try to update the theme.
      });
  }
}
