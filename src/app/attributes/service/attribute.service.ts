import { AttributeId, Attribute } from './../model/attribute';
import { LocalStorageService } from './../../service/local-storage.service';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ATTRIBUTES: Attribute[] = [
    {
        id: AttributeId.COURAGE,
        color: 'red',
        value: undefined,
    },
    {
        id: AttributeId.CLEVERNESS,
        color: 'blueviolet',
        value: undefined,
    },
    {
        id: AttributeId.INTUITION,
        color: 'green',
        value: undefined,
    },
    {
        id: AttributeId.CHARISMA,
        color: 'darkblue',
        value: undefined,
    },
    {
        id: AttributeId.DEXTERITY,
        color: 'yellow',
        value: undefined,
    },
    {
        id: AttributeId.AGILITY,
        color: 'cornflowerblue',
        value: undefined,
    },
    {
        id: AttributeId.CONSTITUTION,
        color: 'lightpink',
        value: undefined,
    },
    {
        id: AttributeId.STRENGTH,
        color: 'chocolate',
        value: undefined,
    },
];

@Injectable({
    providedIn: 'root',
})
export class AttributeService {
    private static readonly INITAL_ATTRIBUTE_VALUE = 12;
    private currentAttributes: Attribute[];

    constructor(private localStorageService: LocalStorageService, private translateService: TranslateService) {
        this.loadAttributes();
    }

    private loadAttributes() {
        const storedAttributeValues = this.localStorageService.get(LocalStorageService.PLAYER_ATTRIBUTE_VALUES);
        let storedAttributeMap: { [key in AttributeId]: number };
        if (storedAttributeValues != null) {
            storedAttributeMap = JSON.parse(storedAttributeValues);
        } else {
            storedAttributeMap = ATTRIBUTES.reduce(
                (previous, attribute) => ({
                    ...previous,
                    [attribute.id]: AttributeService.INITAL_ATTRIBUTE_VALUE,
                }),
                {} as { [key in AttributeId]: number }
            );
            this.localStorageService.store(LocalStorageService.PLAYER_ATTRIBUTE_VALUES, JSON.stringify(storedAttributeMap));
        }
        this.currentAttributes = ATTRIBUTES.map((attribute) => {
            attribute.value = storedAttributeMap[attribute.id];
            return attribute;
        });
    }

    getAttributes(): Attribute[] {
        return this.currentAttributes;
    }

    saveAttributes(attributes: Attribute[]): void {
        this.currentAttributes = attributes;
        const attributesValueMap: { [key in AttributeId]: number } = ATTRIBUTES.reduce((previous, attribute) => {
            const newAttribute = attributes.find((newAttr) => newAttr.id === attribute.id);
            return {
                ...previous,
                [attribute.id]: newAttribute?.value || AttributeService.INITAL_ATTRIBUTE_VALUE,
            };
        }, {} as { [key in AttributeId]: number });
        this.localStorageService.store(LocalStorageService.PLAYER_ATTRIBUTE_VALUES, JSON.stringify(attributesValueMap));
    }

    formatAttributeSkillCheck(attributeIds: AttributeId[]): Observable<string> {
        const translatedAttributeNames$ = attributeIds.map((attributeId) => this.getAbbreviationForAttributeId(attributeId));
        return forkJoin(translatedAttributeNames$).pipe(map((res) => res.join(' ')));
    }

    calcSkillCheckSum(attributeIds: AttributeId[]): number {
        return attributeIds
            .map((attributeId) => this.getValueForAttributeId(attributeId))
            .reduce((prev, current) => prev + current);
    }

    getValueForAttributeId(attributeId: AttributeId): number {
        return ATTRIBUTES.find((attr) => attr.id === attributeId).value;
    }

    private getAbbreviationForAttributeId(attributeId: AttributeId): Observable<string> {
        return this.translateService.get('ATTRIBUTES.ABBR.' + attributeId);
    }
}
