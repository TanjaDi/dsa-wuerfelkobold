import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';

export class Weapon {
    name: string;
    tp: {
        dice: number;
        modifier: number;
    };
    at: number;
    pa: number;
}

@Injectable({
    providedIn: 'root',
})
export class WeaponService {
    private readonly PLAYER_WEAPONS = 'player-weapons';
    private weapons$: BehaviorSubject<Weapon[]>;

    constructor(private localStorageService: LocalStorageService) {
        this.weapons$ = new BehaviorSubject([]);
        const playerWeaponsString = this.localStorageService.get(this.PLAYER_WEAPONS);
        if (playerWeaponsString?.length > 0) {
            this.weapons$.next(JSON.parse(playerWeaponsString));
        }
    }

    getWeapons(): Observable<Weapon[]> {
        return this.weapons$.asObservable();
    }

    addWeapon(): void {
        const weapons = this.weapons$.getValue();
        weapons.push({
            name: undefined,
            tp: { dice: 1, modifier: 0 },
            at: 0,
            pa: 0,
        });
        this.weapons$.next(weapons);
    }

    saveWeapons(weapons: Weapon[]): void {
        this.weapons$.next(weapons);
        this.localStorageService.store(this.PLAYER_WEAPONS, JSON.stringify(weapons));
    }

    removeAllWeapons(): void {
        this.weapons$.next([]);
        this.localStorageService.store(this.PLAYER_WEAPONS, JSON.stringify([]));
    }
}
