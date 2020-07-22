import { compose } from "../utils";

import {
    adjustBackstagePasses,
    cloneItem,
    decreaseQualityBy1,
    getCurrentItemAgeBy,
    increaseQualityBy1,
    isAgedBrie,
    isBackStagePasses,
    isConjuredItem,
    isLegendaryItem,
    modifyQualityBy
} from "./utils";

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items = this.items.map(compose<Item>(adjustCurrentAgedItemQuality, ageCurrentItem, adjustCurrentItemQuality))

        return this.items
    }
}

const adjustCurrentItemQuality = (item: Item): Item => {
    const newItem = cloneItem(item)
    const currentItemIsBackstagePasses = isBackStagePasses(newItem)
    const currentItemIsAgedBrie = isAgedBrie(newItem)
    const currentItemIsLegendary = isLegendaryItem(newItem)

    const currentItemQualityLessThan50 = newItem.quality < 50
    const currentItemQualityGreaterThan0 = newItem.quality > 0

    const qualityDecreasesWithTime = !currentItemIsAgedBrie && !currentItemIsBackstagePasses && !currentItemIsLegendary

    if (qualityDecreasesWithTime) {
        if (currentItemQualityGreaterThan0) {
            modifyQualityBy(isConjuredItem(item) ? -2 : -1)(newItem)
        }
    } else {
        if (currentItemQualityLessThan50) {
            if (currentItemIsBackstagePasses) {
                adjustBackstagePasses(newItem)
            } else {
                increaseQualityBy1(newItem)
            }
        }
    }

    return newItem
}

const ageCurrentItem = (item: Item): Item => {
    const newItem = cloneItem(item)
    newItem.sellIn -= getCurrentItemAgeBy(item)
    return newItem
}

const adjustCurrentAgedItemQuality = (item: Item): Item => {
    const newItem = cloneItem(item)
    const currentItemIsBackstagePasses = isBackStagePasses(newItem)
    const currentItemIsAgedBrie = isAgedBrie(newItem)
    const currentItemIsLegendary = isLegendaryItem(newItem)

    const currentItemQualityLessThan50 = newItem.quality < 50
    const currentItemQualityGreaterThan0 = newItem.quality > 0

    const currentItemIsPastSellByDate = newItem.sellIn < 0
    if (currentItemIsPastSellByDate) {
        if (!currentItemIsAgedBrie) {
            if (!currentItemIsBackstagePasses) {
                if (currentItemQualityGreaterThan0 && !currentItemIsLegendary) {
                    decreaseQualityBy1(newItem)
                }
            } else {
                newItem.quality = newItem.quality - newItem.quality
            }
        } else {
            if (currentItemQualityLessThan50) {
                increaseQualityBy1(newItem)
            }
        }
    }

    return newItem
}
