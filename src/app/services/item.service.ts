import { Injectable } from '@angular/core';
import { Item } from '../classes/item';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemCollection: AngularFirestoreCollection<Item>;
  reserveCollection: AngularFirestoreCollection;
  items: Item[] = [];

  constructor(private db: AngularFirestore) {
    this.itemCollection = db.collection<Item>('items');
    this.itemCollection.valueChanges().subscribe((val) => {
      this.items = val;
    });

    this.reserveCollection = db.collection('reserves');
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

  public reserveItem(item_id: string, day: number) {
    const date_start = new Date();
    date_start.setDate(day);
    date_start.setHours(13, 0);
    const date_end = new Date();
    date_end.setDate(day);
    date_end.setHours(15, 30);
    this.reserveCollection.add({ start: date_start.getTime() / 1000, end: date_end.getTime() / 1000,
                                 item: this.db.doc<Item>(item_id).ref });
  }
}
