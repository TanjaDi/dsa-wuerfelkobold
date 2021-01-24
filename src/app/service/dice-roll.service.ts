import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DiceRollService {
    getRandomValueForDice(dice: 'D20' | 'D6'): number {
        switch (dice) {
            case 'D6':
                return this.getRandomValue(6);
            case 'D20':
                return this.getRandomValue(20);
            default:
                throw new Error('Not implemented');
        }
    }

    private getRandomValue(maxValue: number): number {
        return Math.floor(Math.random() * maxValue) + 1;
    }
}
