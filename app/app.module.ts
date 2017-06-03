import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { TaskApp } from './app.component';
import { TaskData } from '../providers/task-data';

import { TaskPage } from '../pages/task/task';
import { TaskListPage } from '../pages/task-list/task-list';
import { TaskDetailPage } from '../pages/task-detail/task-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    TaskApp,
    TaskPage,
    TaskListPage,
    TaskDetailPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(TaskApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TaskApp,
    TaskPage,
    TaskListPage,
    TaskDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    TaskData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
