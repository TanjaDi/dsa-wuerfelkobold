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
    private weapons$: BehaviorSubject<Weapon[]>;

    constructor(private localStorageService: LocalStorageService) {
        this.weapons$ = new BehaviorSubject([]);
        const playerWeaponsString = this.localStorageService.get(LocalStorageService.PLAYER_WEAPONS);
        this.initWeapons(playerWeaponsString);
        this.localStorageService.changes(LocalStorageService.PLAYER_WEAPONS).subscribe((playerWeapons) => {
            this.initWeapons(playerWeapons);
        });
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
        this.localStorageService.store(LocalStorageService.PLAYER_WEAPONS, JSON.stringify(weapons), {noEmit: true});
    }

    removeAllWeapons(): void {
        this.weapons$.next([]);
        this.localStorageService.store(LocalStorageService.PLAYER_WEAPONS, JSON.stringify([]), { noEmit: true });
    }

    private initWeapons(playerWeaponsString: string) {
        if (playerWeaponsString?.length > 0) {
            this.weapons$.next(JSON.parse(playerWeaponsString));
        }
    }
}
