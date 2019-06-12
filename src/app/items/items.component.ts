import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../classes/item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less']
})
export class ItemsComponent implements OnInit {
  cur_item: Item;
  add_item = '';

  constructor(private items: ItemService, private modal: NgbModal) { }

  ngOnInit() {
  }

  public getItems(): Item[] {
    return this.items.getItems();
  }

  public deleteItem(modal: any, i: Item) {
    this.cur_item = i;
    this.modal.open(modal).result.then((result) => {
      if (result === 'delete') {
        this.items.deleteItem(i);
      }
     }, (reason) => {});
  }

  public addItem(modal: any) {
    this.modal.open(modal).result.then((result) => {
      if (result === 'add') {
        this.items.addItem(this.add_item);
        this.add_item = '';
      }
    }, (reason) => {});
  }

}
