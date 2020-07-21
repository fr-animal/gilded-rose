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
            const itemIsBackstagePasses = isBackStagePasses(this.items[i])
            const itemIsAgedBrie = isAgedBrie(this.items[i])
            const itemIsSulfuras = isSulfuras(this.items[i])
            
            if (!itemIsAgedBrie && !itemIsBackstagePasses) {
                if (this.items[i].quality > 0) {
                    if (!isSulfuras(this.items[i])) {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (itemIsBackstagePasses) {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }
            if (!itemIsSulfuras) {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }
            if (this.items[i].sellIn < 0) {
                if (!itemIsAgedBrie) {
                    if (!itemIsBackstagePasses) {
                        if (this.items[i].quality > 0) {
                            if (!itemIsSulfuras) {
                                this.items[i].quality = this.items[i].quality - 1
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
