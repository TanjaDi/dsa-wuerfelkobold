import { LocalStorageService } from './service/local-storage.service';
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title: string;
    editMode: boolean;

    private readonly LOCAL_STORAGE_KEY_CHARACTER_NAME = 'character-name';
    private saveSubject: Subject<void>;

    constructor(private localStorageService: LocalStorageService, private translateService: TranslateService) {
        this.translateService.setDefaultLang('de');
        this.translateService.use('de');

        this.editMode = false;
        this.saveSubject = new Subject();
        this.title = this.localStorageService.get(this.LOCAL_STORAGE_KEY_CHARACTER_NAME) || '';
    }

    onToggleEditMode(): void {
        if (this.editMode) {
            this.localStorageService.store(this.LOCAL_STORAGE_KEY_CHARACTER_NAME, this.title);
            this.saveSubject.next();
        }
        this.editMode = !this.editMode;
    }

    getSave$(): Observable<void> {
        return this.saveSubject.asObservable();
    }
}
