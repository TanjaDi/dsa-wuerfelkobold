import { DiceRollService } from '../../service/dice-roll.service';
import { TalentService } from '../service/talent.service';
import { DiceRollDialogData } from '../talents.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';
import { Attribute, AttributeId } from '../../attributes/model/attribute';
import { DiceResultEnum } from '../../model/DiceRollResult';

@Component({
    templateUrl: 'talent-roll-dialog.component.html',
    styleUrls: ['./talent-roll-dialog.component.scss'],
})
export class TalentRollDialogComponent {
    diceResultEnum = DiceResultEnum;
    attributes: Attribute[];
    talentValue: number;
    diceResult: number[] = [];
    successDices: boolean[] = [];
    result: DiceResultEnum;
    modifier = 0;

    constructor(
        public dialogRef: MatDialogRef<TalentRollDialogComponent>,
        private talentService: TalentService,
        private diceRollService: DiceRollService,
        @Inject(MAT_DIALOG_DATA) public data: DiceRollDialogData
    ) {
        this.attributes = this.talentService.getAttributesForTalent(data.talent);
        this.talentValue = this.talentService.getTalents().find((t) => t.id === data.talent.id).value || 0;
        this.diceResult[0] = this.diceRollService.getRandomValueForDice('D20');
        this.diceResult[1] = this.diceRollService.getRandomValueForDice('D20');
        this.diceResult[2] = this.diceRollService.getRandomValueForDice('D20');
        this.successDices = this.getSuccessDices(this.diceResult, this.attributes);
        this.result = this.getResult(this.diceResult, this.attributes, this.talentValue, this.modifier);
    }

    onChangeModifier(): void {
        this.result = this.getResult(this.diceResult, this.attributes, this.talentValue, this.modifier);
    }

    private getSuccessDices(diceResult: number[], attributes: Attribute[]): boolean[] {
        return [0, 1, 2].map((index) => this.getSuccessDice(diceResult[index], attributes[index].value));
    }
    private getSuccessDice(diceResult: number, attributeValue: number): boolean {
        if (diceResult <= attributeValue) {
            return true;
        } else {
            return false;
        }
    }

    private getResult(diceResult: number[], attributes: Attribute[], talentValue: number, modifier: number): DiceResultEnum {
        let missingPoints = 0;
        [0, 1, 2].forEach((index) => {
            const difference = diceResult[index] - attributes[index].value;
            if (difference > 0) {
                missingPoints += difference;
            }
        });

        if (missingPoints <= talentValue + modifier) {
            if (diceResult.filter((d) => d === 1).length > 1) {
                return DiceResultEnum.GRAND_SUCCESS;
            }
            return DiceResultEnum.SUCCESS;
        } else {
            if (diceResult.filter((d) => d === 20).length > 1) {
                return DiceResultEnum.TOTAL_FAILURE;
            }
            return DiceResultEnum.FAILURE;
        }
    }
}
