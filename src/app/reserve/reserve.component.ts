import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../services/item.service';
import { Item } from '../classes/item';
import { Reserve } from '../classes/reserve';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.less']
})
export class ReserveComponent implements OnInit {
  day: number;
  selected_items: HTMLCollection[];
  person = '';
  start_time = '';
  end_time = '';

  constructor(private modal: NgbModal, private items: ItemService) {  }

  ngOnInit() {
  }

  public getNumDays(): number {
    const date = new Date();
    // Months are 0-based...
    const month = date.getMonth() + 1;
    return new Date(date.getFullYear(), month, 0).getDate();
  }

  // Returns day of the week, 0 is Sunday, 6 is Saturday
  public getFirstDay(): number {
    const date = new Date();
    // Dont 0-base this month because it works.
    const month = date.getMonth();
    return new Date(date.getFullYear(), month, 1).getDay();
  }

  public getMonth(): number[][] {
    let full = Array(this.getNumDays()).fill(0).map((x, i) => i + 1);
    full = Array<number>(this.getFirstDay()).fill(-1).concat(full);
    const split: number[][] = [];
    while (full.length) {
      split.push(full.splice(0, 7));
    }
    return split;
  }

  public openModal(modal: any, day: number) {
    this.day = day;
    this.modal.open(modal).result.then((result) => {
      if (result === 'reserve') {
        const d = new Date();
        d.setDate(day);
        d.setHours(0, 0, 0, 0);
        for (let i = 0; i < this.selected_items.length; i++) {
          this.items.reserveItem((<any>this.selected_items[i]).value, this.person, d, this.start_time, this.end_time);
        }
        this.person = '';
        this.start_time = '';
        this.end_time = '';
      }
     }, (reason) => {});
  }

  public getItems(): Item[] {
    return this.items.getItems().sort((a, b) => {
      if ( a.name < b.name ) {
        return -1;
      } else if (a.name > b.name ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public getReservesForDay(day: number): Reserve[] {
    const d = new Date();
    d.setDate(day);
    d.setHours(0, 0, 0, 0);
    return this.items.getReservesForDay(d).sort((a, b) => {
      // Gotta cheat a little because we make .item (DocumentReference) into an object in item.service
      const ia = (<any>a.item);
      const ib = (<any>b.item);
      if ( ia.name > ib.name ) {
        return 1;
      } else if ( ia.name < ib.name ) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  public deleteReserve(r: Reserve): void {
    this.items.deleteReserve(r);
  }

}
