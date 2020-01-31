import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { ServiceComponent } from './service/service.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TeamComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
