import { Component,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router'


import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,
    RouterModule.forRoot([{path: 'form', component: FormComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
