import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

const assertItemUpdate = (items1: Item[], items2: Item[]): void  => {
    const gildedRose = new GildedRose(items1)
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems).to.deep.equal(items2)
}

describe('Gilded Rose', function () {
    describe('Regular items', () => {
        it('Should decrease quality' ,() => {
            assertItemUpdate(
                [ new Item("+5 Dexterity Vest", 10, 20) ],
                [ new Item("+5 Dexterity Vest", 9, 19) ]
            )
        })

        it('Should decrease quality twice as fast when sell in date has passed' ,() => {
            assertItemUpdate(
                [ new Item("+5 Dexterity Vest", 0, 20) ],
                [ new Item("+5 Dexterity Vest", -1, 18) ]
            )
        })

        it('Should not decrease quality when quality already 0' ,() => {
            assertItemUpdate(
                [ new Item("+5 Dexterity Vest", 0, 0) ],
                [ new Item("+5 Dexterity Vest", -1, 0) ]
            )
        })
    })

    describe('Aged brie', () => {
        it('Aged brie, should increase in quality' ,() => {
            assertItemUpdate(
                [ new Item("Aged Brie", 20, 20) ],
                [ new Item("Aged Brie", 19, 21) ]
            )
        })


        it('Item quality should never be above fifty' ,() => {
            assertItemUpdate(
                [ new Item("Aged Brie", 20, 50) ],
                [ new Item("Aged Brie", 19, 50) ]
            )
        })
    })

    describe('Sulfuras', () => {
        it('Sulfuras should never degrade or have to be sold' ,() => {
            assertItemUpdate(
                [ new Item('Sulfuras, Hand of Ragnaros', 20, 50) ],
                [ new Item('Sulfuras, Hand of Ragnaros', 20, 50) ]
            )
        })
    })

    describe('Backstage passes', () => {
        describe('Increase in value', () => {
            it('By 1 when there are more than 10 days before the event', () => {
                assertItemUpdate(
                    [ new Item('Backstage passes to a concert', 20, 30) ],
                    [ new Item('Backstage passes to a concert', 19, 31) ]
                )
            })

            it('By 2 when there are more than 5 but less than or equal to 10 days before the event', () => {
                assertItemUpdate(
                    [ new Item('Backstage passes to a random concert', 10, 30) ],
                    [ new Item('Backstage passes to a random concert', 9, 32) ]
                )
            })

            it('By 3 when there are more than 0 but less than or equal to 5 days before the event', () => {
                assertItemUpdate(
                    [ new Item('Backstage passes to a specific concert', 5, 30) ],
                    [ new Item('Backstage passes to a specific concert', 4, 33) ]
                )
            })
        })

        it('Value drops to 0 after the concert', () => {
            assertItemUpdate(
                [ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30) ],
                [ new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0) ]
            )
        })
    })

    describe('Conjured items', () => {
        it('Should decrease in value by 2 each day', () => {
            assertItemUpdate(
                [ new Item('Conjured loin cloth', 20, 30) ],
                [ new Item('Conjured loin cloth', 19, 28) ]
            )
        })
    })
});
