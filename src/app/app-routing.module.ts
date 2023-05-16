import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { InsertProductComponent } from './components/insert-product/insert-product.component';

const routes: Routes = [
  {path:"", redirectTo:"catalogue", pathMatch:"full"},
  {path:"catalogue", component:CatalogueComponent},
  {path:"dashboard", component:DashboardComponent},
  {path: "insert-product", component:InsertProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
