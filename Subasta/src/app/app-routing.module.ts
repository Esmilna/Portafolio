import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { OfertarComponent } from './pages/ofertar/ofertar.component';

const routes: Routes = [
  {path:'inicio', component:VehiculosComponent},
  {path:'ofertar', component: OfertarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
