import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AttributeId } from '../attributes/model/attribute';
import { TalentId } from '../talents/model/talent';
import { Weapon } from './../fighting/service/weapon.service';

export interface ConfigData {
    readonly version: string;
    readonly characterName: string;
    readonly attributes: { [key in AttributeId]: number };
    readonly talents: { [key in TalentId]: number };
    readonly combatAttributes: {
        dodging: number;
        initiative: number;
    };
    readonly combatWeapons: Weapon[];
}

@Injectable({
    providedIn: 'root',
})
export class ConfigExportImportService {
    private static readonly CURRENT_CONFIG_VERSION = '1.0';

    constructor(
        private localStorageService: LocalStorageService,
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) {}

    export(): ConfigData {
        const characterName = this.localStorageService.get(LocalStorageService.PLAYER_CHARACTER_NAME) || undefined;
        const attributes: { [key in AttributeId]: number } = this.getParsedDataFromLocalStorage(
            LocalStorageService.PLAYER_ATTRIBUTE_VALUES
        );
        const talents: { [key in TalentId]: number } = this.getParsedDataFromLocalStorage(
            LocalStorageService.PLAYER_TALENT_VALUES
        );
        const combatAttributes: { dodging: number; initiative: number } = this.getParsedDataFromLocalStorage(
            LocalStorageService.PLAYER_COMBAT_ATTRIBUTES
        );
        const combatWeapons: Weapon[] = this.getParsedDataFromLocalStorage(LocalStorageService.PLAYER_WEAPONS);
        const configData: ConfigData = {
            version: ConfigExportImportService.CURRENT_CONFIG_VERSION,
            characterName,
            attributes,
            talents,
            combatAttributes,
            combatWeapons,
        };
        return configData;
    }

    importUploadedFile(uploadedFile: File): void {
        uploadedFile.text().then((content) => {
            this.importConfigData(content);
        });
    }

    private importConfigData(content: string): void {
        const parsedContent = JSON.parse(content);
        if (this.instanceOfConfigData(parsedContent)) {
            if (parsedContent.version === ConfigExportImportService.CURRENT_CONFIG_VERSION) {
                this.storeInLocalStorage(parsedContent.characterName, LocalStorageService.PLAYER_CHARACTER_NAME);
                this.storeInLocalStorage(parsedContent.attributes, LocalStorageService.PLAYER_ATTRIBUTE_VALUES);
                this.storeInLocalStorage(parsedContent.talents, LocalStorageService.PLAYER_TALENT_VALUES);
                this.storeInLocalStorage(parsedContent.combatAttributes, LocalStorageService.PLAYER_COMBAT_ATTRIBUTES);
                this.storeInLocalStorage(parsedContent.combatWeapons, LocalStorageService.PLAYER_WEAPONS);
                this.translateService
                    .get('SETTINGS.IMPORT_EXPORT.INFO.IMPORT_SUCCESS')
                    .pipe(take(1))
                    .subscribe((message) => {
                        this.snackBar.open(message, '', {
                            duration: 5000,
                        });
                    });
            } else {
                this.translateService
                    .get('SETTINGS.IMPORT_EXPORT.ERRORS.VERSION_MISMATCH', {
                        vCurrent: ConfigExportImportService.CURRENT_CONFIG_VERSION,
                        vConfig: parsedContent.version,
                    })
                    .pipe(take(1))
                    .subscribe((message) => {
                        this.snackBar.open(message, '', {
                            duration: 7000,
                        });
                    });
            }
        } else {
            this.translateService
                .get('SETTINGS.IMPORT_EXPORT.ERRORS.NO_VALID_CONFIG_FILE')
                .pipe(take(1))
                .subscribe((message) => {
                    this.snackBar.open(message, '', {
                        duration: 7000,
                    });
                });
        }
    }

    private instanceOfConfigData(object: any): object is ConfigData {
        return 'version' in object;
    }

    private storeInLocalStorage(configDataAttribute: any, key: string): void {
        if (configDataAttribute !== undefined && configDataAttribute !== null) {
            let configDataString;
            if (typeof configDataAttribute === 'string') {
                configDataString = configDataAttribute;
            } else {
                configDataString = JSON.stringify(configDataAttribute);
            }
            if (configDataString?.trim()?.length > 0) {
                this.localStorageService.store(key, configDataString);
            }
        }
    }

    private getParsedDataFromLocalStorage(key: string): any {
        const storageString = this.localStorageService.get(key);
        if (storageString !== null && storageString !== undefined && storageString.trim().length > 0) {
            return JSON.parse(storageString);
        }
        return undefined;
    }
}
