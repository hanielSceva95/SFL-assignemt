import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsViewComponent } from './pages/maps-view/maps-view.component';
import { StoresViewComponent } from './pages/stores-view/stores-view.component';

const routes: Routes = [
  //HOME PAGE
  { path: '', component: StoresViewComponent },

  // PATH FOR MAPS PAGE
  { path: 'maps', component: MapsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
