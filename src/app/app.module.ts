import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import {
  AppComponent, LoginComponent, ProfileManagerComponent, BasicProfileComponent,
  CalculationComponent, ExperienceComponent, ScoreComponent, SkillsComponent,
  AuthService, MarketabilityService, ProfileService
} from './index';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, ProfileManagerComponent,
    BasicProfileComponent, CalculationComponent, ExperienceComponent,
    ScoreComponent, SkillsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, MarketabilityService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
