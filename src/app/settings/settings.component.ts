import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { TranslateService } from '@ngx-translate/core';
import { ConfigData, ConfigExportImportService } from './../service/config-export-import.service';

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

    constructor(private translateService: TranslateService, private configExportImportService: ConfigExportImportService) {
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

    downloadConfigData(): void {
        const configObject = this.configExportImportService.export();
        const linkElement = document.createElement('a');
        linkElement.hidden = true;
        linkElement.download = this.getFileName(configObject);
        linkElement.href = this.generateDownloadFile(configObject);
        linkElement.click();
        linkElement.remove();
    }

    private generateDownloadFile(configObject: ConfigData): string {
        const dataString = JSON.stringify(configObject, undefined, 4);
        return 'data:text/json;charset=UTF-8,' + encodeURIComponent(dataString);
    }

    private getFileName(configObject: ConfigData): string {
        const characterName = configObject.characterName || 'unbekannt';
        const today = formatDate(new Date(), 'yyyy-MM-dd', this.getUsersLocale());
        return characterName + '-' + today + '.json';
    }

    private getUsersLocale(defaultValue = 'de-DE'): string {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return defaultValue;
        }
        const wn = window.navigator;
        let lang = wn.languages ? wn.languages[0] : defaultValue;
        lang = lang || wn.language;
        return lang;
    }
}
