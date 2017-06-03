import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Task } from '../../models/task';
import { TaskData } from '../../providers/task-data';
import { TaskListPage } from '../task-list/task-list';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetailPage {
  public navCtrl: NavController;
  public navParams: NavParams;
  public geolocation: Geolocation;
  public alert: AlertController;
  public camera: Camera;
  public task: Task;
  public taskData: TaskData;
  public taskEdit: Task;
  public base64Image: string;

  constructor(
    navCtrl: NavController,
    navParams: NavParams,
    geolocation: Geolocation,
    camera: Camera,
    alert: AlertController,
    taskData: TaskData
  ) {
    this.navCtrl = navCtrl;
    this.camera = camera;
    this.taskData = taskData;
    this.alert = alert;
    this.navParams = navParams;
    this.geolocation = geolocation;
    this.task = this.navParams.data.task;
    this.taskEdit = { ...this.task };
  }

  public onPhotoChoose(): void {
    if (!this.taskEdit.photo_required) {
        this.base64Image = '';
        return;
    }

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, () => this.taskEdit.photo_required = false);
  }

  public onSaveTask(): void {
    let options: any = { timeout: 5000 };
    let alert: any = this.alert.create({
      title: 'Ошибка при сохранение',
      buttons: ['Закрыть']
    });

    let failedCallback: any = (error) => {
      alert.present();
      console.log(error);
    };

    this.geolocation.getCurrentPosition(options).then((geoPosition) => {
      this.taskData.finishTask(this.taskEdit, geoPosition, this.base64Image).subscribe(
        () => this.goToList(),
        (error) => failedCallback(error));
    }, (error) => failedCallback(error))
      .catch((error) => failedCallback(error));
  }

  public goToList(): void {
    this.navCtrl.push(TaskListPage, { engineer: this.task.id_engineer });
  }
}
