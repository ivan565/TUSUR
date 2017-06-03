import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TaskDetailPage } from '../task-detail/task-detail';
import { Task } from '../../models/task';
import { TaskData } from '../../providers/task-data';

@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html'
})
export class TaskListPage {
  public navCtrl: NavController;
  public navParams: NavParams;
  public taskData: TaskData;
  public loadingCtrl: LoadingController;
  public engineer: number;
  public loaded: boolean;
  public tasks: Task[];

  public constructor(navCtrl: NavController, taskData: TaskData, navParams: NavParams, loadingCtrl: LoadingController) {
    this.navCtrl = navCtrl;
    this.loadingCtrl = loadingCtrl;
    this.taskData = taskData;
    this.navParams = navParams;
    this.engineer = this.navParams.data.engineer;
    this.loaded = false;
    this.tasks = [];
  }

  ionViewDidLoad() {
    let loading: any = this.loadingCtrl.create();
    let taskSubscribeSuccess = (tasks) => {
      this.tasks = tasks;
      this.loaded = true;
      loading.dismiss();
    };

    let taskSubscribeFailed = (error) => {
      console.log(error);
      this.loaded = true;
      loading.dismiss();
    };

    loading.present();
    this.taskData.getTasksByEngineer(this.engineer).subscribe(
      (tasks) => taskSubscribeSuccess(tasks),
      (error) => taskSubscribeFailed(error),
    );
  }

  public goToTaskDetail(task: Task): void {
    this.navCtrl.push(TaskDetailPage, { task: task });
  }
}
