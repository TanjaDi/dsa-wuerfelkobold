import { Component, EventEmitter, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    @Output()
    closeDrawer: EventEmitter<void>;

    userLanguage: 'en' | 'de';
    readonly languages = ['de', 'en'];

    constructor(private translateService: TranslateService) {
        this.userLanguage = this.translateService.currentLang.includes('de') ? 'de' : 'en';
        this.closeDrawer = new EventEmitter();
    }

    onChangeLanguage(event: MatRadioChange) {
        const newLanguage = event.value;
        this.translateService.use(newLanguage);
    }

    onCloseDrawer(): void {
        this.closeDrawer.emit();
    }
}
