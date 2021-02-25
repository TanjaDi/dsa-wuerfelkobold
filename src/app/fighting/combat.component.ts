import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { DiceRollService } from '../service/dice-roll.service';
import { LocalStorageService } from '../service/local-storage.service';
import { CombatAttackDialogComponent, CombatAttackDialogData } from './combat-attack-dialog/combat-attack-dialog.component';
import { Weapon, WeaponService } from './service/weapon.service';

@Component({
    selector: 'app-combat',
    templateUrl: './combat.component.html',
    styleUrls: ['./combat.component.scss'],
})
export class CombatComponent implements OnInit, OnDestroy {
    @Input()
    save: Observable<void>;
    @Input()
    editMode: boolean;

    combatAttributes: {
        dodging: number;
        initiative: number;
    };
    lastDodgingDiceRoll: number;
    lastInitiativeDiceRoll: number;
    weaponsDataSource: MatTableDataSource<Weapon>;
    columnsToDisplay = ['name', 'tp', 'at', 'pa'];

    private subscriptions: Subscription[] = [];

    constructor(
        private weaponService: WeaponService,
        private diceRollService: DiceRollService,
        private localStorageService: LocalStorageService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.weaponService.getWeapons().subscribe((weapons) => {
            this.weaponsDataSource = new MatTableDataSource(weapons);
        });
        this.subscriptions.push(
            this.save.subscribe(() => {
                this.weaponService.saveWeapons(this.weaponsDataSource.data);
                this.saveCombatAttributes();
            })
        );
        const combatAttributesString = this.localStorageService.get(LocalStorageService.PLAYER_COMBAT_ATTRIBUTES);
        this.loadCombatAttributes(combatAttributesString);
        this.subscriptions.push(
            this.localStorageService.changes(LocalStorageService.PLAYER_COMBAT_ATTRIBUTES).subscribe((combatAttributes) => {
                this.loadCombatAttributes(combatAttributes);
            })
        );
    }

    onClickAttack(weapon: Weapon): void {
        const dialogRef = this.dialog.open<CombatAttackDialogComponent, CombatAttackDialogData>(CombatAttackDialogComponent, {
            data: {
                weapon,
            },
            width: '38rem',
        });
        this.subscriptions.push(dialogRef.afterClosed().subscribe());
    }

    onClickParry(weapon: Weapon): void {
        // TODO
    }

    onRollDice(type: 'dodging' | 'initiative'): void {
        if (type === 'initiative') {
            this.lastInitiativeDiceRoll = this.diceRollService.getRandomValueForDice('D6');
        }
        if (type === 'dodging') {
            this.lastDodgingDiceRoll = this.diceRollService.getRandomValueForDice('D20');
        }
    }

    onAddWeapon(): void {
        this.weaponService.addWeapon();
    }

    onRemoveAllWeapons(): void {
        this.weaponService.removeAllWeapons();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    private loadCombatAttributes(combatAttributesString: string) {
        if (combatAttributesString) {
            this.combatAttributes = JSON.parse(combatAttributesString);
        } else {
            this.combatAttributes = {
                dodging: 6,
                initiative: 12,
            };
        }
    }

    private saveCombatAttributes() {
        this.localStorageService.store(LocalStorageService.PLAYER_COMBAT_ATTRIBUTES, JSON.stringify(this.combatAttributes), {
            noEmit: true,
        });
    }
}
