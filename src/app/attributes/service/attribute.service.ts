import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './../../service/local-storage.service';
import { Attribute, AttributeId } from './../model/attribute';

const ATTRIBUTES: Attribute[] = [
    {
        id: AttributeId.COURAGE,
        color: '#ff00009c',
        value: undefined,
    },
    {
        id: AttributeId.CLEVERNESS,
        color: '#633790',
        value: undefined,
    },
    {
        id: AttributeId.INTUITION,
        color: '#006500',
        value: undefined,
    },
    {
        id: AttributeId.CHARISMA,
        color: '#00008b9e',
        value: undefined,
    },
    {
        id: AttributeId.DEXTERITY,
        color: '#a5a500',
        value: undefined,
    },
    {
        id: AttributeId.AGILITY,
        color: '#476bab',
        value: undefined,
    },
    {
        id: AttributeId.CONSTITUTION,
        color: '#9c6d74',
        value: undefined,
    },
    {
        id: AttributeId.STRENGTH,
        color: '#7b451e',
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
        const storedAttributeValues = this.localStorageService.get(LocalStorageService.PLAYER_ATTRIBUTE_VALUES);
        this.loadAttributes(storedAttributeValues);

        this.localStorageService.changes(LocalStorageService.PLAYER_ATTRIBUTE_VALUES).subscribe((newAttributes) => {
            this.loadAttributes(newAttributes);
        });
    }

    private loadAttributes(storedAttributeValues: string) {
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
            this.localStorageService.store(LocalStorageService.PLAYER_ATTRIBUTE_VALUES, JSON.stringify(storedAttributeMap), {
                noEmit: true,
            });
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
        this.localStorageService.store(LocalStorageService.PLAYER_ATTRIBUTE_VALUES, JSON.stringify(attributesValueMap), {
            noEmit: true,
        });
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
