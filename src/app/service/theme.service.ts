import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private darkTheme$: BehaviorSubject<boolean>;
    isDarkTheme$: Observable<boolean>;

    constructor(private localStorageService: LocalStorageService) {
        const themeStringFromLocalStorage = this.localStorageService.get(LocalStorageService.SETTING_THEME);
        this.darkTheme$ = new BehaviorSubject<boolean>(themeStringFromLocalStorage === 'light' ? false : true);
        this.isDarkTheme$ = this.darkTheme$.asObservable();
    }

    setDarkTheme(isDarkTheme: boolean): void {
        this.darkTheme$.next(isDarkTheme);
        this.localStorageService.store(LocalStorageService.SETTING_THEME, isDarkTheme ? 'dark' : 'light');
    }
}
