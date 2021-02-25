import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfigData, ConfigExportImportService } from './../service/config-export-import.service';
import { ThemeService } from './../service/theme.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    @Output()
    closeDrawer: EventEmitter<void>;

    isDarkTheme$: Observable<boolean>;
    uploadedFile: File;
    userLanguage: 'en' | 'de';
    readonly languages = ['de', 'en'];

    constructor(
        private translateService: TranslateService,
        private configExportImportService: ConfigExportImportService,
        private matSnackBar: MatSnackBar,
        private themeService: ThemeService
    ) {
        this.userLanguage = this.translateService.currentLang.includes('de') ? 'de' : 'en';
        this.closeDrawer = new EventEmitter();
    }

    ngOnInit() {
        this.isDarkTheme$ = this.themeService.isDarkTheme$;
    }

    onChangeLanguage(event: MatRadioChange) {
        const newLanguage = event.value;
        this.translateService.use(newLanguage);
    }

    onCloseDrawer(): void {
        this.closeDrawer.emit();
    }

    toggleDarkTheme(isChecked: boolean): void {
        this.themeService.setDarkTheme(isChecked);
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

    onChangeDropzone(event: NgxDropzoneChangeEvent): void {
        this.uploadedFile = event.addedFiles.find((f) => f);
        if (this.uploadedFile) {
            this.configExportImportService.importUploadedFile(this.uploadedFile);
        } else if (event.rejectedFiles.length > 0) {
            const rejectedFile = event.rejectedFiles.find((f) => f);
            const reason = (rejectedFile as any).reason;
            this.translateService
                .get('SETTINGS.IMPORT_EXPORT.ERRORS.UPLOAD_FAILED', { reason })
                .pipe(take(1))
                .subscribe((errorMessage) => {
                    this.matSnackBar.open(errorMessage, '', {
                        duration: 7000,
                    });
                });
        }
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
