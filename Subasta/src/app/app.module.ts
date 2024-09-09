import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfertarComponent } from './pages/ofertar/ofertar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    OfertarComponent,
    NavbarComponent,
    VehiculosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
