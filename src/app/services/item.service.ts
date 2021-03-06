import { Injectable } from '@angular/core';
import { Item } from '../classes/item';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Reserve } from '../classes/reserve';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemCollection: AngularFirestoreCollection<Item>;
  reserveCollection: AngularFirestoreCollection<Reserve>;
  items: Item[] = [];
  reserves: Reserve[] = [];

  constructor(private db: AngularFirestore) {
    this.itemCollection = db.collection<Item>('items');
    this.itemCollection.valueChanges().subscribe((val) => {
      this.items = val;
    });

    this.reserveCollection = db.collection('reserves');
    this.reserveCollection.valueChanges().subscribe((val) => {
      val.map((r: any) => {
        r.item.get().then((data: DocumentSnapshot<Item>) => {
          // This makes the DocumentReference into an Item, its a little hacky.
          r.item = data.data();
        });
        r.date = r.date.toDate();
      });
      this.reserves = val;
    });
  }

  public getItems(): Item[] {
    return this.items;
  }

  public deleteItem(item: Item): void {
    // First delete all reserves with the item
    this.reserveCollection.ref.where('item', '==', item.id).get().then((query: QuerySnapshot<Reserve>) => {
      console.log('Query: ', query);
      query.docs.forEach((doc) => {
        console.log('Item', doc);
        // Delete each item
        doc.ref.delete();
      });
      // Finally delete the item
      item.id.delete();
    });
  }

  public addItem(item_name: string): void {
    this.itemCollection.add({ name: item_name }).then((doc) => {
      // Add its own ID to make deleting easier. Also makes requesting items easier.
      doc.update({ id: doc });
    }, (reason) => {
      console.log('Error adding item', reason);
    });
  }

  public reserveItem(item_id: string, person: string, day: Date, start_time: string, end_time: string): void {
    this.reserveCollection.add({
      item: this.db.doc<Item>(item_id).ref,
      person: person,
      date: day,
      time_start: start_time,
      time_end: end_time
    }).then((doc) => {
      doc.update({ id: doc });
    });
  }

  public getReservesForDay(day: Date): Reserve[] {
    return this.reserves.filter((r) => {
      return r.date.getTime() === day.getTime();
    });
  }

  public deleteReserve(r: Reserve): void {
    r.id.delete();
  }
}
