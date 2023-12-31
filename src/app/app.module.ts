import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { ObservablesComponent } from './components/observables/observables.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SenderComponent } from './components/subjects/sender/sender.component';
import { ReceiverComponent } from './components/subjects/receiver/receiver.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    DataListComponent,
    ObservablesComponent,
    SubjectsComponent,
    SenderComponent,
    ReceiverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
