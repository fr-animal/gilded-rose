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

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

const isItemOfName = (name: string) => (item: Item) => item.name === name;

const isAgedBrie = isItemOfName(AGED_BRIE);
const isBackStagePasses = isItemOfName(BACKSTAGE_PASSES);
const isSulfuras = isItemOfName(SULFURAS);

const isLegendaryItem = isSulfuras

const modifyQualityBy = (amount: number) => (item: Item): void => { item.quality += amount }
const decreaseQualityBy1 = modifyQualityBy( -1)
const increaseQualityBy1 = modifyQualityBy( 1)

const ageItem = (item: Item) => { item.sellIn -= 1 }
const itemQualityLessThan50 = (item: Item) => item.quality < 50

const ageBackstagePasses = (item: Item) => {
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

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {

        for (let i = 0; i < this.items.length; i++) {
            const currentItem = this.items[i]

            const currentItemIsBackstagePasses = isBackStagePasses(currentItem)
            const currentItemIsAgedBrie = isAgedBrie(currentItem)
            const currentItemIsLegendary = isLegendaryItem(currentItem)

            const currentItemQualityLessThan50 = currentItem.quality < 50
            const currentItemQualityGreaterThan0 = currentItem.quality > 0

            const qualityDecreasesWithTime = !currentItemIsAgedBrie && !currentItemIsBackstagePasses && !currentItemIsLegendary

            if (qualityDecreasesWithTime) {
                if (currentItemQualityGreaterThan0) {
                    decreaseQualityBy1(currentItem)
                }
            } else {
                if (currentItemQualityLessThan50) {
                    if (currentItemIsBackstagePasses) {
                        ageBackstagePasses(currentItem)
                    } else {
                        increaseQualityBy1(currentItem)
                    }
                }
            }

            if (!currentItemIsLegendary) {
                ageItem(currentItem)
            }

            const currentItemIsPastSellByDate = currentItem.sellIn < 0

            if (currentItemIsPastSellByDate) {
                if (!currentItemIsAgedBrie) {
                    if (!currentItemIsBackstagePasses) {
                        if (currentItemQualityGreaterThan0) {
                            if (!currentItemIsLegendary) {
                                decreaseQualityBy1(currentItem)
                            }
                        }
                    } else {
                        currentItem.quality = currentItem.quality - currentItem.quality
                    }
                } else {
                    if (currentItemQualityLessThan50) {
                        increaseQualityBy1(currentItem)
                    }
                }
            }
        }

        return this.items;
    }
}
