export class Attribute {
    constructor(public readonly id: AttributeId, public readonly color: string, public value: number) {}
}

export enum AttributeId {
    COURAGE = 'COURAGE',
    CLEVERNESS = 'CLEVERNESS',
    INTUITION = 'INTUITION',
    CHARISMA = 'CHARISMA',
    DEXTERITY = 'DEXTERITY',
    AGILITY = 'AGILITY',
    CONSTITUTION = 'CONSTITUTION',
    STRENGTH = 'STRENGTH',
}
