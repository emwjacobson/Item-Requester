import { Injectable } from '@angular/core';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [
    { name: 'Item1' },
    { name: 'Item2' },
    { name: 'Item3' }
  ];

  constructor() { }

  public getItems(): Item[] {
    return this.items;
  }

  public deleteItem(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  public addItem(item: String) {
    this.items.push({ name: item });
  }
}
