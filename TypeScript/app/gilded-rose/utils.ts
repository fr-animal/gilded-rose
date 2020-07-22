import {Item} from "./gilded-rose";

const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

const isItemOfName = (name: string) => (item: Item) => item.name === name;
const itemNameIncludesString = (against: string) => (item: Item) => !!~item.name.toLowerCase().indexOf(against.toLowerCase())

export const isAgedBrie = isItemOfName(AGED_BRIE);
export const isBackStagePasses = itemNameIncludesString('backstage passes');
export const isSulfuras = isItemOfName(SULFURAS);

export const isLegendaryItem = isSulfuras

export const modifyQualityBy = (amount: number) => (item: Item): void => { item.quality += amount }
export const decreaseQualityBy1 = modifyQualityBy( -1)
export const increaseQualityBy1 = modifyQualityBy( 1)

const itemQualityLessThan50 = (item: Item): boolean => item.quality < 50

export const cloneItem = (item: Item): Item => new Item(item.name, item.sellIn, item.quality)

export const adjustBackstagePasses = (item: Item): void => {
    const hasQualityLessThan50 = itemQualityLessThan50(item)
    if (hasQualityLessThan50) {
        if (item.sellIn > 10) {
            modifyQualityBy(1)(item)
        } else if (item.sellIn > 5) {
            modifyQualityBy(2)(item)
        } else {
            modifyQualityBy(3)(item)
        }
    }
}

export const isConjuredItem = itemNameIncludesString('conjured')

export const getCurrentItemAgeBy = (item: Item): number => {
    if (isLegendaryItem(item)){
        return 0
    }

    return 1
}
