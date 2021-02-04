import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    public static readonly PLAYER_CHARACTER_NAME = 'player-character-name';
    public static readonly PLAYER_ATTRIBUTE_VALUES = 'player-attribute-values';
    public static readonly PLAYER_TALENT_VALUES = 'player-talent-values';
    public static readonly PLAYER_COMBAT_ATTRIBUTES = 'player-combat-attributes';
    public static readonly PLAYER_WEAPONS = 'player-weapons';
    private readonly APP_PREFIX = 'dsa-wuerfelkobold-';

    store(key: string, value: string): void {
        localStorage.setItem(this.APP_PREFIX + key.toLowerCase(), value);
    }

    get(key: string): string | null {
        return localStorage.getItem(this.APP_PREFIX + key.toLowerCase());
    }
}
