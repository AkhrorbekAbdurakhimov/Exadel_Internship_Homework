import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// ==== Pages ====
import { MainPageModule } from './main-page/main-page.module';
import { CategoriesPageModule } from './categories-page/categories-page.module';
import { StatisticsPageModule } from './statistics-page/statistics-page.module';
import { SubscriptionsPageModule } from './subscriptions-page/subscriptions-page.module';

import { AuthInterceptor } from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    AuthModule,
    SharedModule,
    BrowserModule,
    MainPageModule,
    HttpClientModule,
    AppRoutingModule,
    StatisticsPageModule,
    CategoriesPageModule,
    SubscriptionsPageModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
