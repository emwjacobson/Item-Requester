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
    this.itemCollection.ref.where('name', '==', item.name).limit(1).get().then((snap) => {
      if (snap.empty) {
        return;
      }
      // Delete using the id
      this.itemCollection.doc(snap.docs[0].id).delete().then((val) => {
        console.log('Item deleted');
      },
      (reason) => {
        console.log('Error Deleting', reason);
      });
    }, (reason) => {
      console.log('Error in query', reason);
    });
  }

  public addItem(item_name: String) {
    this.itemCollection.add({ name: item_name });
  }
}
