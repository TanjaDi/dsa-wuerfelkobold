import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AttributeId } from '../attributes/model/attribute';
import { Weapon } from '../fighting/service/weapon.service';
import { TalentId } from '../talents/model/talent';

export interface ConfigData {
    version: string;
    characterName: string;
    attributes: { [key in AttributeId]: number };
    talents: { [key in TalentId]: number };
    combatAttributes: {
        dodging: number;
        initiative: number;
    };
    combatWeapons: Weapon[];
}

@Injectable({
    providedIn: 'root',
})
export class ConfigExportImportService {
    private static readonly CURRENT_CONFIG_VERSION = '1.0';

    constructor(private localStorageService: LocalStorageService) {}

    export(): ConfigData {
        const characterName = this.localStorageService.get(LocalStorageService.PLAYER_CHARACTER_NAME);
        const attributes: { [key in AttributeId]: number } = this.getParsedDataFromLocalStorage(
            LocalStorageService.PLAYER_ATTRIBUTE_VALUES
        );
        const talents: { [key in TalentId]: number } = this.getParsedDataFromLocalStorage(
            LocalStorageService.PLAYER_ATTRIBUTE_VALUES
        );
        const combatAttributes: { dodging: number; initiative: number } = this.getParsedDataFromLocalStorage(
            LocalStorageService.PLAYER_COMBAT_ATTRIBUTES
        );
        const combatWeapons: Weapon[] = this.getParsedDataFromLocalStorage(LocalStorageService.PLAYER_WEAPONS);
        return {
            version: ConfigExportImportService.CURRENT_CONFIG_VERSION,
            characterName,
            attributes,
            talents,
            combatAttributes,
            combatWeapons,
        };
    }

    private getParsedDataFromLocalStorage(key: string): any {
        return JSON.parse(this.localStorageService.get(key));
    }
}
