import { Injectable } from '@angular/core';
import { Item } from '../classes/item';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemCollection: AngularFirestoreCollection<Item>;
  items: Item[] = [];

  constructor(private db: AngularFirestore) {
    this.itemCollection = db.collection<Item>('items');
    this.itemCollection.valueChanges().subscribe((val) => {
      this.items = val;
    });
  }

  public getItems(): Item[] {
    return this.items;
  }

  public deleteItem(item: Item) {
    // Need to query for the item
    item.id.delete();
  }

  public addItem(item_name: string) {
    this.itemCollection.add({ name: item_name }).then((doc) => {
      // Add its own ID to make deleting easier. Also makes requesting items easier.
      doc.update({ id: doc });
    }, (reason) => {
      console.log('Error adding item', reason);
    });
  }
}
