import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly APP_PREFIX = 'character-sheet-';

  store(key: string, value: string) {
    localStorage.setItem(this.APP_PREFIX + key.toLowerCase(), value);
  }

  get(key: string): string | null {
    return localStorage.getItem(this.APP_PREFIX + key.toLowerCase());
  }
}
