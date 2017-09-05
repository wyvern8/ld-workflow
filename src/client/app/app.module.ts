import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import {Level, Logger} from "angular2-logger/core" ;
import {LaunchDarklyModule, LaunchDarklyService, LaunchDarklyConfig, LD_CONFIG} from 'launchdarkly-angular';

let logger = new Logger();
logger.level = Level.DEBUG ;
let ldConfig: LaunchDarklyConfig = {apiKey: 'xxxx', logger: logger, options: {bootstrap: 'localStorage'}};

@NgModule({
  imports: [BrowserModule, HttpModule, LaunchDarklyModule, AppRoutingModule, AboutModule, HomeModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },{
    provide: LaunchDarklyService,
    deps: [ LD_CONFIG ],
    useFactory: (config: any) => {
      return new LaunchDarklyService(config);
    }
  },
  {
    provide: LD_CONFIG,
    useValue: ldConfig
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
