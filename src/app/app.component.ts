import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { LocalStorageService } from './service/local-storage.service';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    title: string;
    editMode: boolean;

    private saveSubject: Subject<void>;
    private subscriptions: Subscription[];

    constructor(private localStorageService: LocalStorageService, private translateService: TranslateService) {
        this.translateService.setDefaultLang('de');
        this.translateService.use('de');

        this.editMode = false;
        this.saveSubject = new Subject();
        this.subscriptions = [];
        this.title = this.localStorageService.get(LocalStorageService.PLAYER_CHARACTER_NAME) || '';
        this.subscriptions.push(
            this.localStorageService.changes(LocalStorageService.PLAYER_CHARACTER_NAME).subscribe((newName) => {
                this.title = newName;
            })
        );
    }

    onToggleEditMode(): void {
        if (this.editMode) {
            this.localStorageService.store(LocalStorageService.PLAYER_CHARACTER_NAME, this.title, { noEmit: true });
            this.saveSubject.next();
        }
        this.editMode = !this.editMode;
    }

    getSave$(): Observable<void> {
        return this.saveSubject.asObservable();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
