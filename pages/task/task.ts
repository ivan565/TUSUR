import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaskData } from '../../providers/task-data';
import { TaskListPage } from '../task-list/task-list';

@Component({
  selector: 'task',
  templateUrl: 'task.html'
})
export class TaskPage {
  public navCtrl: NavController;
  public taskData: TaskData;
  public engineerId: number;

  public constructor(navCtrl: NavController, taskData: TaskData) {
    this.navCtrl = navCtrl;
    this.taskData = taskData;
  }

  public onShowList(): void {
    if (this.engineerId > 0) {
      this.navCtrl.push(TaskListPage, { engineer: this.engineerId });
    }
  }
}
