import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { LogInOutComponent } from './log-in-out/log-in-out.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    LogInOutComponent,
    AccountMenuComponent,
    GamesComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
