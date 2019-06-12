import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { ReserveComponent } from './reserve/reserve.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'res', component: ReserveComponent },
  { path: 'items', component: ItemsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
