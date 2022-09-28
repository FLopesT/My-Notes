import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxdbService } from './services/rxdbSetup/rxdb.service';

import { initDatabase } from './services/rxdbSetup/rxdb.service';

import { PagesModule } from './pages/pages.module';
import { SharedModule } from './pages/shared/shared.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    RxdbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
