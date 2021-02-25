import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
    private changesSubject: Subject<string>;

    constructor() {
        this.changesSubject = new Subject<string>();
    }

    changes(key: string): Observable<string> {
        return this.changesSubject.pipe(
            filter((changedKey) => changedKey === key),
            map((changedKey) => this.get(changedKey))
        );
    }

    store(key: string, value: string, options?: { noEmit: boolean }): void {
        const previousValue = this.get(key);
        if (previousValue !== value) {
            localStorage.setItem(this.APP_PREFIX + key.toLowerCase(), value);
            if (options?.noEmit !== true) {
                this.changesSubject.next(key);
            }
        }
    }

    get(key: string): string | null {
        return localStorage.getItem(this.APP_PREFIX + key.toLowerCase());
    }
}
