import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.less']
})
export class ReserveComponent implements OnInit {

  constructor() {  }

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

}
