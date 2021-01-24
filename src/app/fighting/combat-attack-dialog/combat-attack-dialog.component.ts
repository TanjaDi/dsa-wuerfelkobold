import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiceResultEnum } from 'src/app/model/DiceRollResult';
import { DiceRollService } from 'src/app/service/dice-roll.service';
import { Weapon } from '../service/weapon.service';

export interface CombatAttackDialogData {
    weapon: Weapon;
}

@Component({
    templateUrl: 'combat-attack-dialog.component.html',
    styleUrls: ['./combat-attack-dialog.component.scss'],
})
export class CombatAttackDialogComponent {
    diceResultEnum = DiceResultEnum;
    weapon: Weapon;
    modifier = 0;
    isAttackSuccess: boolean;
    attackResult: number;
    hitpointsDiceResults: number[] = [];
    hitpointsSum: number;
    attackResultType: DiceResultEnum;

    constructor(
        public dialogRef: MatDialogRef<CombatAttackDialogComponent>,
        private diceRollService: DiceRollService,
        @Inject(MAT_DIALOG_DATA) public data: CombatAttackDialogData
    ) {
        this.weapon = data.weapon;
        this.attackResult = this.diceRollService.getRandomValueForDice('D20');
        this.attackResultType = this.getAttackResultType(this.attackResult, this.weapon.at, this.modifier);
        this.isAttackSuccess =
            this.attackResultType === DiceResultEnum.SUCCESS || this.attackResultType === DiceResultEnum.GRAND_SUCCESS;

        Array.from(Array(this.weapon.tp.dice)).forEach(() => {
            this.hitpointsDiceResults.push(this.diceRollService.getRandomValueForDice('D6'));
        });
        this.hitpointsSum = this.weapon.tp.modifier;
        this.hitpointsDiceResults.forEach((hitpointDice) => {
            this.hitpointsSum += hitpointDice;
        });
    }

    private getAttackResultType(attackResult: number, weaponAttackValue: number, modifier: number): DiceResultEnum {
        if (attackResult <= weaponAttackValue + modifier) {
            if (attackResult === 1) {
                return DiceResultEnum.GRAND_SUCCESS;
            }
            return DiceResultEnum.SUCCESS;
        } else {
            if (attackResult === 20) {
                return DiceResultEnum.TOTAL_FAILURE;
            }
            return DiceResultEnum.FAILURE;
        }
    }

    onChangeModifier(): void {
        this.attackResultType = this.getAttackResultType(this.attackResult, this.weapon.at, this.modifier);
        this.isAttackSuccess =
            this.attackResultType === DiceResultEnum.SUCCESS || this.attackResultType === DiceResultEnum.GRAND_SUCCESS;
    }
}
