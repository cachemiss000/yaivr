import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms"

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";

export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (private injector: Injector) {
    AppInjector = this.injector;
  }
}
