import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StoresViewComponent } from './pages/stores-view/stores-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapsViewComponent } from './pages/maps-view/maps-view.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [AppComponent, StoresViewComponent, MapsViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableExporterModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
