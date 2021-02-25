import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Attribute, AttributeId } from 'src/app/attributes/model/attribute';
import { AttributeService } from 'src/app/attributes/service/attribute.service';
import { Talent, TalentId } from '../model/talent';
import { LocalStorageService } from './../../service/local-storage.service';
import { TalentCategory } from './../model/talent';

@Injectable({
    providedIn: 'root',
})
export class TalentService {
    private static readonly INITIAL_TALENT_VALUE = 0;
    private readonly ALL_TALENTS: Talent[] = [
        {
            id: TalentId.FLY,
            attributes: [AttributeId.COURAGE, AttributeId.INTUITION, AttributeId.AGILITY],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.JUGGLERIES,
            attributes: [AttributeId.COURAGE, AttributeId.CHARISMA, AttributeId.DEXTERITY],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.CLIMB,
            attributes: [AttributeId.COURAGE, AttributeId.AGILITY, AttributeId.STRENGTH],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.BODY_CONTROL,
            attributes: [AttributeId.AGILITY, AttributeId.AGILITY, AttributeId.CONSTITUTION],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.EXERTION,
            attributes: [AttributeId.CONSTITUTION, AttributeId.STRENGTH, AttributeId.STRENGTH],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.RIDE,
            attributes: [AttributeId.CHARISMA, AttributeId.AGILITY, AttributeId.STRENGTH],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.SWIM,
            attributes: [AttributeId.AGILITY, AttributeId.CONSTITUTION, AttributeId.STRENGTH],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.SELF_POSSESSION,
            attributes: [AttributeId.COURAGE, AttributeId.COURAGE, AttributeId.CONSTITUTION],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.SING,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CHARISMA, AttributeId.CONSTITUTION],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.PERCEPTION,
            attributes: [AttributeId.CLEVERNESS, AttributeId.INTUITION, AttributeId.INTUITION],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.DANCE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CHARISMA, AttributeId.AGILITY],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.THEFT,
            attributes: [AttributeId.COURAGE, AttributeId.DEXTERITY, AttributeId.AGILITY],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.HIDE,
            attributes: [AttributeId.COURAGE, AttributeId.INTUITION, AttributeId.AGILITY],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.CAROUSE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CONSTITUTION, AttributeId.STRENGTH],
            category: TalentCategory.PHYSICAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.CONVERT,
            attributes: [AttributeId.COURAGE, AttributeId.CLEVERNESS, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.ENCHANT,
            attributes: [AttributeId.COURAGE, AttributeId.CHARISMA, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.INTIMIDATE,
            attributes: [AttributeId.COURAGE, AttributeId.INTUITION, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.ETICETTE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.INTUITION, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.STREET_WISDOM,
            attributes: [AttributeId.CLEVERNESS, AttributeId.INTUITION, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.HUMAN_NATURE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.INTUITION, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.FAST_TALK,
            attributes: [AttributeId.COURAGE, AttributeId.INTUITION, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.DISGUISE,
            attributes: [AttributeId.INTUITION, AttributeId.CHARISMA, AttributeId.AGILITY],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.WILLPOWER,
            attributes: [AttributeId.COURAGE, AttributeId.INTUITION, AttributeId.CHARISMA],
            category: TalentCategory.SOCIAL,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.TRACK,
            attributes: [AttributeId.COURAGE, AttributeId.INTUITION, AttributeId.AGILITY],
            category: TalentCategory.NATURE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.TYING_UP,
            attributes: [AttributeId.CLEVERNESS, AttributeId.DEXTERITY, AttributeId.STRENGTH],
            category: TalentCategory.NATURE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.FISH,
            attributes: [AttributeId.DEXTERITY, AttributeId.AGILITY, AttributeId.CONSTITUTION],
            category: TalentCategory.NATURE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.ORIENTATION,
            attributes: [AttributeId.CLEVERNESS, AttributeId.INTUITION, AttributeId.INTUITION],
            category: TalentCategory.NATURE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.HERBALISM,
            attributes: [AttributeId.CLEVERNESS, AttributeId.DEXTERITY, AttributeId.CONSTITUTION],
            category: TalentCategory.NATURE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.ANIMAL_SCIENCE,
            attributes: [AttributeId.COURAGE, AttributeId.COURAGE, AttributeId.CHARISMA],
            category: TalentCategory.NATURE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.SURVIVAL,
            attributes: [AttributeId.COURAGE, AttributeId.AGILITY, AttributeId.CONSTITUTION],
            category: TalentCategory.NATURE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.GAMING,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.GEOGRAPHY,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.HISTORICAL_KNOWLEDGE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.RELIGIONS_LORE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.MARTIAL_ARTS,
            attributes: [AttributeId.COURAGE, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.MAGIC_LORE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.MECHANICS,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.DEXTERITY],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.CALCULATE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.LEGAL_STUDIES,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.FOLK_LORE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.SPHERE_KNOWLEDGE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.ASTRONOMY,
            attributes: [AttributeId.CLEVERNESS, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.KNOWLEGE,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.ALCHEMY,
            attributes: [AttributeId.COURAGE, AttributeId.CLEVERNESS, AttributeId.DEXTERITY],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.BOATS_SHIPS,
            attributes: [AttributeId.DEXTERITY, AttributeId.AGILITY, AttributeId.STRENGTH],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.VEHICLES,
            attributes: [AttributeId.CHARISMA, AttributeId.DEXTERITY, AttributeId.CONSTITUTION],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.TRADE,
            attributes: [AttributeId.CLEVERNESS, AttributeId.INTUITION, AttributeId.CHARISMA],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.MEDICIN_POISON,
            attributes: [AttributeId.COURAGE, AttributeId.CLEVERNESS, AttributeId.INTUITION],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.TREAT_ILLNESS,
            attributes: [AttributeId.COURAGE, AttributeId.INTUITION, AttributeId.CONSTITUTION],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.MEDICIN_SOUL,
            attributes: [AttributeId.INTUITION, AttributeId.CHARISMA, AttributeId.CONSTITUTION],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.TREAT_WOUNDS,
            attributes: [AttributeId.CLEVERNESS, AttributeId.DEXTERITY, AttributeId.DEXTERITY],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.WOODCRAFT,
            attributes: [AttributeId.DEXTERITY, AttributeId.AGILITY, AttributeId.STRENGTH],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.FOOD_PROCESSING,
            attributes: [AttributeId.INTUITION, AttributeId.DEXTERITY, AttributeId.DEXTERITY],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.LEATHERCRAFT,
            attributes: [AttributeId.DEXTERITY, AttributeId.AGILITY, AttributeId.CONSTITUTION],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.PAINT_DRAW,
            attributes: [AttributeId.INTUITION, AttributeId.DEXTERITY, AttributeId.DEXTERITY],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.METAL_WORKING,
            attributes: [AttributeId.DEXTERITY, AttributeId.CONSTITUTION, AttributeId.STRENGTH],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.MUSIC,
            attributes: [AttributeId.CHARISMA, AttributeId.DEXTERITY, AttributeId.CONSTITUTION],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.LOCKPICKING,
            attributes: [AttributeId.INTUITION, AttributeId.DEXTERITY, AttributeId.DEXTERITY],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.STONE_PROCESSING,
            attributes: [AttributeId.DEXTERITY, AttributeId.DEXTERITY, AttributeId.STRENGTH],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
        {
            id: TalentId.FABRIC_PROCESSING,
            attributes: [AttributeId.CLEVERNESS, AttributeId.DEXTERITY, AttributeId.DEXTERITY],
            category: TalentCategory.CRAFTING,
            skillCheckAttributes: undefined,
            skillCheckSum: 0,
            value: undefined,
        },
    ];
    private talents: Talent[];

    constructor(private attributeService: AttributeService, private localStorageService: LocalStorageService) {
        this.ALL_TALENTS.forEach((talent) => {
            talent.skillCheckAttributes = this.attributeService.formatAttributeSkillCheck(talent.attributes);
            talent.skillCheckSum = this.attributeService.calcSkillCheckSum(talent.attributes);
        });
        const storedTalentValues = this.localStorageService.get(LocalStorageService.PLAYER_TALENT_VALUES);
        this.loadTalents(storedTalentValues);
        const talentChanges$ = this.localStorageService.changes(LocalStorageService.PLAYER_TALENT_VALUES);
        const attributeChanges$ = this.localStorageService.changes(LocalStorageService.PLAYER_ATTRIBUTE_VALUES);
        combineLatest([talentChanges$, attributeChanges$]).subscribe(([talentValues, _]) => {
            this.loadTalents(talentValues);
            this.ALL_TALENTS.forEach((talent) => {
                talent.skillCheckAttributes = this.attributeService.formatAttributeSkillCheck(talent.attributes);
                talent.skillCheckSum = this.attributeService.calcSkillCheckSum(talent.attributes);
            });
        });
    }

    private loadTalents(storedTalentValues: string) {
        let storedTalentMap: { [key in TalentId]: number };
        if (storedTalentValues != null) {
            storedTalentMap = JSON.parse(storedTalentValues);
        } else {
            storedTalentMap = this.ALL_TALENTS.reduce(
                (previous, talent) => ({
                    ...previous,
                    [talent.id]: TalentService.INITIAL_TALENT_VALUE,
                }),
                {} as { [key in TalentId]: number }
            );
            this.localStorageService.store(LocalStorageService.PLAYER_TALENT_VALUES, JSON.stringify(storedTalentMap), {
                noEmit: true,
            });
        }
        this.talents = this.ALL_TALENTS.map((talent) => {
            talent.value = storedTalentMap[talent.id];
            return talent;
        });
    }

    getTalents(): Talent[] {
        return this.talents;
    }

    getAttributesForTalent(talent: Talent): Attribute[] {
        return talent.attributes.map((attributeId) => this.attributeService.getAttributes().find((a) => a.id === attributeId));
    }

    saveTalentValues(talents: Talent[]): void {
        this.talents = talents;
        const talentValueMap: { [key in TalentId]: number } = this.ALL_TALENTS.reduce((previous, talent) => {
            const newTalent = this.talents.find((a) => a.id === talent.id);
            return {
                ...previous,
                [talent.id]: newTalent?.value || TalentService.INITIAL_TALENT_VALUE,
            };
        }, {} as { [key in TalentId]: number });
        this.localStorageService.store(LocalStorageService.PLAYER_TALENT_VALUES, JSON.stringify(talentValueMap), {
            noEmit: true,
        });
    }

    private getTalentForTalentId(talentId: TalentId): Talent {
        return this.ALL_TALENTS.filter((talent) => talent.id === talentId).find((talent) => talent != null);
    }
}
