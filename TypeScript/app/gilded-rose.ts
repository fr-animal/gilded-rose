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

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {

        for (let i = 0; i < this.items.length; i++) {
            const currentItem = this.items[i]
            const itemIsBackstagePasses = isBackStagePasses(currentItem)
            const itemIsAgedBrie = isAgedBrie(currentItem)
            const itemIsSulfuras = isSulfuras(currentItem)
            
            if (!itemIsAgedBrie && !itemIsBackstagePasses) {
                if (currentItem.quality > 0) {
                    if (!isSulfuras(currentItem)) {
                        currentItem.quality = currentItem.quality - 1
                    }
                }
            } else {
                if (currentItem.quality < 50) {
                    currentItem.quality = currentItem.quality + 1
                    if (itemIsBackstagePasses) {
                        if (currentItem.sellIn < 11) {
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1
                            }
                        }
                        if (currentItem.sellIn < 6) {
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1
                            }
                        }
                    }
                }
            }
            if (!itemIsSulfuras) {
                currentItem.sellIn = currentItem.sellIn - 1;
            }
            if (currentItem.sellIn < 0) {
                if (!itemIsAgedBrie) {
                    if (!itemIsBackstagePasses) {
                        if (currentItem.quality > 0) {
                            if (!itemIsSulfuras) {
                                currentItem.quality = currentItem.quality - 1
                            }
                        }
                    } else {
                        currentItem.quality = currentItem.quality - currentItem.quality
                    }
                } else {
                    if (currentItem.quality < 50) {
                        currentItem.quality = currentItem.quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
