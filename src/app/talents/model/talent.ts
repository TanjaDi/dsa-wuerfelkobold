import { Observable } from 'rxjs';
import { AttributeId } from '../../attributes/model/attribute';

export class Talent {
    constructor(
        public readonly id: TalentId,
        public readonly attributes: AttributeId[],
        public readonly category: TalentCategory,
        public skillCheckAttributes: Observable<string>,
        public skillCheckSum: number,
        public value: number
    ) {}
}

export enum TalentCategory {
    PHYSICAL,
    SOCIAL,
    NATURE,
    KNOWLEGE,
    CRAFTING,
}

export enum TalentId {
    FLY = 'FLY',
    JUGGLERIES = 'JUGGLERIES',
    CLIMB = 'CLIMB',
    BODY_CONTROL = 'BODY_CONTROL',
    EXERTION = 'EXERTION',
    RIDE = 'RIDE',
    SWIM = 'SWIM',
    SELF_POSSESSION = 'SELF_POSSESSION',
    SING = 'SING',
    PERCEPTION = 'PERCEPTION',
    DANCE = 'DANCE',
    THEFT = 'THEFT',
    HIDE = 'HIDE',
    CAROUSE = 'CAROUSE',

    CONVERT = 'CONVERT',
    ENCHANT = 'ENCHANT',
    INTIMIDATE = 'INTIMIDATE',
    ETICETTE = 'ETICETTE',
    STREET_WISDOM = 'STREET_WISDOM',
    HUMAN_NATURE = 'HUMAN_NATURE',
    FAST_TALK = 'FAST_TALK',
    DISGUISE = 'DISGUISE',
    WILLPOWER = 'WILLPOWER',

    TRACK = 'TRACK',
    TYING_UP = 'TYING_UP',
    FISH = 'FISH',
    ORIENTATION = 'ORIENTATION',
    HERBALISM = 'HERBALISM',
    ANIMAL_SCIENCE = 'ANIMAL_SCIENCE',
    SURVIVAL = 'SURVIVAL',

    GAMING = 'GAMING',
    GEOGRAPHY = 'GEOGRAPHY',
    HISTORICAL_KNOWLEDGE = 'HISTORICAL_KNOWLEDGE',
    RELIGIONS_LORE = 'RELIGIONS_LORE',
    MARTIAL_ARTS = 'MARTIAL_ARTS',
    MAGIC_LORE = 'MAGIC_LORE',
    MECHANICS = 'MECHANICS',
    CALCULATE = 'CALCULATE',
    LEGAL_STUDIES = 'LEGAL_STUDIES',
    FOLK_LORE = 'FOLK_LORE',
    SPHERE_KNOWLEDGE = 'SPHERE_KNOWLEDGE',
    ASTRONOMY = 'ASTRONOMY',

    ALCHEMY = 'ALCHEMY',
    BOATS_SHIPS = 'BOATS_SHIPS',
    VEHICLES = 'VEHICLES',
    TRADE = 'TRADE',
    MEDICIN_POISON = 'MEDICIN_POISON',
    TREAT_ILLNESS = 'TREAT_ILLNESS',
    MEDICIN_SOUL = 'MEDICIN_SOUL',
    TREAT_WOUNDS = 'TREAT_WOUNDS',
    WOODCRAFT = 'WOODCRAFT',
    FOOD_PROCESSING = 'FOOD_PROCESSING',
    LEATHERCRAFT = 'LEATHERCRAFT',
    PAINT_DRAW = 'PAINT_DRAW',
    METAL_WORKING = 'METAL_WORKING',
    MUSIC = 'MUSIC',
    LOCKPICKING = 'LOCKPICKING',
    STONE_PROCESSING = 'STONE_PROCESSING',
    FABRIC_PROCESSING = 'FABRIC_PROCESSING',
}
